import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Volume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column({ type: 'numeric' })
  cote: number;

  @Column({ type: 'numeric' })
  volume0: number;

  @Column({ type: 'numeric' })
  volume1: number;

  @Column({ type: 'numeric' })
  volume2: number;

  @Column({ type: 'numeric' })
  volume3: number;
  @Column({ type: 'numeric' })
  volume4: number;

  @Column({ type: 'numeric' })
  volume5: number;

  @Column({ type: 'numeric' })
  volume6: number;

  @Column({ type: 'numeric' })
  volume7: number;
@Column({ type: 'numeric' })
  volume8: number;
  @Column({ type: 'numeric' })
  volume9: number;

}
