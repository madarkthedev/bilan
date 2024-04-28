import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BacPluieService } from 'src/minmaxe/minmaxe.service';


@Injectable()
export class ValidateBacPluiePipe implements PipeTransform {
  constructor(private readonly bacPluieService: BacPluieService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const userId = value.userId; // Assuming userId is included in the DTO

    const bacPluieMin = await this.bacPluieService.findOneByMin(userId);
    const bacPluieMax = await this.bacPluieService.findOneByMax(userId);

    const bac = value.bac;
    const pluie = value.pluie;

    if (bac < bacPluieMin.bac || bac > bacPluieMax.bac || pluie < bacPluieMin.pluie || pluie > bacPluieMax.pluie) {
      throw new BadRequestException(`Invalid bac or pluie value. Please provide values within the ranges.`);
    }

    return value;
  }
}