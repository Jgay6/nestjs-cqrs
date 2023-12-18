import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedUsersEvent } from '../../../common/domain/event/created-users.event';

@EventsHandler(CreatedUsersEvent)
export class CreatedUsersHandler implements IEventHandler<CreatedUsersEvent> {
  async handle(event: CreatedUsersEvent): Promise<void> {
    console.log(
      `Async CreatedUsersEvent ... with userIds: ${event.userIds.join(',')}`,
    );
  }
}
