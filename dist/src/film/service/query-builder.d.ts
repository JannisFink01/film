import { Film } from '../entity/film.js';
import { Repository } from 'typeorm';
export interface BuildIdParams {
    id: number;
    mitSchauspieler?: boolean;
}
export declare class QueryBuilder {
    #private;
    constructor(repo: Repository<Film>);
    buildId({ id, mitSchauspieler }: BuildIdParams): import("typeorm").SelectQueryBuilder<Film>;
    build(suchkriterien: Record<string, any>): import("typeorm").SelectQueryBuilder<Film>;
}
