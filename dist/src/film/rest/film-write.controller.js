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
var FilmWriteController_1;
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiNoContentResponse, ApiOperation, ApiPreconditionFailedResponse, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Body, Controller, Delete, Headers, HttpStatus, Param, Post, Put, Req, Res, UseInterceptors, } from '@nestjs/common';
import { FilmDTO, FilmDtoOhneRef } from './filmDTO.js';
import { FilmWriteService } from '../service/film-write.service.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { getBaseUri } from './getBaseUri.js';
import { getLogger } from '../../logger/logger.js';
import { paths } from '../../config/paths.js';
let FilmWriteController = FilmWriteController_1 = class FilmWriteController {
    #service;
    #logger = getLogger(FilmWriteController_1.name);
    constructor(service) {
        this.#service = service;
    }
    async create(filmDTO, req, res) {
        this.#logger.debug('create: filmDTO=%o', filmDTO);
        const film = this.#filmDtoToFilm(filmDTO);
        const result = await this.#service.create(film);
        if (Object.prototype.hasOwnProperty.call(result, 'type')) {
            return this.#handleCreateError(result, res);
        }
        const location = `${getBaseUri(req)}/${result}`;
        this.#logger.debug('create: location=%s', location);
        return res.location(location).send();
    }
    async update(filmDTO, id, version, res) {
        this.#logger.debug('update: id=%s, filmDTO=%o, version=%s', id, filmDTO, version);
        if (version === undefined) {
            const msg = 'Header "If-Match" fehlt';
            this.#logger.debug('#handleUpdateError: msg=%s', msg);
            return res
                .status(HttpStatus.PRECONDITION_REQUIRED)
                .set('Content-Type', 'text/plain')
                .send(msg);
        }
        const film = this.#filmDtoOhneRefToFilm(filmDTO);
        const result = await this.#service.update({ id, film, version });
        if (typeof result === 'object') {
            return this.#handleUpdateError(result, res);
        }
        this.#logger.debug('update: version=%d', result);
        return res.set('ETag', `"${result}"`).sendStatus(HttpStatus.NO_CONTENT);
    }
    async delete(id, res) {
        this.#logger.debug('delete: id=%s', id);
        try {
            await this.#service.delete(id);
        }
        catch (err) {
            this.#logger.error('delete: error=%o', err);
            return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return res.sendStatus(HttpStatus.NO_CONTENT);
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
        film.schauspieler?.forEach((schauspieler) => {
            schauspieler.film = film;
        });
        return film;
    }
    #handleCreateError(err, res) {
        switch (err.type) {
            case 'RegisseurExists': {
                return this.#handleregisseurExists(err.regisseur, res);
            }
            default: {
                return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    #handleregisseurExists(regisseur, res) {
        const msg = `Die regisseur-Nummer "${regisseur}" existiert bereits.`;
        this.#logger.debug('#handleregisseurExists(): msg=%s', msg);
        return res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .set('Content-Type', 'text/plain')
            .send(msg);
    }
    #filmDtoOhneRefToFilm(filmDTO) {
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
    #handleUpdateError(err, res) {
        switch (err.type) {
            case 'FilmNotExists': {
                const { id } = err;
                const msg = `Es gibt kein Film mit der ID "${id}".`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }
            case 'VersionInvalid': {
                const { version } = err;
                const msg = `Die Versionsnummer "${version}" ist ungueltig.`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }
            case 'VersionOutdated': {
                const { version } = err;
                const msg = `Die Versionsnummer "${version}" ist nicht aktuell.`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }
            default: {
                return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Ein neues Film anlegen' }),
    ApiCreatedResponse({ description: 'Erfolgreich neu angelegt' }),
    ApiBadRequestResponse({ description: 'Fehlerhafte Filmdaten' }),
    __param(0, Body()),
    __param(1, Req()),
    __param(2, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilmDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], FilmWriteController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({
        summary: 'Ein vorhandener Film  aktualisieren',
        tags: ['Aktualisieren'],
    }),
    ApiHeader({
        name: 'If-Match',
        description: 'Header für optimistische Synchronisation',
        required: false,
    }),
    ApiHeader({
        name: 'Authorization',
        description: 'Header für JWT',
        required: true,
    }),
    ApiNoContentResponse({ description: 'Erfolgreich aktualisiert' }),
    ApiBadRequestResponse({ description: 'Fehlerhafte Filmdaten' }),
    ApiPreconditionFailedResponse({
        description: 'Falsche Version im Header "If-Match"',
    }),
    ApiResponse({
        status: HttpStatus.PRECONDITION_REQUIRED,
        description: 'Header "If-Match" fehlt',
    }),
    __param(0, Body()),
    __param(1, Param('id')),
    __param(2, Headers('If-Match')),
    __param(3, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilmDtoOhneRef, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], FilmWriteController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: 'Film mit der ID löschen', tags: ['Loeschen'] }),
    ApiHeader({
        name: 'Authorization',
        description: 'Header für JWT',
        required: true,
    }),
    ApiNoContentResponse({
        description: 'Der Film wurde gelöscht oder war nicht vorhanden',
    }),
    __param(0, Param('id')),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FilmWriteController.prototype, "delete", null);
FilmWriteController = FilmWriteController_1 = __decorate([
    Controller(paths.rest),
    UseInterceptors(ResponseTimeInterceptor),
    ApiTags('Film API'),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [FilmWriteService])
], FilmWriteController);
export { FilmWriteController };
//# sourceMappingURL=film-write.controller.js.map