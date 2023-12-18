import { UserQuery } from '../../../common/application/query/user.query';
import { Inject, Injectable } from '@nestjs/common';
import {
  ENTITY_ID_TRANSFORMER,
  EntityIdTransformer,
  readConnection,
} from '../../../../libs/database.module';
import { FindUsersQuery } from '../../../common/application/query/find-users.query';
import { FindUsersResult } from '../../../common/application/query/find-users.result';
import { FindUserByIdQuery } from '../../../common/application/query/find-user-by-id.query';
import { FindUserByIdResult } from '../../../common/application/query/find-user-by-id.result';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserQueryImpl implements UserQuery {
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async findById(query: FindUserByIdQuery): Promise<FindUserByIdResult | null> {
    return readConnection
      .getRepository(UserEntity)
      .findOneBy({ id: this.entityIdTransformer.to(query.id) })
      .then((entity) =>
        entity
          ? {
            id: this.entityIdTransformer.from(entity.id),
            username: entity.username,
            email: entity.email,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
          }
          : null,
      );
  }

  async find(query: FindUsersQuery): Promise<FindUsersResult> {
    return readConnection
      .getRepository(UserEntity)
      .find({
        skip: query.skip,
        take: query.take,
      })
      .then((entities) => ({
        users: entities.map((entity) => ({
          id: this.entityIdTransformer.from(entity.id),
          username: entity.username,
          email: entity.email,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          deletedAt: entity.deletedAt,
        })),
      }));
  }
}
