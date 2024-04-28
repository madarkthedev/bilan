import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Surface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column({ type: 'float' })
  cote: number;

  @Column({ type: 'float' })
  surface0: number;

  @Column({ type: 'float' })
  surface1: number;

  @Column({ type: 'float' })
  surface2: number;

  @Column({ type: 'float' })
  surface3: number;
  @Column({ type: 'float' })
  surface4: number;

  @Column({ type: 'float' })
  surface5: number;

  @Column({ type: 'float' })
  surface6: number;

  @Column({ type: 'float' })
  surface7: number;
  @Column({ type: 'float' })
  surface8: number;
  @Column({ type: 'float' })
  surface9: number;

}
