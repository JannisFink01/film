import { SchauspielerDTO } from './schauspielerDTO.js';
import { TitelDTO } from './titelDTO.js';
export declare const MAX_BEWERTUNG = 5;
export declare class FilmDtoOhneRef {
    readonly regisseur: string;
    readonly bewertung: number | undefined;
    readonly preis: number;
    readonly erscheinungsdatum: Date | string | undefined;
}
export declare class FilmDTO extends FilmDtoOhneRef {
    readonly titel: TitelDTO;
    readonly schauspieler: SchauspielerDTO[] | undefined;
}
