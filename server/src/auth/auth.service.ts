import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { AuthPayloadDto } from './authDto/auth.dto';
import { Role } from 'src/users/users.entity';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService) {}

 async  validateUser(authPayloadDto: AuthPayloadDto) {
    const  { username, password }= authPayloadDto;
    const findUser = await  this.userService.findOneByUsername(username);

    if (findUser && await this.userService.comparePasswords(password, findUser.password)) {
        const { password, ...user } = findUser;

        return this.jwtService.sign(user);
      }
      throw new UnauthorizedException('Invalid credentials');
    }



}
