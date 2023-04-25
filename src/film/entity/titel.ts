import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

<<<<<<< HEAD

=======
>>>>>>> 3387ae2dff1c2965ebd22f6c23d75e2ad3ab1d7a
@Entity()
export class Titel {
    @Column('int')
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('varchar', { unique: true, length: 40 })
    readonly titel!: string;
}
