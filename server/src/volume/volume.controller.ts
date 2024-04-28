
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Get, Param,  ParseFloatPipe, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VolumeService } from './volume.service';

import * as xlsx from 'xlsx';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roleAuth/roles.gaurds';
import { UserId } from 'src/decorators/get-user.decorator';

@Controller('volumes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VolumeController {
    constructor(private readonly volumeService: VolumeService,


      ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Pass sheet directly to the service method
    return this.volumeService.processSheet(sheet, userId);
  }
  @Get()
  async getAllVolumes() {
      return this.volumeService.getAllVolumes();
  }

  @Get(':cote')
  async getVolumeByCote(
      @Param('cote', ParseFloatPipe) cote: number,
      @UserId() userId: number,
  ): Promise<number> {
      return this.volumeService.getVolumeByCote(userId, cote);
  }
  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
      // Update the file content in the database
      await this.volumeService.updateFileContent(file, userId);
      return { message: 'File content updated successfully.' };
  }

  @Delete('delete')
  async deleteFile(@UserId() userId: number) {
      // Delete the file content from the database
      await this.volumeService.deleteFileContent(userId);
      return { message: 'File content deleted successfully.' };
  }
  @Get('update/status')
    async getUpdateStatus(@UserId() userId: number) {
        // Retrieve the update status and history from the service
        return this.volumeService.trackUpdate(userId);
    }

  @Post('update/log')
  async logUpdate(@UserId() userId: number) {
      // Log the update and notify admin
      await this.volumeService.logUpdate(userId);
      return { message: 'Update logged successfully.' };
  }

}