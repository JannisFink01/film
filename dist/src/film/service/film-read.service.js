var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FilmReadService_1;
import { Film } from '../entity/film.js';
import { Injectable } from '@nestjs/common';
import { QueryBuilder } from './query-builder.js';
import RE2 from 're2';
import { getLogger } from '../../logger/logger.js';
let FilmReadService = FilmReadService_1 = class FilmReadService {
    static ID_PATTERN = new RE2('^[1-9][\\d]*$');
    #filmProps;
    #queryBuilder;
    #logger = getLogger(FilmReadService_1.name);
    constructor(queryBuilder) {
        const filmDummy = new Film();
        this.#filmProps = Object.getOwnPropertyNames(filmDummy);
        this.#queryBuilder = queryBuilder;
    }
    async findById({ id, mitSchauspieler = false }) {
        this.#logger.debug('findById: id=%d', id);
        const film = await this.#queryBuilder
            .buildId({ id, mitSchauspieler })
            .getOne();
        if (film === null) {
            this.#logger.debug('findById: Kein Film gefunden');
            return;
        }
        this.#logger.debug('findById: film=%o', film);
        return film;
    }
    async find(suchkriterien) {
        this.#logger.debug('find: suchkriterien=%o', suchkriterien);
        if (suchkriterien === undefined) {
            const filme = await this.#queryBuilder.build({}).getMany();
            return filme;
        }
        const keys = Object.keys(suchkriterien);
        if (keys.length === 0) {
            const filme = await this.#queryBuilder
                .build(suchkriterien)
                .getMany();
            return filme;
        }
        if (!this.#checkKeys(keys)) {
            return [];
        }
        const filme = await this.#queryBuilder.build(suchkriterien).getMany();
        this.#logger.debug('find: filme=%o', filme);
        return filme;
    }
    #checkKeys(keys) {
        let validKeys = true;
        keys.forEach((key) => {
            if (!this.#filmProps.includes(key) &&
                key !== 'javascript' &&
                key !== 'typescript') {
                this.#logger.debug('#find: ungueltiges Suchkriterium "%s"', key);
                validKeys = false;
            }
        });
        return validKeys;
    }
};
FilmReadService = FilmReadService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [QueryBuilder])
], FilmReadService);
export { FilmReadService };
//# sourceMappingURL=film-read.service.js.map