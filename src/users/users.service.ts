import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { ResponseUser, User } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    @Inject('CACHE_MANAGER') private cache: Cache,
    private schedulerRegistry: SchedulerRegistry,
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
    const result = await this.userRepository.findOneBy({ id });
    return result;
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
