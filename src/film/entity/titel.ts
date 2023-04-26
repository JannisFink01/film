import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './film.js';

@Entity()
export class Titel {
    @Column('int')
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('varchar', { unique: true, length: 40 })
    readonly titel!: string;

    @OneToOne(() => Film, (film) => film.titel)
    @JoinColumn({ name: 'film_id' })
    film: Film | undefined;
}
