import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { IsBoolean, IsBooleanString, IsString } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @IsString()
  @Column({ nullable: false })
  firstName: String;

  @IsString()
  @Column({ nullable: false })
  lastName: String;

  @IsBooleanString()
  @Column({ default: true })
  isActive: Boolean;

  @IsString()
  @Column()
  password: String;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UpdateUser extends PartialType(User) {}

export class SubUser extends PickType(User, ['lastName'] as const) {}

export class ResponseUser extends User {
  @Exclude()
  password: String;
}
