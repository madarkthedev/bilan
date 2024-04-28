import { Controller, Post, Body, Put, Param, Get, UseGuards } from '@nestjs/common';
import { BacPluieService } from './minmaxe.service';
import { CreateBacPluieDto, UpdateBacPluieDto } from './minmaxe.dto';
import { UserId } from 'src/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@UseGuards(JwtAuthGuard)
@Controller('bacpluie')
export class BacPluieController {
  constructor(private readonly bacPluieService: BacPluieService) {}

  @Post()
  create(@Body() createBacPluieDto: CreateBacPluieDto, @UserId() userId:number) {
    return this.bacPluieService.create(userId,createBacPluieDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBacPluieDto: UpdateBacPluieDto,@UserId() userId:number) {
    return this.bacPluieService.update(id, updateBacPluieDto,userId);
  }
  @Get()
  async findAll(@UserId() userId: number) {
    return this.bacPluieService.findAll(userId);
  }
}
