import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { PasswordModule } from 'libs/password.module';
import { DatabaseModule } from 'libs/database.module';
import { RequestStorageMiddleware } from 'libs/request-storage.middleware';

import { AppService } from './app.service';

import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PasswordModule,
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    CommonModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
