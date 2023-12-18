import { User } from './user';

export interface UserRepository {
  newId: () => Promise<string>;
  save: (user: User | User[]) => Promise<User[]>;
  findById: (id: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
}
