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
var QueryBuilder_1;
import { Film } from '../entity/film.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schauspieler } from '../entity/schauspieler.js';
import { Titel } from '../entity/titel.js';
import { getLogger } from '../../logger/logger.js';
import { typeOrmModuleOptions } from '../../config/db.js';
let QueryBuilder = QueryBuilder_1 = class QueryBuilder {
    #filmAlias = `${Film.name
        .charAt(0)
        .toLowerCase()}${Film.name.slice(1)}`;
    #titelAlias = `${Titel.name
        .charAt(0)
        .toLowerCase()}${Titel.name.slice(1)}`;
    #schauspielerAlias = `${Schauspieler.name
        .charAt(0)
        .toLowerCase()}${Schauspieler.name.slice(1)}`;
    #repo;
    #logger = getLogger(QueryBuilder_1.name);
    constructor(repo) {
        this.#repo = repo;
    }
    buildId({ id, mitSchauspieler = false }) {
        const queryBuilder = this.#repo.createQueryBuilder(this.#filmAlias);
        queryBuilder.innerJoinAndSelect(`${this.#filmAlias}.titel`, this.#titelAlias);
        if (mitSchauspieler) {
            queryBuilder.leftJoinAndSelect(`${this.#filmAlias}.schauspieler`, this.#schauspielerAlias);
        }
        queryBuilder.where(`${this.#filmAlias}.id = :id`, { id: id });
        return queryBuilder;
    }
    build(suchkriterien) {
        this.#logger.debug('build: suchkriterien=%o', suchkriterien);
        let queryBuilder = this.#repo.createQueryBuilder(this.#filmAlias);
        queryBuilder.innerJoinAndSelect(`${this.#filmAlias}.titel`, 'titel');
        const { titel, javascript, typescript, ...props } = suchkriterien;
        let useWhere = true;
        if (titel !== undefined && typeof titel === 'string') {
            const ilike = typeOrmModuleOptions.type === 'postgres' ? 'ilike' : 'like';
            queryBuilder = queryBuilder.where(`${this.#titelAlias}.titel ${ilike} :titel`, { titel: `%${titel}%` });
            useWhere = false;
        }
        if (javascript === 'true') {
            queryBuilder = useWhere
                ? queryBuilder.where(`${this.#filmAlias}.schlagwoerter like '%JAVASCRIPT%'`)
                : queryBuilder.andWhere(`${this.#filmAlias}.schlagwoerter like '%JAVASCRIPT%'`);
            useWhere = false;
        }
        if (typescript === 'true') {
            queryBuilder = useWhere
                ? queryBuilder.where(`${this.#filmAlias}.schlagwoerter like '%TYPESCRIPT%'`)
                : queryBuilder.andWhere(`${this.#filmAlias}.schlagwoerter like '%TYPESCRIPT%'`);
            useWhere = false;
        }
        Object.keys(props).forEach((key) => {
            const param = {};
            param[key] = props[key];
            queryBuilder = useWhere
                ? queryBuilder.where(`${this.#filmAlias}.${key} = :${key}`, param)
                : queryBuilder.andWhere(`${this.#filmAlias}.${key} = :${key}`, param);
            useWhere = false;
        });
        this.#logger.debug('build: sql=%s', queryBuilder.getSql());
        return queryBuilder;
    }
};
QueryBuilder = QueryBuilder_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Film)),
    __metadata("design:paramtypes", [Repository])
], QueryBuilder);
export { QueryBuilder };
//# sourceMappingURL=query-builder.js.map