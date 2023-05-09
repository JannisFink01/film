import { Request, Response } from 'express';
import { FilmDTO, FilmDtoOhneRef } from './filmDTO.js';
import { FilmWriteService } from '../service/film-write.service.js';
export declare class FilmWriteController {
    #private;
    constructor(service: FilmWriteService);
    create(filmDTO: FilmDTO, req: Request, res: Response): Promise<Response>;
    update(filmDTO: FilmDtoOhneRef, id: number, version: string | undefined, res: Response): Promise<Response>;
    delete(id: number, res: Response): Promise<Response<undefined>>;
}
