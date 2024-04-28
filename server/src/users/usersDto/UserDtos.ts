
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../users.entity';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

}


export class UpdateUserDto  {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

}