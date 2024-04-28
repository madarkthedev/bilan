import { IsNotEmpty, IsNumber } from 'class-validator';

export class SurfaceDto {
  @IsNotEmpty()

  cote: number;

  @IsNotEmpty()

  surface0: number;

  @IsNotEmpty()

  surface1: number;
  @IsNotEmpty()

  surface2: number;
  @IsNotEmpty()

  surface3: number;
  @IsNotEmpty()

  surface4: number;
  @IsNotEmpty()

  surface5: number;
  @IsNotEmpty()

  surface6: number;
  @IsNotEmpty()

  surface7: number;
  @IsNotEmpty()

  surface8: number;
  @IsNotEmpty()

  surface9: number;
}