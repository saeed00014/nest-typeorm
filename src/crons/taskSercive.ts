import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  // @Cron(CronExpression.EVERY_5_SECONDS, {
  //   name: 'logger',
  // })
  // handleLogCron() {
  //   console.log('cron called');
  // }

  // @Interval(5000)
  // handleInterval() {
  //   console.log('interval called');
  // }

  @Timeout(5000)
  handleTimeout() {
    console.log('timeout called');
  }
}
