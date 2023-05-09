import { FilmReadService, type Suchkriterien } from '../service/film-read.service.js';
import { Request, Response } from 'express';
import { type Film } from '../entity/film.js';
import { Titel } from '../entity/titel.js';
export interface Link {
    href: string;
}
export interface Links {
    self: Link;
    list?: Link;
    add?: Link;
    update?: Link;
    remove?: Link;
}
export type TitelModel = Omit<Titel, 'film' | 'id'>;
export type FilmModel = Omit<Film, 'aktualisiert' | 'erzeugt' | 'id' | 'schauspieler' | 'titel' | 'version'> & {
    titel: TitelModel;
    _links: Links;
};
export interface FilmeModel {
    _embedded: {
        filme: FilmModel[];
    };
}
export declare class FilmQuery implements Suchkriterien {
    readonly isbn: string;
    readonly rating: number;
    readonly preis: number;
    readonly erscheinungsdatum: string;
    readonly homepage: string;
    readonly javascript: boolean;
    readonly typescript: boolean;
    readonly titel: string;
}
export declare class FilmGetController {
    #private;
    constructor(service: FilmReadService);
    findById(id: number, req: Request, version: string | undefined, res: Response): Promise<Response<FilmModel | undefined>>;
    find(query: FilmQuery, req: Request, res: Response): Promise<Response<FilmeModel | undefined>>;
}
