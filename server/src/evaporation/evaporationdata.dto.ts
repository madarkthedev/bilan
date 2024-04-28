import { IsArray, IsNotEmpty } from "class-validator";
import { EvapoTotale } from "./evaporation.entity";

export class EvaporationDataDto {
    @IsNotEmpty()
    @IsArray()
    surfaceMoy: number[];
    @IsNotEmpty()
    @IsArray()
    lameCorrige: number[];
    @IsNotEmpty()
    @IsArray()
    volumeEvapo: number[];
  }

  export type EvaporationSum = {
    evaporations: EvapoTotale[];
    surfaceMoySum: number;
    lameCorrigeSum: number;
    volumeEvapoSum: number;
    pluieSum: number;
    bacSum: number;
};

