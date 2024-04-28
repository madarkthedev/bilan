import { Module } from '@nestjs/common';
import { SurfaceController } from './surface.controller';
import { SurfaceService } from './surface.service';
import { Surface } from './surface.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurfaceUpdate } from './surface-update.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Surface,SurfaceUpdate]), // Import your entities
  ],
  controllers: [SurfaceController],
  providers: [SurfaceService],
  exports: [SurfaceService],
})
export class SurfaceModule {}
