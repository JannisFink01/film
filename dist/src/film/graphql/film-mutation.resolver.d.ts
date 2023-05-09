import { FilmDTO } from '../rest/filmDTO.js';
import { FilmWriteService } from '../service/film-write.service.js';
import { type IdInput } from './film-query.resolver.js';
export declare class FilmUpdateDTO extends FilmDTO {
    readonly id: string;
    readonly version: number;
}
export declare class FilmMutationResolver {
    #private;
    constructor(service: FilmWriteService);
    create(filmDTO: FilmDTO): Promise<number>;
    update(filmDTO: FilmUpdateDTO): Promise<number>;
    delete(id: IdInput): Promise<boolean>;
}
