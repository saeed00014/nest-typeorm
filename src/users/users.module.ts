import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Photo } from 'src/entity/photo.entity';
import { InsertSubscriber } from 'src/subscriber/insert.subscriber';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  controllers: [UsersController],
  providers: [UsersService, InsertSubscriber],
})
export class usersModule {}
