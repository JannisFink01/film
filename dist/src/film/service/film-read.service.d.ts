import { Film } from '../entity/film.js';
import { QueryBuilder } from './query-builder.js';
import RE2 from 're2';
export interface FindByIdParams {
    id: number;
    mitSchauspieler?: boolean;
}
export interface Suchkriterien {
    readonly regisseur?: string;
    readonly bewertung?: number;
    readonly preis?: number;
    readonly erscheinungsdatum?: string;
    readonly javascript?: boolean;
    readonly typescript?: boolean;
    readonly titel?: string;
}
export declare class FilmReadService {
    #private;
    static readonly ID_PATTERN: RE2;
    constructor(queryBuilder: QueryBuilder);
    findById({ id, mitSchauspieler }: FindByIdParams): Promise<Film | undefined>;
    find(suchkriterien?: Suchkriterien): Promise<Film[]>;
}
