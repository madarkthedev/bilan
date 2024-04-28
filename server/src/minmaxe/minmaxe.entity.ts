import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum MinMax {
  MIN = 'min',
  MAX = 'max',
}

@Entity()
export class BacPluie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'float' })
  pluie: number;

  @Column({ type: 'float' })
  bac: number;

  @Column({ type: 'enum', enum: MinMax })
  minmax: MinMax;

}