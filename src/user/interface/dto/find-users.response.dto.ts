import { FindUsersResult } from '../../../common/application/query/find-users.result';

class User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class FindUsersResponseDto extends FindUsersResult {
  readonly users: User[];
}
