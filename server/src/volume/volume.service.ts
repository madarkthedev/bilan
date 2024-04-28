import { Injectable, BadRequestException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volume } from './volume.entity';
import { VolumeDto } from './volume.dto';
import { ValidationError, validate } from 'class-validator';
import { VolumeUpdate } from './volume-update.entity';

@Injectable()
export class VolumeService {
  constructor(
    @InjectRepository(Volume)
    private readonly volumeRepository: Repository<Volume>,
     @InjectRepository(VolumeUpdate)
    private readonly volumeUpdateRepository: Repository<VolumeUpdate>,
  ) {}

  async processSheet(sheet: xlsx.WorkSheet, userId: number): Promise<Volume[]> {
    const volumes: Volume[] = this.extractAndMapVolumes(sheet, userId);
    await this.validateAndSaveVolumes(volumes);
    return volumes;
  }

  private extractAndMapVolumes(sheet: xlsx.WorkSheet, userId: number): Volume[] {
    const volumes: Volume[] = [];
    for (let i = 2; ; i++) { // Assuming data starts from the second row
      const cote = sheet[`A${i}`]?.v;
      let iterationCount = 0;
      if (cote === undefined || cote === null || iterationCount >= 1000) {
        break;
      }

      const volumeDto: VolumeDto = {
        cote,
        volume0: sheet[`B${i}`]?.v,
        volume1: sheet[`C${i}`]?.v,
        volume2: sheet[`D${i}`]?.v,
        volume3: sheet[`E${i}`]?.v,
        volume4: sheet[`F${i}`]?.v,
        volume5: sheet[`G${i}`]?.v,
        volume6: sheet[`H${i}`]?.v,
        volume7: sheet[`I${i}`]?.v,
        volume8: sheet[`J${i}`]?.v,
        volume9: sheet[`K${i}`]?.v,
      };

      const volume:Volume = this.mapVolumeDtoToEntity(volumeDto, userId);
      volumes.push(volume);
    }
    return volumes;
  }

  private async validateAndSaveVolumes(volumes: Volume[]): Promise<void> {
    for (const volume of volumes) {
      const errors : ValidationError[]= await validate(volume);
      if (errors.length > 0) {
        throw new BadRequestException(errors.map(error => Object.values(error.constraints)).join(', '));
      }
    }

    try {
      await this.volumeRepository.save(volumes);
    } catch (error) {
      throw new BadRequestException('Failed to save volumes to the database.');
    }
  }

  private mapVolumeDtoToEntity(volumeDto: VolumeDto, userId: number): Volume {
    const volume = new Volume();
    Object.assign(volume, volumeDto);
    volume.userId = userId;
    return volume;
  }
  async updateFileContent(file: Express.Multer.File, userId: number): Promise<void> {
    // Read the file content
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const volumes: Volume[] = this.extractAndMapVolumes(sheet, userId);

    // Update the existing volumes in the database
    try {
        await this.volumeRepository.delete({ userId }); // Delete existing volumes for the user
        await this.volumeRepository.save(volumes); // Save the updated volumes
    } catch (error) {
        throw new BadRequestException('Failed to update file content in the database.');
    }
}

async deleteFileContent(userId: number): Promise<void> {
    try {
        await this.volumeRepository.delete({ userId }); // Delete volumes associated with the user
    } catch (error) {
        throw new BadRequestException('Failed to delete file content from the database.');
    }
}

  async getVolumeByCote(userId: number, cote: number): Promise<number> {
    const baseCote = parseFloat(cote.toFixed(2).toString().split('').slice(0, -1).join(''));
  const volumeIndex = parseInt(Number(cote).toFixed(2).toString().slice(-1))


    // Fetch the volume based on the user and the base cote
    const volume = await this.volumeRepository.findOne({
        where: {
            userId,
            cote: baseCote,
        },
    });
    // Determine the volume property based on the volume index
    const volumeProperty = 'volume'+ `${volumeIndex}`;

    // Return the volume property value
    return volume[volumeProperty];
}
async getAllVolumes(): Promise<Volume[]> {
  return this.volumeRepository.find();}
  
async trackUpdate(userId: number): Promise<VolumeUpdate> {
  return this.volumeUpdateRepository.findOneBy({ userId});
}

 async logUpdate(userId: number): Promise<void> {
  const update = new VolumeUpdate();
  update.userId = userId;
  update.updateTime = new Date();
  await this.volumeUpdateRepository.save(update);
}
}