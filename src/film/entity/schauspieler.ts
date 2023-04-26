import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './film.js';

@Entity()
export class Schauspieler {
    @Column('int')
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('varchar', { length: 40 })
    readonly name!: string;

    @ManyToOne(() => Film, (film) => film.schauspieler)
    @JoinColumn({ name: 'film_id' })
    film: any;
}
