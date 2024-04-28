import { SurfaceService } from './../surface/surface.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {  Evaporation } from './evaporation.entity';
import { CreateEvaporationDto } from './evaporation.dto';
import { EvaporationSum } from './evaporationdata.dto';
import { BacPluieService } from 'src/minmaxe/minmaxe.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class EvaporationService {
  constructor(
    private readonly bacPluieService: BacPluieService,
    private readonly surfaceService: SurfaceService,
    @InjectRepository(Evaporation)
    private readonly evaporationRepository: Repository<Evaporation>,
  ) {}

  async create(userId: number, evaporationDto: CreateEvaporationDto): Promise<Evaporation> {
// Check if an evaporation with the provided cote and date already exists
const {date,pluie,bac,cote}=evaporationDto
const existingEvaporation = await this.evaporationRepository.findOne({ where: { userId, cote,
  date,pluie,bac } });
if (existingEvaporation) {
  throw new ConflictException('Evaporation already exists in the database.');
}

    await this.validateBacAndPluie(userId, bac, pluie);
    evaporationDto.surface= await this.surfaceService.getsurfaceByCote(userId,evaporationDto.cote)
    const evaporation = this.evaporationRepository.create({ ...evaporationDto, userId });
    return this.evaporationRepository.save(evaporation);
  }

  async findOne(userId: number, id: number): Promise<Evaporation> {
    const evaporation = await this.evaporationRepository.findOne({ where: { id, userId } });
    if (!evaporation) {
      throw new NotFoundException('Evaporation not found');
    }
    return evaporation;
  }

  async delete(userId: number, id: number): Promise<void> {
    const result = await this.evaporationRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Evaporation not found');
    }
  }

  async update(userId: number, id: number, evaporationDto: CreateEvaporationDto): Promise<Evaporation> {
    const {pluie,bac,cote}=evaporationDto
    evaporationDto.surface= await this.surfaceService.getsurfaceByCote(userId,cote)
    await this.validateBacAndPluie(userId, bac, pluie);
    await this.evaporationRepository.update({ id, userId }, evaporationDto);
    return this.evaporationRepository.findOne({ where: { id, userId } });
  }

  async findAll(startDate: string, endDate: string,userId: number): Promise<Evaporation[]> {
    return this.evaporationRepository.find({ where: { userId, date: Between(startDate,endDate)}, order: { date: 'ASC'  } })
  }

  async calculateEvaporation(startDate: string, endDate: string,userId:number): Promise<EvaporationSum> {
    const evaporationData:Evaporation[] = await this.findAll(startDate,endDate, userId);
    const { surface, pluie, bac } = this.extractData(evaporationData);
    const surfaceMoy = this.calculateSurfaceMoy(surface);
    const pluieWithoutLast = pluie.slice(0, -1);
    const bacWithoutLast = bac.slice(0, -1);
    const lameCorrige = this.calculateLameCorrige(pluie, bac);
    const volumeEvapo = this.calculateVolumeEvapo(surfaceMoy, lameCorrige);

    const evaporations = evaporationData.map((evaporation, index) => {
      return {
          ...evaporation,
          surfaceMoy: surfaceMoy[index],
          lameCorrige: lameCorrige[index],
          volumeEvapo: volumeEvapo[index]
      };
  });


    // Calculate the sums
    const pluieSum = this.calculateArraySum(pluieWithoutLast);
    const bacSum = this.calculateArraySum(bacWithoutLast);
    const surfaceMoySum = this.calculateArraySum(surfaceMoy);
    const lameCorrigeSum = this.calculateArraySum(lameCorrige);
    const volumeEvapoSum = this.calculateArraySum(volumeEvapo);

    return { evaporations, surfaceMoySum, lameCorrigeSum, volumeEvapoSum,
      pluieSum, bacSum
    };
  }

  async downloadEvaporationAsExcel(userId: number, startDate: string, endDate: string): Promise<string> {
    const { evaporations,...others} = await this.calculateEvaporation(startDate, endDate,userId);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Evaporation');

    // Add headers
    worksheet.addRow(['Date', 'Cote', 'Surface', 'Pluie', 'Bac','surfaceMoy','lameCorrige','volumeEvapo' ]);
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
  };
  worksheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' } // Yellow color
    };
    // Add rows
    evaporations.forEach(evaporation => {
      worksheet.addRow([evaporation.date, evaporation.cote, evaporation.surface, evaporation.pluie, evaporation.bac, evaporation.surfaceMoy,evaporation.lameCorrige,evaporation.volumeEvapo,]);
    });

    // Generate a unique file name
    const fileName = `evaporation_${Date.now()}.xlsx`;
    const filePath = `./downloads/${fileName}`;

    // Write workbook to a file
    await workbook.xlsx.writeFile(filePath);

    return filePath;
  }

  private extractData(data: Evaporation[]): { surface: number[], pluie: number[], bac: number[] } {
    const surface = data.map(d => d.surface);
    const pluie = data.map(d => d.pluie);
    const bac = data.map(d => d.bac);
    return { surface, pluie, bac };
  }

  private calculateSurfaceMoy(surface: number[]): number[] {
    return this.consecutiveAverage(surface) ;
  }

  private calculateLameCorrige(pluie: number[], bac: number[]): number[] {
    return pluie.map((p, i) => p + bac[i]);
  }

  private calculateVolumeEvapo(surfaceMoy: number[], lameCorrige: number[]): number[] {
    return surfaceMoy.map((s, i) => s * lameCorrige[i]*0.8);
  }
  private  consecutiveAverage = (arr: number[]): number[] => {
    return arr.map((el, ind, array) => {
      const first = (+array[ind] || 0);
      const second = 2;
      return ((el + first) / second);
    });
};

 // Calculate the sum of an array
 private calculateArraySum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

 async validateBacAndPluie(userId: number, bac: number, pluie: number): Promise<void> {
  const bacpluieMin = await this.bacPluieService.findOneByMin(userId);
  const bacpluieMax = await this.bacPluieService.findOneByMax(userId);

  if (bac < bacpluieMin.bac || bac > bacpluieMax.bac) {
    throw new ConflictException(`Invalid bac value. Please provide a value between ${bacpluieMin.bac} and ${bacpluieMax.bac}.`);
  }

  if (pluie < bacpluieMin.pluie || pluie > bacpluieMax.pluie) {
    throw new ConflictException(`Invalid pluie value. Please provide a value between ${bacpluieMin.pluie} and ${bacpluieMax.pluie}.`);
  }
}

}