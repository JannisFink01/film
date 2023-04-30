/* eslint-disable max-lines */
/**
 * Das Modul besteht aus der Controller-Klasse für Schreiben an der REST-Schnittstelle.
 * @packageDocumentation
 */

import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiHeader,
    ApiNoContentResponse,
    ApiOperation,
    ApiPreconditionFailedResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Headers,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { type CreateError, type UpdateError } from '../service/errors.js';
import { Request, Response } from 'express';
import { type Schauspieler } from '../entity/schauspieler.js';
import { FilmDTO, FilmDtoOhneRef } from './filmDTO.js';
import { type Film } from '../entity/film.js';
import { FilmWriteService } from '../service/film-write.service.js';
//import { JwtAuthGuard } from '../../security/auth/jwt/jwt-auth.guard.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
//import { RolesAllowed } from '../../security/auth/roles/roles-allowed.decorator.js';
//import { RolesGuard } from '../../security/auth/roles/roles.guard.js';
import { type Titel } from '../entity/titel.js';
import { getBaseUri } from './getBaseUri.js';
import { getLogger } from '../../logger/logger.js';
import { paths } from '../../config/paths.js';

/**
 * Die Controller-Klasse für die Verwaltung von Filme.
 */
@Controller(paths.rest)
//@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseTimeInterceptor)
@ApiTags('Film API')
@ApiBearerAuth()
export class FilmWriteController {
    readonly #service: FilmWriteService;

    readonly #logger = getLogger(FilmWriteController.name);

    constructor(service: FilmWriteService) {
        this.#service = service;
    }

    /**
     * Ein neues Film wird asynchron angelegt. Das neu anzulegende Film ist als
     * JSON-Datensatz im Request-Objekt enthalten. Wenn es keine
     * Verletzungen von Constraints gibt, wird der Statuscode `201` (`Created`)
     * gesetzt und im Response-Header wird `Location` auf die URI so gesetzt,
     * dass damit das neu angelegte Film abgerufen werden kann.
     *
     * Falls Constraints verletzt sind, wird der Statuscode `400` (`Bad Request`)
     * gesetzt und genauso auch wenn der Titel oder die ISBN-Nummer bereits
     * existieren.
     *
     * @param film JSON-Daten für ein Film im Request-Body.
     * @param res Leeres Response-Objekt von Express.
     * @returns Leeres Promise-Objekt.
     */
    @Post()
    //@RolesAllowed('admin', 'mitarbeiter')
    @ApiOperation({ summary: 'Ein neues Film anlegen' })
    @ApiCreatedResponse({ description: 'Erfolgreich neu angelegt' })
    @ApiBadRequestResponse({ description: 'Fehlerhafte Filmdaten' })
    async create(
        @Body() filmDTO: FilmDTO,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        this.#logger.debug('create: filmDTO=%o', filmDTO);

        const film = this.#filmDtoToFilm(filmDTO);
        const result = await this.#service.create(film);
        if (Object.prototype.hasOwnProperty.call(result, 'type')) {
            return this.#handleCreateError(result as CreateError, res);
        }

        const location = `${getBaseUri(req)}/${result as number}`;
        this.#logger.debug('create: location=%s', location);
        return res.location(location).send();
    }

    /**
     * Ein vorhandenes Film wird asynchron aktualisiert.
     *
     * Im Request-Objekt von Express muss die ID des zu aktualisierenden Filmes
     * als Pfad-Parameter enthalten sein. Außerdem muss im Rumpf das zu
     * aktualisierende Film als JSON-Datensatz enthalten sein. Damit die
     * Aktualisierung überhaupt durchgeführt werden kann, muss im Header
     * `If-Match` auf die korrekte Version für optimistische Synchronisation
     * gesetzt sein.
     *
     * Bei erfolgreicher Aktualisierung wird der Statuscode `204` (`No Content`)
     * gesetzt und im Header auch `ETag` mit der neuen Version mitgeliefert.
     *
     * Falls die Versionsnummer fehlt, wird der Statuscode `428` (`Precondition
     * required`) gesetzt; und falls sie nicht korrekt ist, der Statuscode `412`
     * (`Precondition failed`). Falls Constraints verletzt sind, wird der
     * Statuscode `400` (`Bad Request`) gesetzt und genauso auch wenn der neue
     * Titel oder die neue ISBN-Nummer bereits existieren.
     *
     * @param film Filmdaten im Body des Request-Objekts.
     * @param id Pfad-Paramater für die ID.
     * @param version Versionsnummer aus dem Header _If-Match_.
     * @param res Leeres Response-Objekt von Express.
     * @returns Leeres Promise-Objekt.
     */
    // eslint-disable-next-line max-params
    @Put(':id')
    //@RolesAllowed('admin', 'mitarbeiter')
    @ApiOperation({
        summary: 'Ein vorhandenes Film aktualisieren',
        tags: ['Aktualisieren'],
    })
    @ApiHeader({
        name: 'If-Match',
        description: 'Header für optimistische Synchronisation',
        required: false,
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Header für JWT',
        required: true,
    })
    @ApiNoContentResponse({ description: 'Erfolgreich aktualisiert' })
    @ApiBadRequestResponse({ description: 'Fehlerhafte Filmdaten' })
    @ApiPreconditionFailedResponse({
        description: 'Falsche Version im Header "If-Match"',
    })
    @ApiResponse({
        status: HttpStatus.PRECONDITION_REQUIRED,
        description: 'Header "If-Match" fehlt',
    })
    async update(
        @Body() filmDTO: FilmDtoOhneRef,
        @Param('id') id: number,
        @Headers('If-Match') version: string | undefined,
        @Res() res: Response,
    ): Promise<Response> {
        this.#logger.debug(
            'update: id=%s, filmDTO=%o, version=%s',
            id,
            filmDTO,
            version,
        );

