import { Roles } from 'src/roleAuth/roles.decorator';
import { Controller, Get, Post, Body, Put, Delete, Param, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';

import { Role, User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './usersDto/UserDtos';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roleAuth/roles.gaurds';



@Controller('/api/users')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  // @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.create(createUserDto);
  }

@Put(':id')
@Roles(Role.ADMIN, Role.USER)
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto):  Promise<Omit<User, 'password'>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async remove(@Param('id',ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}