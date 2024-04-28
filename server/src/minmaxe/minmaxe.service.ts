import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBacPluieDto, UpdateBacPluieDto } from './minmaxe.dto';
import { BacPluie, MinMax } from './minmaxe.entity';

@Injectable()
export class BacPluieService {
  constructor(
    @InjectRepository(BacPluie)
    private readonly bacPluieRepository: Repository<BacPluie>,
  ) {}

  async create(userId: number, createBacPluieDto: CreateBacPluieDto) {
    const { pluie, bac, minmax } = createBacPluieDto;
    const existingBacPluie = await this.bacPluieRepository.findOne({
        where: { pluie, bac, minmax, userId },
      });

      // If the entity already exists, throw an exception
      if (existingBacPluie) {
        throw new NotFoundException('BacPluie already exists');
      }
    // Ensure userId is included
    const bacPluie = this.bacPluieRepository.create({
      pluie,
      bac,
      minmax,
      userId,
    });

    // Save the created entity
    return this.bacPluieRepository.save(bacPluie);
  }

  async update(id: number, updateBacPluieDto: UpdateBacPluieDto,userId:number) {
    const existingBacPluie = await this.bacPluieRepository.findOneBy({id});
    if (!existingBacPluie) {
      throw new NotFoundException(`BacPluie with id ${id} not found`);
    }

    return this.bacPluieRepository.update({ id, userId },updateBacPluieDto);
  }
  async findAll(userId: number): Promise<BacPluie[]> {
    return this.bacPluieRepository.find({
        select: ['pluie', 'bac'], });
  }
  async findOneByMin(userId: number): Promise<BacPluie> {
    return this.bacPluieRepository.findOne({ where: { userId, minmax:MinMax.MIN },
        select: ['pluie', 'bac'], });
  }
  async findOneByMax(userId: number): Promise<BacPluie> {
    return this.bacPluieRepository.findOne({ where: { userId, minmax:MinMax.MAX},
        select: ['pluie', 'bac'], });
  }
}