        if (version === undefined) {
            const msg = 'Header "If-Match" fehlt';
            this.#logger.debug('#handleUpdateError: msg=%s', msg);
            return res
                .status(HttpStatus.PRECONDITION_REQUIRED)
                .set('Content-Type', 'text/plain')
                .send(msg);
        }

        const film = this.#filmDtoOhneRefToFilm(filmDTO);
        const result = await this.#service.update({ id, film, version });
        if (typeof result === 'object') {
            return this.#handleUpdateError(result, res);
        }

        this.#logger.debug('update: version=%d', result);
        return res.set('ETag', `"${result}"`).sendStatus(HttpStatus.NO_CONTENT);
    }

    /**
     * Ein Film wird anhand seiner ID-gelöscht, die als Pfad-Parameter angegeben
     * ist. Der zurückgelieferte Statuscode ist `204` (`No Content`).
     *
     * @param id Pfad-Paramater für die ID.
     * @param res Leeres Response-Objekt von Express.
     * @returns Leeres Promise-Objekt.
     */
    @Delete(':id')
    //@RolesAllowed('admin')
    @ApiOperation({ summary: 'Film mit der ID löschen', tags: ['Loeschen'] })
    @ApiHeader({
        name: 'Authorization',
        description: 'Header für JWT',
        required: true,
    })
    @ApiNoContentResponse({
        description: 'Der Film wurde gelöscht oder war nicht vorhanden',
    })
    async delete(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<Response<undefined>> {
        this.#logger.debug('delete: id=%s', id);

        try {
            await this.#service.delete(id);
        } catch (err) {
            this.#logger.error('delete: error=%o', err);
            return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    #filmDtoToFilm(filmDTO: FilmDTO): Film {
        const titelDTO = filmDTO.titel;
        const titel: Titel = {
            id: undefined,
            titel: titelDTO.titel,
            film: undefined,
        };
        const schauspielern = filmDTO.schauspieler?.map((schauspielerDTO) => {
            const schauspieler: Schauspieler = {
                id: undefined,
                name: schauspielerDTO.name,
                film: undefined,
            };
            return schauspieler;
        });
        const film = {
            id: undefined,
            version: undefined,
            regisseur: filmDTO.regisseur,
            bewertung: filmDTO.bewertung,
            preis: filmDTO.preis,
            erscheinungsdatum: filmDTO.erscheinungsdatum,
            titel,
            schauspieler: schauspielern,
            erzeugt: undefined,
            aktualisiert: undefined,
        };

        // Rueckwaertsverweise
        film.titel.film = film;
        film.schauspieler?.forEach((schauspieler) => {
            schauspieler.film = film;
        });
        return film;
    }

    #handleCreateError(err: CreateError, res: Response) {
        switch (err.type) {
            case 'RegisseurExists': {
                return this.#handleIsbnExists(err.regisseur, res);
            }

            default: {
                return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    #handleIsbnExists(
        isbn: string | null | undefined,
        res: Response,
    ): Response {
        const msg = `Die ISBN-Nummer "${isbn}" existiert bereits.`;
        this.#logger.debug('#handleIsbnExists(): msg=%s', msg);
        return res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .set('Content-Type', 'text/plain')
            .send(msg);
    }

    #filmDtoOhneRefToFilm(filmDTO: FilmDtoOhneRef): Film {
        return {
            id: undefined,
            version: undefined,
            regisseur: filmDTO.regisseur,
            bewertung: filmDTO.bewertung,
            preis: filmDTO.preis,
            erscheinungsdatum: filmDTO.erscheinungsdatum,
            titel: undefined,
            schauspieler: undefined,
            erzeugt: undefined,
            aktualisiert: undefined,
        };
    }

    #handleUpdateError(err: UpdateError, res: Response): Response {
        switch (err.type) {
            case 'FilmNotExists': {
                const { id } = err;
                const msg = `Es gibt kein Film mit der ID "${id}".`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }

            case 'VersionInvalid': {
                const { version } = err;
                const msg = `Die Versionsnummer "${version}" ist ungueltig.`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }

            case 'VersionOutdated': {
                const { version } = err;
                const msg = `Die Versionsnummer "${version}" ist nicht aktuell.`;
                this.#logger.debug('#handleUpdateError: msg=%s', msg);
                return res
                    .status(HttpStatus.PRECONDITION_FAILED)
                    .set('Content-Type', 'text/plain')
                    .send(msg);
            }

            default: {
                return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
/* eslint-enable max-lines */
