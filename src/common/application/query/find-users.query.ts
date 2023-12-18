import { IQuery } from '@nestjs/cqrs';

export class FindUsersQuery implements IQuery {
  readonly skip: number;
  readonly take: number;

  constructor(options: FindUsersQuery) {
    Object.assign(this, options);
  }
}
