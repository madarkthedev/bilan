
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Get, Param,  ParseFloatPipe, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SurfaceService } from './surface.service';
import * as xlsx from 'xlsx';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roleAuth/roles.gaurds';
import { UserId } from '../decorators/get-user.decorator';

@Controller('surfaces')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SurfaceController {
    constructor(private readonly surfaceService: SurfaceService,
      ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Pass sheet directly to the service method
    return this.surfaceService.processSheet(sheet, userId);
  }
  @Get()
  async getAllsurfaces(@UserId() userId:number) {
      return this.surfaceService.getAllsurfaces(userId);
  }

  @Get(':cote')
  async getsurfaceByCote(
      @Param('cote', ParseFloatPipe) cote: number,
      @UserId() userId: number,
  ): Promise<number> {
      return this.surfaceService.getsurfaceByCote(userId, cote);
  }
  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
      // Update the file content in the database
      await this.surfaceService.updateFileContent(file, userId);
      return { message: 'File content updated successfully.' };
  }

  @Delete('delete')
  async deleteFile(@UserId() userId: number) {
      // Delete the file content from the database
      await this.surfaceService.deleteFileContent(userId);
      return { message: 'File content deleted successfully.' };
  }
  @Get('update/status')
    async getUpdateStatus(@UserId() userId: number) {
        // Retrieve the update status and history from the service
        return this.surfaceService.trackUpdate(userId);
    }

  @Post('update/log')
  async logUpdate(@UserId() userId: number) {
      // Log the update and notify admin
      await this.surfaceService.logUpdate(userId);
      return { message: 'Update logged successfully.' };
  }

}