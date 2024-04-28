import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Evaporation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ type: 'float' })
  cote: number;

  @Column({ type: 'float' })
  surface?: number;

  @Column({ type: 'float' })
  pluie: number;
  @Column({ type: 'float' })
  bac: number;

  @Column({ type: 'int' })
  userId: number;


}




export class EvapoTotale extends Evaporation {

  @Column({ type: 'numeric' })
  surfaceMoy: number;

  @Column({ type: 'numeric' })
  lameCorrige: number;

  @Column({ type: 'numeric' })
  volumeEvapo: number;
}

