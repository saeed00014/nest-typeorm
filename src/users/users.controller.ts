import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param() id: String) {}

  @Post('/')
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }
}
