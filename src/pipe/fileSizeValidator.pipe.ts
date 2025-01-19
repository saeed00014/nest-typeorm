import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidatorPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    try {
      const fileSize = file.size;
      if (fileSize > 555) {
        throw Error('file size to big');
      }
      return file;
    } catch (e) {
      throw new BadRequestException('the file size is too big');
    }
  }
}
