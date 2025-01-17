import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ResponseUser,
  SubUser,
  UpdateUser,
  User,
} from 'src/entity/user.entity';
import { CacheInterceptor, CacheModule, CacheTTL } from '@nestjs/cache-manager';
import { response } from 'express';
import { Transform } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CacheTTL(5)
  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: ResponseUser })
  // @Transform(({ value }) => value.isActive.toString())
  @Post('/')
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  updateUser(@Body() user: SubUser) {}

  @Post('/many')
  createManyUsers(@Body(new ParseArrayPipe({ items: User })) users: User[]) {
    return this.usersService.createManyUsers(users);
  }
}
