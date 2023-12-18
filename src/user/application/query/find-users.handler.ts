import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from '../../../common/application/query/find-users.query';
import { FindUsersResult } from '../../../common/application/query/find-users.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { UserQuery } from '../../../common/application/query/user.query';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler
  implements IQueryHandler<FindUsersQuery, FindUsersResult>
{
  @Inject(InjectionToken.USER_QUERY) readonly usersQuery: UserQuery;

  async execute(query: FindUsersQuery): Promise<FindUsersResult> {
    return this.usersQuery.find(query);
  }
}
