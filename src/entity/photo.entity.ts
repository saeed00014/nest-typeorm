import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}
