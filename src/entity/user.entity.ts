import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column({ default: true })
  isActive: Boolean;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
