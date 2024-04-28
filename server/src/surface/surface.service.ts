import { Injectable, BadRequestException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationError, validate } from 'class-validator';
import { Surface } from './surface.entity';
import { SurfaceUpdate } from './surface-update.entity';
import { SurfaceDto } from './surface.dto';


@Injectable()
export class SurfaceService {
  constructor(
    @InjectRepository(Surface)
    private readonly surfaceRepository: Repository<Surface>,
     @InjectRepository(SurfaceUpdate)
    private readonly surfaceUpdateRepository: Repository<SurfaceUpdate>,
  ) {}

  async processSheet(sheet: xlsx.WorkSheet, userId: number): Promise<Surface[]> {
    const surfaces: Surface[] = this.extractAndMapSurfaces(sheet, userId);
    await this.validateAndSaveSurfaces(surfaces);
    return surfaces;
  }

  private extractAndMapSurfaces(sheet: xlsx.WorkSheet, userId: number): Surface[] {
    const surfaces: Surface[] = [];
    for (let i = 2; ; i++) { // Assuming data starts from the second row
      const cote = sheet[`A${i}`]?.v;
      let iterationCount = 0;
      if (cote === undefined || cote === null || iterationCount >= 1000) {
        break;
      }

      const surfaceDto: SurfaceDto = {
        cote,
        surface0: sheet[`B${i}`]?.v,
        surface1: sheet[`C${i}`]?.v,
        surface2: sheet[`D${i}`]?.v,
        surface3: sheet[`E${i}`]?.v,
        surface4: sheet[`F${i}`]?.v,
        surface5: sheet[`G${i}`]?.v,
        surface6: sheet[`H${i}`]?.v,
        surface7: sheet[`I${i}`]?.v,
        surface8: sheet[`J${i}`]?.v,
        surface9: sheet[`K${i}`]?.v,
      };

      const surface:Surface = this.mapSurfaceDtoToEntity(surfaceDto, userId);
      surfaces.push(surface);
    }
    return surfaces;
  }

  private async validateAndSaveSurfaces(surfaces: Surface[]): Promise<void> {
    for (const surface of surfaces) {
      const errors : ValidationError[]= await validate(surface);
      if (errors.length > 0) {
        throw new BadRequestException(errors.map(error => Object.values(error.constraints)).join(', '));
      }
    }

    try {
      await this.surfaceRepository.save(surfaces);
    } catch (error) {
      throw new BadRequestException('Failed to save surfaces to the database.');
    }
  }

  private mapSurfaceDtoToEntity(surfaceDto: SurfaceDto, userId: number): Surface {
    const surface = new Surface();
    Object.assign(surface, surfaceDto);
    surface.userId = userId;
    return surface;
  }
  async updateFileContent(file: Express.Multer.File, userId: number): Promise<void> {
    // Read the file content
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const surfaces: Surface[] = this.extractAndMapSurfaces(sheet, userId);

    // Update the existing surfaces in the database
    try {
        await this.surfaceRepository.delete({ userId }); // Delete existing surfaces for the user
        await this.surfaceRepository.save(surfaces); // Save the updated surfaces
    } catch (error) {
        throw new BadRequestException('Failed to update file content in the database.');
    }
}

async deleteFileContent(userId: number): Promise<void> {
    try {
        await this.surfaceRepository.delete({ userId }); // Delete surfaces associated with the user
    } catch (error) {
        throw new BadRequestException('Failed to delete file content from the database.');
    }
}

  async getsurfaceByCote(userId: number, cote: number): Promise<number> {
    const baseCote = parseFloat(cote.toFixed(2).toString().split('').slice(0, -1).join(''));
  const surfaceIndex = parseInt(Number(cote).toFixed(2).toString().slice(-1))


    // Fetch the surface based on the user and the base cote
    const surface = await this.surfaceRepository.findOne({
        where: {
            userId,
            cote: baseCote,
        },
    });
    // Determine the surface property based on the surface index
    const surfaceProperty = 'surface'+ `${surfaceIndex}`;

    // Return the surface property value
    return surface[surfaceProperty];
}
async getAllsurfaces(userId:number): Promise<Surface[]> {
  return this.surfaceRepository.findBy({ userId});}

async trackUpdate(userId: number): Promise<SurfaceUpdate> {
  return this.surfaceUpdateRepository.findOneBy({ userId});
}

 async logUpdate(userId: number): Promise<void> {
  const update = new SurfaceUpdate();
  update.userId = userId;
  update.updateTime = new Date();
  await this.surfaceUpdateRepository.save(update);
}
}