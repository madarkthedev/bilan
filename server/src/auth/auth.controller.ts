import {  Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { Role } from 'src/users/users.entity';
import { Roles } from 'src/roleAuth/roles.decorator';
import { RolesGuard } from 'src/roleAuth/roles.gaurds';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN,Role.USER)
  status(@Req() req: Request) {

    console.log(req.user);
    return req.user;
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN,Role.USER)
  async logout(@Req() req: Request, @Res() res: Response) {
    res.status(200).send('Logged out successfully');
  }
}
