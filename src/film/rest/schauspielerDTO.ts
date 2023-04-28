/**
 * Das Modul besteht aus der Entity-Klasse.
 * @packageDocumentation
 */

import { MaxLength } from 'class-validator';
const maxLength1 = 32;
const maxLength2 = 16;
/**
 * Entity-Klasse für Abbildung ohne TypeORM.
 */
export class SchauspielerDTO {
    @MaxLength(maxLength1)
    readonly name!: string;

    @MaxLength(maxLength2)
    readonly contentType!: string;
}
