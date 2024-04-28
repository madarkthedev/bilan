
import { IsEnum } from 'class-validator';
import { Volume } from 'src/volume/volume.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()

  username: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({ type: 'enum', enum: Role, default: Role.USER})
  @IsEnum(Role)
  role: Role;


}