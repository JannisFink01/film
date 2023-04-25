import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @VersionColumn()
    readonly version: number | undefined;

    @Column('int')
    @ApiProperty({ example: 5, type: Number })
    readonly bewertung: number | undefined;

    @Column('varchar', { length: 12 })
    @ApiProperty({ example: 'CD', type: String })
    readonly art: FilmArt | undefined;

    @Column('decimal', {
        precision: 8,
        scale: 2,
        transformer: new DecimalTransformer(),
    })
    @ApiProperty({ example: 1, type: Number })
    readonly preis!: number;

    @Column('boolean')
    @ApiProperty({ example: true, type: Boolean })
    readonly ausleihbar: boolean | undefined;

    @Column('date')
    @ApiProperty({ example: '2023-02-28' })
    readonly erscheinungsdatum: Date | string | undefined;

    @Column('simple-array')
    readonly beschreibung: string[] | undefined;

    @OneToOne(() => Titel, (titel) => titel.film, {
        cascade: ['insert', 'remove'],
    })
    readonly titel: Titel | undefined;
}
