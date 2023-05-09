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
var FilmMutationResolver_1;
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IsInt, IsNumberString, Min } from 'class-validator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { BadUserInputError } from './errors.js';
import { FilmDTO } from '../rest/filmDTO.js';
import { FilmWriteService } from '../service/film-write.service.js';
import { JwtAuthGraphQlGuard } from '../../security/auth/jwt/jwt-auth-graphql.guard.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { RolesAllowed } from '../../security/auth/roles/roles-allowed.decorator.js';
import { RolesGraphQlGuard } from '../../security/auth/roles/roles-graphql.guard.js';
import { getLogger } from '../../logger/logger.js';
export class FilmUpdateDTO extends FilmDTO {
    id;
    version;
}
__decorate([
    IsNumberString(),
    __metadata("design:type", String)
], FilmUpdateDTO.prototype, "id", void 0);
__decorate([
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FilmUpdateDTO.prototype, "version", void 0);
let FilmMutationResolver = FilmMutationResolver_1 = class FilmMutationResolver {
    #service;
    #logger = getLogger(FilmMutationResolver_1.name);
    constructor(service) {
        this.#service = service;
    }
    async create(filmDTO) {
        this.#logger.debug('create: filmDTO=%o', filmDTO);
        const film = this.#filmDtoToFilm(filmDTO);
        const result = await this.#service.create(film);
        this.#logger.debug('createFilm: result=%o', result);
        if (Object.prototype.hasOwnProperty.call(result, 'type')) {
            throw new BadUserInputError(this.#errorMsgCreateFilm(result));
        }
        return result;
    }
    async update(filmDTO) {
        this.#logger.debug('update: film=%o', filmDTO);
        const film = this.#filmUpdateDtoToFilm(filmDTO);
        const versionStr = `"${filmDTO.version.toString()}"`;
        const result = await this.#service.update({
            id: Number.parseInt(filmDTO.id, 10),
            film,
            version: versionStr,
        });
        if (typeof result === 'object') {
            throw new BadUserInputError(this.#errorMsgUpdateFilm(result));
        }
        this.#logger.debug('updateFilm: result=%d', result);
        return result;
    }
    async delete(id) {
        const idStr = id.id;
        this.#logger.debug('delete: id=%s', idStr);
        const result = await this.#service.delete(idStr);
        this.#logger.debug('deleteFilm: result=%s', result);
        return result;
    }
    #filmDtoToFilm(filmDTO) {
        const titelDTO = filmDTO.titel;
        const titel = {
            id: undefined,
            titel: titelDTO.titel,
            film: undefined,
        };
        const schauspielern = filmDTO.schauspieler?.map((schauspielerDTO) => {
            const schauspieler = {
                id: undefined,
                name: schauspielerDTO.name,
                film: undefined,
            };
            return schauspieler;
        });
        const film = {
            id: undefined,
            version: undefined,
            regisseur: filmDTO.regisseur,
            bewertung: filmDTO.bewertung,
            preis: filmDTO.preis,
            erscheinungsdatum: filmDTO.erscheinungsdatum,
            titel,
            schauspieler: schauspielern,
            erzeugt: undefined,
            aktualisiert: undefined,
        };
        film.titel.film = film;
        return film;
    }
    #filmUpdateDtoToFilm(filmDTO) {
        return {
            id: undefined,
            version: undefined,
            regisseur: filmDTO.regisseur,
            bewertung: filmDTO.bewertung,
            preis: filmDTO.preis,
            erscheinungsdatum: filmDTO.erscheinungsdatum,
            titel: undefined,
            schauspieler: undefined,
            erzeugt: undefined,
            aktualisiert: undefined,
        };
    }
    #errorMsgCreateFilm(err) {
        switch (err.type) {
            case 'IsbnExists': {
                return `Die ISBN ${err.isbn} existiert bereits`;
            }
            default: {
                return 'Unbekannter Fehler';
            }
        }
    }
    #errorMsgUpdateFilm(err) {
        switch (err.type) {
            case 'FilmNotExists': {
                return `Es gibt kein Film mit der ID ${err.id}`;
            }
            case 'VersionInvalid': {
                return `"${err.version}" ist keine gueltige Versionsnummer`;
            }
            case 'VersionOutdated': {
                return `Die Versionsnummer "${err.version}" ist nicht mehr aktuell`;
            }
            default: {
                return 'Unbekannter Fehler';
            }
        }
    }
};
__decorate([
    Mutation(),
    RolesAllowed('admin', 'mitarbeiter'),
    __param(0, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilmDTO]),
    __metadata("design:returntype", Promise)
], FilmMutationResolver.prototype, "create", null);
__decorate([
    Mutation(),
    RolesAllowed('admin', 'mitarbeiter'),
    __param(0, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilmUpdateDTO]),
    __metadata("design:returntype", Promise)
], FilmMutationResolver.prototype, "update", null);
__decorate([
    Mutation(),
    RolesAllowed('admin'),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmMutationResolver.prototype, "delete", null);
FilmMutationResolver = FilmMutationResolver_1 = __decorate([
    Resolver(),
    UseGuards(JwtAuthGraphQlGuard, RolesGraphQlGuard),
    UseInterceptors(ResponseTimeInterceptor),
    __metadata("design:paramtypes", [FilmWriteService])
], FilmMutationResolver);
export { FilmMutationResolver };
//# sourceMappingURL=film-mutation.resolver.js.map