var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilmQueryResolver_1;
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BadUserInputError } from './errors.js';
import { FilmReadService } from '../service/film-read.service.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { UseInterceptors } from '@nestjs/common';
import { getLogger } from '../../logger/logger.js';
let FilmQueryResolver = FilmQueryResolver_1 = class FilmQueryResolver {
    #service;
    #logger = getLogger(FilmQueryResolver_1.name);
    constructor(service) {
        this.#service = service;
    }
    async film(idInput) {
        const { id } = idInput;
        this.#logger.debug('findById: id=%d', id);
        const film = await this.#service.findById({ id });
        if (film === undefined) {
            throw new BadUserInputError(`Es wurde kein Film mit der ID ${id} gefunden.`);
        }
        const filmDTO = this.#toFilmDTO(film);
        this.#logger.debug('findById: filmDTO=%o', filmDTO);
        return filmDTO;
    }
    async filme(titel) {
        const titelStr = titel?.titel;
        this.#logger.debug('find: titel=%s', titelStr);
        const suchkriterium = titelStr === undefined ? {} : { titel: titelStr };
        const filme = await this.#service.find(suchkriterium);
        if (filme.length === 0) {
            throw new BadUserInputError('Es wurden keine Buecher gefunden.');
        }
        const buecherDTO = filme.map((film) => this.#toFilmDTO(film));
        this.#logger.debug('find: buecherDTO=%o', buecherDTO);
        return buecherDTO;
    }
    #toFilmDTO(film) {
        return {
            id: film.id,
            version: film.version,
            regisseur: film.regisseur,
            bewertung: film.bewertung,
            preis: film.preis,
            erscheinungsdatum: film.erscheinungsdatum,
            titel: film.titel,
        };
    }
};
__decorate([
    Query(),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmQueryResolver.prototype, "film", null);
__decorate([
    Query(),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmQueryResolver.prototype, "filme", null);
FilmQueryResolver = FilmQueryResolver_1 = __decorate([
    Resolver(),
    UseInterceptors(ResponseTimeInterceptor),
    __metadata("design:paramtypes", [FilmReadService])
], FilmQueryResolver);
export { FilmQueryResolver };
//# sourceMappingURL=film-query.resolver.js.map