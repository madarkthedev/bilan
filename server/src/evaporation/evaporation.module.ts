import { Module } from '@nestjs/common';
import { EvaporationController } from './evaporation.controller';
import { EvaporationService } from './evaporation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaporation } from './evaporation.entity';
import { SurfaceModule } from 'src/surface/surface.module';
import { MinmaxeModule } from 'src/minmaxe/minmaxe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evaporation]), SurfaceModule,MinmaxeModule],
  controllers: [EvaporationController],
  providers: [EvaporationService],
})
export class EvaporationModule {}
