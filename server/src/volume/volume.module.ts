import { Module } from '@nestjs/common';
import { VolumeController } from './volume.controller';
import { VolumeService } from './volume.service';
import { Volume } from './volume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolumeUpdate } from './volume-update.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Volume,VolumeUpdate]), // Import your entities
  ],
  controllers: [VolumeController],
  providers: [VolumeService]
})
export class VolumeModule {}
