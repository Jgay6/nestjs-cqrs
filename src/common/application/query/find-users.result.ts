import { IQueryResult } from '@nestjs/cqrs';

export class FindUsersResult implements IQueryResult {
  constructor(
    readonly users: Readonly<{
      id: string;
      username: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }>[],
  ) {}
}
