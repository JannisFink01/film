var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { Film } from './film.js';
let Titel = class Titel {
    id;
    titel;
    film;
};
__decorate([
    Column('int'),
    PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], Titel.prototype, "id", void 0);
__decorate([
    Column('varchar', { unique: true, length: 40 }),
    __metadata("design:type", String)
], Titel.prototype, "titel", void 0);
__decorate([
    OneToOne(() => Film, (film) => film.titel),
    JoinColumn({ name: 'film_id' }),
    __metadata("design:type", Object)
], Titel.prototype, "film", void 0);
Titel = __decorate([
    Entity()
], Titel);
export { Titel };
//# sourceMappingURL=titel.js.map