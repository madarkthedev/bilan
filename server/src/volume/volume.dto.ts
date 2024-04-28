import { IsNotEmpty, IsNumber } from 'class-validator';

export class VolumeDto {
  @IsNotEmpty()
  @IsNumber()
  cote: number;

  @IsNotEmpty()
  @IsNumber()
  volume0: number;

  @IsNotEmpty()
  @IsNumber()
  volume1: number;

  @IsNumber()
  volume2: number;

  @IsNumber()
  volume3: number;

  @IsNumber()
  volume4: number;

  @IsNumber()
  volume5: number;

  @IsNumber()
  volume6: number;

  @IsNumber()
  volume7: number;

  @IsNumber()
  volume8: number;

  @IsNumber()
  volume9: number;
}