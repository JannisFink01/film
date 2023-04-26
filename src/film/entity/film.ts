
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
import { ApiProperty } from '@nestjs/swagger';
import { DecimalTransformer } from './decimal-transformer.js';
import { Schauspieler } from './schauspieler.js';
import { Titel } from './titel.js';
import { dbType } from '../../config/dbtype.js';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @OneToOne(() => Titel, (titel) => titel.film, {
        cascade: ['insert', 'remove'],
    })
    readonly titel: Titel | undefined;

    @Column('varchar', { length: 40 })
    @ApiProperty({ example: 'Sam Raimi', type: String })
    readonly regisseur!: string;

    @OneToMany(() => Schauspieler, (schauspieler) => schauspieler.film, {
        cascade: ['insert', 'remove'],
    })
    readonly schauspieler: Schauspieler[] | undefined;

    @VersionColumn()
    readonly version: number | undefined;

    @Column('int')
    @ApiProperty({ example: 5, type: Number })
    readonly bewertung: number | undefined;

    @Column('decimal', {
        precision: 8,
        scale: 2,
        transformer: new DecimalTransformer(),
    })
    @ApiProperty({ example: 1, type: Number })
    readonly preis!: number;

    @Column('date')
    @ApiProperty({ example: '2023-02-28' })
    readonly erscheinungsdatum: Date | string | undefined;

    // https://typeorm.io/entities#special-columns
    // https://typeorm.io/entities#column-types-for-postgres
    // https://typeorm.io/entities#column-types-for-mysql--mariadb
    // https://typeorm.io/entities#column-types-for-sqlite--cordova--react-native--expo
    // 'better-sqlite3' erfordert Python zum Uebersetzen, wenn das Docker-Image gebaut wird
    @CreateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    })
    // SQLite:
    // @CreateDateColumn({ type: 'datetime' })
    readonly erzeugt: Date | undefined;

    @UpdateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    })
    // SQLite:
    // @UpdateDateColumn({ type: 'datetime' })
    readonly aktualisiert: Date | undefined;
}
