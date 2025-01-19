import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseArrayPipe,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  SerializeOptions,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ResponseUser,
  SubUser,
  UpdateUser,
  User,
} from 'src/entity/user.entity';
import { CacheInterceptor, CacheModule, CacheTTL } from '@nestjs/cache-manager';
import { Request, response } from 'express';
import { Transform } from 'class-transformer';
import { Cookies } from 'src/costumDecorators/getCookieDecorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FileSizeValidatorPipe } from 'src/pipe/fileSizeValidator.pipe';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CacheTTL(5)
  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('/file')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 2 }]))
  postFile(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return this.usersService.postFile(files);
  }

  @Get('file')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @Cookies() cookie: string) {
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
