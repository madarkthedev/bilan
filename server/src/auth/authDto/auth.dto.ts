import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/users/users.entity";


export class AuthPayloadDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;


  }