import { Schauspieler } from './schauspieler.js';
import { Titel } from './titel.js';
export declare class Film {
    id: number | undefined;
    readonly titel: Titel | undefined;
    readonly regisseur: string;
    readonly schauspieler: Schauspieler[] | undefined;
    readonly version: number | undefined;
    readonly bewertung: number | undefined;
    readonly preis: number;
    readonly erscheinungsdatum: Date | string | undefined;
    readonly erzeugt: Date | undefined;
    readonly aktualisiert: Date | undefined;
}
