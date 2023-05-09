var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray, IsISBN, IsISO8601, IsInt, IsOptional, IsPositive, Max, Min, ValidateNested, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SchauspielerDTO } from './schauspielerDTO.js';
import { TitelDTO } from './titelDTO.js';
import { Type } from 'class-transformer';
export const MAX_RATING = 5;
export class FilmDtoOhneRef {
    regisseur;
    bewertung;
    preis;
    erscheinungsdatum;
}
__decorate([
    IsISBN(13),
    ApiProperty({ example: '0-007-00644-6', type: String }),
    __metadata("design:type", String)
], FilmDtoOhneRef.prototype, "regisseur", void 0);
__decorate([
    IsInt(),
    Min(0),
    Max(MAX_RATING),
    ApiProperty({ example: 5, type: Number }),
    __metadata("design:type", Object)
], FilmDtoOhneRef.prototype, "bewertung", void 0);
__decorate([
    IsPositive(),
    ApiProperty({ example: 1, type: Number }),
    __metadata("design:type", Number)
], FilmDtoOhneRef.prototype, "preis", void 0);
__decorate([
    IsISO8601({ strict: true }),
    IsOptional(),
    ApiProperty({ example: '2021-01-31' }),
    __metadata("design:type", Object)
], FilmDtoOhneRef.prototype, "erscheinungsdatum", void 0);
export class FilmDTO extends FilmDtoOhneRef {
    titel;
    schauspieler;
}
__decorate([
    ValidateNested(),
    Type(() => TitelDTO),
    ApiProperty({ example: 'Der Titel', type: String }),
    __metadata("design:type", TitelDTO)
], FilmDTO.prototype, "titel", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => SchauspielerDTO),
    ApiProperty({ example: 'Die Schauspieler', type: String }),
    __metadata("design:type", Object)
], FilmDTO.prototype, "schauspieler", void 0);
//# sourceMappingURL=filmDTO.js.map