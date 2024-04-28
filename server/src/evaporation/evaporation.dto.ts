import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEvaporationDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()

  cote: number;

  @IsNotEmpty()

  pluie: number;
  @IsOptional()

  surface: number;
  @IsNotEmpty()

  bac: number;

}