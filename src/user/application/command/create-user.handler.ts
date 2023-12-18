import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../common/application/command/create-user.command';
import { Transactional } from '../../../../libs/transactional';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { UserRepository } from '../../domain/user.repository';
import { UserFactory } from '../../domain/user.factory';
import { CreatedUsersEvent } from '../../../common/domain/event/created-users.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly repository: UserRepository;

  @Inject()
  private readonly factory: UserFactory;

  constructor(private eventBus: EventBus) {}

  @Transactional()
  async execute(command: CreateUserCommand): Promise<any> {
    const user = this.factory.create({
      ...command,
      id: await this.repository.newId(),
    });

    const models = await this.repository.save(user);

    this.eventBus.publish(new CreatedUsersEvent(models.map((user) => user.id)));

    user.commit();

    return models;
  }
}
