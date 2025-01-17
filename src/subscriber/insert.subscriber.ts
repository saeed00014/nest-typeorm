import { User } from 'src/entity/user.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

@EventSubscriber()
export class InsertSubscriber implements EntitySubscriberInterface<User> {
  constructor(datasource: DataSource) {
    datasource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeTransactionCommit() {
    console.log('the transaction is about to commit');
  }
}
