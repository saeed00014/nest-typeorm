import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CostumLogger extends ConsoleLogger {
  onModuleInit() {
    console.log('the costum logger service initiated');
  }

  log(message: any, stack?: string, context?: string) {
    super.log(message);
  }
  error(message: any, stack?: string, context?: string) {
    // console.log(message);
    console.log(message);
  }
}
