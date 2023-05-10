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
var FilmGetController_1;
var _a;
import { ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Controller, Get, Headers, HttpStatus, Param, Query, Req, Res, UseInterceptors, } from '@nestjs/common';
import { FilmReadService, } from '../service/film-read.service.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { getBaseUri } from './getBaseUri.js';
import { getLogger } from '../../logger/logger.js';
import { paths } from '../../config/paths.js';
export class FilmQuery {
}
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", String)
], FilmQuery.prototype, "regisseur", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", Number)
], FilmQuery.prototype, "bewertung", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", Number)
], FilmQuery.prototype, "preis", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", String)
], FilmQuery.prototype, "erscheinungsdatum", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", String)
], FilmQuery.prototype, "homepage", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", Boolean)
], FilmQuery.prototype, "javascript", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", Boolean)
], FilmQuery.prototype, "typescript", void 0);
__decorate([
    ApiProperty({ required: false }),
    __metadata("design:type", String)
], FilmQuery.prototype, "titel", void 0);
let FilmGetController = FilmGetController_1 = class FilmGetController {
    #service;
    #logger = getLogger(FilmGetController_1.name);
    constructor(service) {
        this.#service = service;
    }
    async findById(id, req, version, res) {
        this.#logger.debug('findById: id=%s, version=%s"', id, version);
        if (req.accepts(['json', 'html']) === false) {
            this.#logger.debug('findById: accepted=%o', req.accepted);
            return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
        }
        let film;
        try {
            film = await this.#service.findById({ id });
        }
        catch (err) {
            this.#logger.error('findById: error=%o', err);
            return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (film === undefined) {
            this.#logger.debug('findById: NOT_FOUND');
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }
        this.#logger.debug('findById(): film=%o', film);
        const versionDb = film.version;
        if (version === `"${versionDb}"`) {
            this.#logger.debug('findById: NOT_MODIFIED');
            return res.sendStatus(HttpStatus.NOT_MODIFIED);
        }
        this.#logger.debug('findById: versionDb=%s', versionDb);
        res.header('ETag', `"${versionDb}"`);
        const filmModel = this.#toModel(film, req);
        this.#logger.debug('findById: filmModel=%o', filmModel);
        return res.json(filmModel);
    }
    async find(query, req, res) {
        this.#logger.debug('find: query=%o', query);
        if (req.accepts(['json', 'html']) === false) {
            this.#logger.debug('find: accepted=%o', req.accepted);
            return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
        }
        const filme = await this.#service.find(query);
        this.#logger.debug('find: %o', filme);
        if (filme.length === 0) {
            this.#logger.debug('find: NOT_FOUND');
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }
        const filmeModel = filme.map((film) => this.#toModel(film, req, false));
        this.#logger.debug('find: filmeModel=%o', filmeModel);
        const result = { _embedded: { filme: filmeModel } };
        return res.json(result).send();
    }
    #toModel(film, req, all = true) {
        const baseUri = getBaseUri(req);
        this.#logger.debug('#toModel: baseUri=%s', baseUri);
        const { id } = film;
        const links = all
            ? {
                self: { href: `${baseUri}/${id}` },
                list: { href: `${baseUri}` },
                add: { href: `${baseUri}` },
                update: { href: `${baseUri}/${id}` },
                remove: { href: `${baseUri}/${id}` },
            }
            : { self: { href: `${baseUri}/${id}` } };
        this.#logger.debug('#toModel: film=%o, links=%o', film, links);
        const titelModel = {
            titel: film.titel?.titel ?? 'N/A',
        };
        const filmModel = {
            regisseur: film.regisseur,
            bewertung: film.bewertung,
            preis: film.preis,
            erscheinungsdatum: film.erscheinungsdatum,
            titel: titelModel,
            _links: links,
        };
        return filmModel;
    }
};
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Suche mit der Film-ID', tags: ['Suchen'] }),
    ApiParam({
        name: 'id',
        description: 'Z.B. 00000000-0000-0000-0000-000000000001',
    }),
    ApiHeader({
        name: 'If-None-Match',
        description: 'Header für bedingte GET-Requests, z.B. "0"',
        required: false,
    }),
    ApiOkResponse({ description: 'Der Film wurde gefunden' }),
    ApiNotFoundResponse({ description: 'Kein Film zur ID gefunden' }),
    ApiResponse({
        status: HttpStatus.NOT_MODIFIED,
        description: 'Der Film wurde bereits heruntergeladen',
    }),
    __param(0, Param('id')),
    __param(1, Req()),
    __param(2, Headers('If-None-Match')),
    __param(3, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FilmGetController.prototype, "findById", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Suche mit Suchkriterien', tags: ['Suchen'] }),
    ApiOkResponse({ description: 'Eine evtl. leere Liste mit Filmen' }),
    __param(0, Query()),
    __param(1, Req()),
    __param(2, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FilmQuery, Object, Object]),
    __metadata("design:returntype", Promise)
], FilmGetController.prototype, "find", null);
FilmGetController = FilmGetController_1 = __decorate([
    Controller(paths.rest),
    UseInterceptors(ResponseTimeInterceptor),
    ApiTags('Film API'),
    __metadata("design:paramtypes", [typeof (_a = typeof FilmReadService !== "undefined" && FilmReadService) === "function" ? _a : Object])
], FilmGetController);
export { FilmGetController };
//# sourceMappingURL=film-get.controller.js.map