
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './usersDto/UserDtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users.map(user => {
          delete  user.password
          return user;
        });
      }


    async findOne(id: number): Promise<User> { // Change the type of id to number
      const user = await this.userRepository.findOneBy({id: id});
      if (!user) {
        throw new NotFoundException('User not found');
      }
      delete user.password
      return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...userData } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const user = this.userRepository.create({ ...userData, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
        delete savedUser.password; // Remove password from the returned user object
        return savedUser;
      }

      async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({ id:id });
        if (!existingUser) {
          throw new NotFoundException('User not found');
        }

        // Hash the password if it's provided in the DTO
        if (updateUserDto.password) {
          const hashedPassword = await this.hashPassword(updateUserDto.password);
          updateUserDto.password = hashedPassword;
        }

        // Update the user entity with the provided DTO
        Object.assign(existingUser, updateUserDto);

        // Save the updated user entity
  const updatedUser = await this.userRepository.save(existingUser);

  // Create a copy of the updated user object without the password
  const userWithoutPassword = { ...updatedUser };
  delete userWithoutPassword.password;

  return userWithoutPassword;
      }

    async remove(id: number): Promise<void> { // Change the type of id to number
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
    }
    private sanitizeUser(user: User): Omit<User, 'password'> {
        const { password, ...sanitizedUser } = user; // Exclude password from user object
        return sanitizedUser;
      }
      private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSaltSync(10);
        return bcrypt.hash(password, salt);
      }

      async findOneByUsername(username: string): Promise<User | undefined> {
        const user= this.userRepository.findOneBy( {username});
        if (!user) {
          throw new NotFoundException('User not found');
        }
    return user
      }

      async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
      }
  }
