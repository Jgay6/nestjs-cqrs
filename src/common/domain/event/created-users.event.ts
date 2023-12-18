import { IEvent } from '@nestjs/cqrs';

export class CreatedUsersEvent implements IEvent {
  constructor(readonly userIds: string[]) {}
}
