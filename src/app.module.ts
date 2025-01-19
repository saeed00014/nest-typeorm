import {
  ClassSerializerInterceptor,
  HttpServer,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { usersModule } from './users/users.module';
import { Photo } from './entity/photo.entity';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './crons/taskSercive';
import { BullModule } from '@nestjs/bullmq';
import { CostumLoggerModule } from './costumLogger/costumLoggerModule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Module({
  imports: [
    usersModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'typeorm',
      entities: [User, Photo],
      synchronize: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    // BullModule.forRoot({
    //   connection: {
    //     host: 'localhost',
    //     port: 4000,
    //   },
    // }),
    // BullModule.registerQueue({
    //   name: 'firstQueue',
    //   connection: { port: 4001 },
    // }),
    // BullModule.registerFlowProducer({
    //   name: 'firstQueueFlow',
    // }),
    CostumLoggerModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    // MulterModule.register({
    //   limits: {
    //     fileSize: 6000,
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    TaskService,
  ],
})
export class AppModule {}
