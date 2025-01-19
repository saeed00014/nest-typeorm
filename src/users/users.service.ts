import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { CostumLogger } from 'src/costumLogger/costumLogger';
import { ResponseUser, User } from 'src/entity/user.entity';
import { orderCreatedEvent } from 'src/events/orderEvent';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    @Inject('CACHE_MANAGER') private cache: Cache,
    private schedulerRegistry: SchedulerRegistry,
    // @InjectQueue('firstQueue') private firstQueue: Queue,
    @Inject(CostumLogger) private costumLogger: CostumLogger,
    private eventEmitter: EventEmitter2,
    private httpService: HttpService,
  ) {}

  async getAllUsers() {
    // const cachedNumber = await this.cache.get('newNumber');
    let newNumber = 0;
    // if (!cachedNumber) {
    for (let i = 0; i < 10000000000; i++) {
      newNumber = newNumber + i;
    }
    // await this.cache.set('newNumber', newNumber, 0);
    // }
    // console.log(newNumber);
    return this.userRepository.find();
  }

  async getUser(id: Number) {
    // return this.httpService.axiosRef.get('http://localhost:3000/cats');
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3000/users'),
    );
    console.log(data);
    this.eventEmitter.emit('order', 'its payload');
    // const result = await this.userRepository.findOneBy({ id });
    // return result;
  }

  postFile(files: Express.Multer.File[]) {
    console.log(files);
  }

  async createUser(user: User) {
    const result = await this.userRepository.save(user);
    return result;
  }

  async createManyUsers(users: User[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const response = await Promise.all(
        users.map((user) => {
          return queryRunner.manager.save(User, user);
        }),
      );
      await queryRunner.commitTransaction();
      return response;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
