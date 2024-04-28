
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class SurfaceUpdate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    updateTime: Date;


}