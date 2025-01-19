import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Photo } from 'src/entity/photo.entity';
import { InsertSubscriber } from 'src/subscriber/insert.subscriber';
import { CacheModule } from '@nestjs/cache-manager';
import { CostumLogger } from 'src/costumLogger/costumLogger';
import { CostumLoggerModule } from 'src/costumLogger/costumLoggerModule';
import { orderCreatedEvent } from 'src/events/orderEvent';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({}),
    TypeOrmModule.forFeature([User, Photo]),
    CostumLoggerModule,
    // MulterModule.register({
    //   limits: {
    //     fileSize: 6000,
    //   },
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService, InsertSubscriber, orderCreatedEvent],
})
export class usersModule {}
