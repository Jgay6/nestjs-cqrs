import { UserRepository } from '../../domain/user.repository';
import { Inject } from '@nestjs/common';
import { UserFactory } from '../../domain/user.factory';
import {
  ENTITY_ID_TRANSFORMER,
  EntityId,
  EntityIdTransformer,
  readConnection,
  writeConnection,
} from '../../../../libs/database.module';
import { User, UserProperties } from '../../domain/user';
import { UserEntity } from '../entity/user.entity';

export class UserRepositoryImpl implements UserRepository {
  @Inject() private readonly userFactory: UserFactory;
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: User | User[]): Promise<User[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    const entitiesSaved = await writeConnection.manager
      .getRepository(UserEntity)
      .save(entities);
    return entitiesSaved.map((entity) => this.entityToModel(entity));
  }

  async findById(id: string): Promise<User | null> {
    const entity = await readConnection
      .getRepository(UserEntity)
      .findOneBy({ id: this.entityIdTransformer.to(id) });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await readConnection.getRepository(UserEntity).find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  private modelToEntity(model: User): UserEntity {
    const properties = JSON.parse(JSON.stringify(model)) as UserProperties;
    return {
      ...properties,
      id: this.entityIdTransformer.to(properties.id),
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: UserEntity): User {
    return this.userFactory.reconstitute({
      ...entity,
      id: this.entityIdTransformer.from(entity.id),
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
