import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { LoggingInterceptor } from 'libs/logging.interceptor';
import { HttpExceptionFilter } from 'libs/http-exception.filter';

import { Config } from 'src/Config';
import { AppModule } from './app.module';
import helmet from 'helmet';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(Config.PORT, async () => {
    logger.log(`Server listening on http://localhost:${Config.PORT}`);
  });
}
bootstrap();

process.on('uncaughtException', (error) => {
  logger.error(`UNHANDLED ERROR => ${error.message}`, error.stack);
});
