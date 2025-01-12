import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Photo } from 'src/entity/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class usersModule {}
