import { Logger, Module, Provider } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { InjectionToken } from './application/injection.token';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFactory } from './domain/user.factory';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserQueryImpl } from './infrastructure/query/user.query.impl';
import { CreateUserHandler } from './application/command/create-user.handler';
import { FindUsersHandler } from './application/query/find-users.handler';
import { UserSaga } from './application/saga/user.saga';
import { FindUserByIdHandler } from './application/query/find-user-by-id.handler';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
  {
    provide: InjectionToken.USER_QUERY,
    useClass: UserQueryImpl,
  },
];

const application = [
  FindUsersHandler,
  FindUserByIdHandler,
  CreateUserHandler,
  CreateUserHandler,
  UserSaga,
];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class UserModule {}
