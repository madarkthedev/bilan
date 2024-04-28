import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, ParseIntPipe, Query, UsePipes, Res } from '@nestjs/common';
import { EvaporationService } from './evaporation.service';
import { CreateEvaporationDto } from './evaporation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/get-user.decorator';
import { ValidateBacPluiePipe } from './evapo.validation';
import { Response } from 'express';


@Controller('evaporations')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidateBacPluiePipe)
export class EvaporationController {
  constructor(private readonly evaporationService: EvaporationService) {}

  @Post()

  async create(@UserId() userId: number, @Body() evaporationDto: CreateEvaporationDto) {

    return this.evaporationService.create(userId, evaporationDto);
  }

  @Get(':id')
  async findOne(@UserId() userId: number, @Param('id', ParseIntPipe) id: number) {

    return this.evaporationService.findOne(userId, id);
  }

  @Delete(':id')
  async delete(@UserId() userId:number, @Param('id', ParseIntPipe) id: number) {

    return this.evaporationService.delete(userId, id);
  }

  @Put(':id')
  async update(@UserId() userId:number, @Param('id', ParseIntPipe) id: number, @Body() evaporationDto: CreateEvaporationDto) {

    return this.evaporationService.update(userId, id, evaporationDto);
  }

  @Get()
  async findAll(@UserId() userId:number, @Query('startDate') startDate: string,
  @Query('endDate') endDate: string) {
    return this.evaporationService.
    calculateEvaporation(startDate, endDate, userId)
  }

  @Get('download/:startDate/:endDate')
  async downloadEvaporationAsExcel(
    @UserId() userId: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Res() res: Response,
  ): Promise<void> {
    const filePath = await this.evaporationService.downloadEvaporationAsExcel(userId, startDate, endDate);
console.log('file',filePath)
    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="evaporation.xlsx"`);

    // Send the file as response
    res.download(filePath);
  }

}