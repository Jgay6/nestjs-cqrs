import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { User, UserImpl, UserProperties } from './user';

type CreateUserOptions = Readonly<{
  id: string;
  username: string;
  email: string;
  password: string;
  matchPassword: string;
}>;

export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateUserOptions): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImpl({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(new UserImpl(properties));
  }
}
