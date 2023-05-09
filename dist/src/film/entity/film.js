var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DecimalTransformer } from './decimal-transformer.js';
import { Schauspieler } from './schauspieler.js';
import { Titel } from './titel.js';
import { dbType } from '../../config/dbtype.js';
let Film = class Film {
    id;
    titel;
    regisseur;
    schauspieler;
    version;
    bewertung;
    preis;
    erscheinungsdatum;
    erzeugt;
    aktualisiert;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], Film.prototype, "id", void 0);
__decorate([
    OneToOne(() => Titel, (titel) => titel.film, {
        cascade: ['insert', 'remove'],
    }),
    __metadata("design:type", Object)
], Film.prototype, "titel", void 0);
__decorate([
    Column('varchar', { length: 40 }),
    ApiProperty({ example: 'Sam Raimi', type: String }),
    __metadata("design:type", String)
], Film.prototype, "regisseur", void 0);
__decorate([
    OneToMany(() => Schauspieler, (schauspieler) => schauspieler.film, {
        cascade: ['insert', 'remove'],
    }),
    __metadata("design:type", Object)
], Film.prototype, "schauspieler", void 0);
__decorate([
    VersionColumn(),
    __metadata("design:type", Object)
], Film.prototype, "version", void 0);
__decorate([
    Column('int'),
    ApiProperty({ example: 5, type: Number }),
    __metadata("design:type", Object)
], Film.prototype, "bewertung", void 0);
__decorate([
    Column('decimal', {
        precision: 8,
        scale: 2,
        transformer: new DecimalTransformer(),
    }),
    ApiProperty({ example: 1, type: Number }),
    __metadata("design:type", Number)
], Film.prototype, "preis", void 0);
__decorate([
    Column('date'),
    ApiProperty({ example: '2023-02-28' }),
    __metadata("design:type", Object)
], Film.prototype, "erscheinungsdatum", void 0);
__decorate([
    CreateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    }),
    __metadata("design:type", Object)
], Film.prototype, "erzeugt", void 0);
__decorate([
    UpdateDateColumn({
        type: dbType === 'sqlite' ? 'datetime' : 'timestamp',
    }),
    __metadata("design:type", Object)
], Film.prototype, "aktualisiert", void 0);
Film = __decorate([
    Entity()
], Film);
export { Film };
//# sourceMappingURL=film.js.map