import { FindUserByIdQuery } from './find-user-by-id.query';
import { FindUserByIdResult } from './find-user-by-id.result';
import { FindUsersQuery } from './find-users.query';
import { FindUsersResult } from './find-users.result';

export interface UserQuery {
  findById: (query: FindUserByIdQuery) => Promise<FindUserByIdResult | null>;
  find: (query: FindUsersQuery) => Promise<FindUsersResult>;
}
