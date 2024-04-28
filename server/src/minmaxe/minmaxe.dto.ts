import { MinMax } from "./minmaxe.entity";

export class CreateBacPluieDto {
    pluie: number;
    bac: number;
    minmax: MinMax;

  }

  export class UpdateBacPluieDto {
    pluie?: number;
    bac?: number;
    minmax?: MinMax;

  }