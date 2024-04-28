import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BacPluieService } from './minmaxe.service';
import { BacPluieController } from './minmaxe.controller';
import { BacPluie } from './minmaxe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BacPluie])],
  providers: [BacPluieService],
  controllers: [BacPluieController],
  exports: [BacPluieService],
})
export class MinmaxeModule {}
