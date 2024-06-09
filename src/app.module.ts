import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleWare } from 'logger.middleware';
import { UsersController } from './users/users.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'exceptions/http-exception.filter';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(UsersController);
  }
}
