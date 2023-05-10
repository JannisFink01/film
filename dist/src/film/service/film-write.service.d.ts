import { type CreateError, type UpdateError } from './errors.js';
import { Repository } from 'typeorm';
import { Film } from '../entity/film.js';
import { FilmReadService } from './film-read.service.js';
import { MailService } from '../../mail/mail.service.js';
export interface UpdateParams {
    id: number | undefined;
    film: Film;
    version: string;
}
export declare class FilmWriteService {
    #private;
    private static readonly VERSION_PATTERN;
    constructor(repo: Repository<Film>, readService: FilmReadService, mailService: MailService);
    create(film: Film): Promise<CreateError | number>;
    update({ id, film, version, }: UpdateParams): Promise<UpdateError | number>;
    delete(id: number): Promise<boolean>;
}
