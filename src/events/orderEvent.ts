import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class orderCreatedEvent {
  @OnEvent('order')
  handleOrderCreatedEvent(payload: string) {
    console.log(`create order event called on ${payload}`);
  }
}
