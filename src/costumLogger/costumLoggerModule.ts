import { Module, OnModuleInit } from '@nestjs/common';
import { CostumLogger } from './costumLogger';

@Module({
  imports: [],
  providers: [CostumLogger],
  exports: [CostumLogger],
})
export class CostumLoggerModule implements OnModuleInit {
  onModuleInit() {
    console.log('the costum logger initiated');
  }
}
