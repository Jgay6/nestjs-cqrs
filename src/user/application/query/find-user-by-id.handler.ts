import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../injection.token';
import { UserQuery } from '../../../common/application/query/user.query';
import { FindUserByIdQuery } from '../../../common/application/query/find-user-by-id.query';
import { FindUserByIdResult } from '../../../common/application/query/find-user-by-id.result';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler
  implements IQueryHandler<FindUserByIdQuery, FindUserByIdResult>
{
  @Inject(InjectionToken.USER_QUERY) readonly usersQuery: UserQuery;

  async execute(query: FindUserByIdQuery): Promise<FindUserByIdResult> {
    return this.usersQuery.findById(query);
  }
}
