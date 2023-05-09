import { type Film } from '../entity/film.js';
import { FilmReadService } from '../service/film-read.service.js';
export type FilmDTO = Omit<Film, 'aktualisiert' | 'erzeugt' | 'schauspieler'>;
export interface IdInput {
    id: number;
}
export declare class FilmQueryResolver {
    #private;
    constructor(service: FilmReadService);
    film(idInput: IdInput): Promise<FilmDTO>;
    filme(titel: {
        titel: string;
    } | undefined): Promise<FilmDTO[]>;
}
