/**
 * Das Modul besteht aus der Entity-Klasse.
 * @packageDocumentation
 */

import { MaxLength } from 'class-validator';
const maxLength = 32;
/**
 * Entity-Klasse für Abbildung ohne TypeORM.
 */
export class SchauspielerDTO {
    @MaxLength(maxLength)
    readonly name!: string;
}
