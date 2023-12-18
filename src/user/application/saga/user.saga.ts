import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';
import { CreatedUsersEvent } from '../../../common/domain/event/created-users.event';

@Injectable()
export class UserSaga {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreatedUsersEvent),
      delay(1000),
      map((event) => {
        console.log(
          `Inside [UserSaga] Saga with [CreatedUsersEvent] with userIds: ${event.userIds.join(
            ',',
          )}`,
        );
        return null;
      }),
    );
  };
}
