import { AggregateRoot } from '@nestjs/cqrs';

export type UserEssentialsProperties = Readonly<
  Required<{
    id: string;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }>
>;

export type UserProperties = UserEssentialsProperties &
  Required<UserOptionalProperties>;

export interface User {
  id: string;
  commit: () => void;
}

export class UserImpl extends AggregateRoot implements User {
  public readonly id: string;

  private username: string;
  private email: string;

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }
}
