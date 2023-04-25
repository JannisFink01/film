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

    @Column('varchar', { unique: true, length: 32 })
    readonly beschriftung!: string;
}
<<<<<<< HEAD


=======
>>>>>>> 3387ae2dff1c2965ebd22f6c23d75e2ad3ab1d7a
