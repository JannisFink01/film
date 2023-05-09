var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilmWriteService_1;
import { Repository } from 'typeorm';
import { Film } from '../entity/film.js';
import { FilmReadService } from './film-read.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MailService } from '../../mail/mail.service.js';
import RE2 from 're2';
import { Schauspieler } from '../entity/schauspieler.js';
import { Titel } from '../entity/titel.js';
import { getLogger } from '../../logger/logger.js';
let FilmWriteService = FilmWriteService_1 = class FilmWriteService {
    static VERSION_PATTERN = new RE2('^"\\d*"');
    #repo;
    #readService;
    #mailService;
    #logger = getLogger(FilmWriteService_1.name);
    constructor(repo, readService, mailService) {
        this.#repo = repo;
        this.#readService = readService;
        this.#mailService = mailService;
    }
    async create(film) {
        this.#logger.debug('create: film=%o', film);
        const filmDb = await this.#repo.save(film);
        this.#logger.debug('create: filmDb=%o', filmDb);
        await this.#sendmail(filmDb);
        return filmDb.id;
    }
    async update({ id, film, version, }) {
        this.#logger.debug('update: id=%d, film=%o, version=%s', id, film, version);
        if (id === undefined) {
            this.#logger.debug('update: Keine gueltige ID');
            return { type: 'FilmNotExists', id };
        }
        const validateResult = await this.#validateUpdate(film, id, version);
        this.#logger.debug('update: validateResult=%o', validateResult);
        if (!(validateResult instanceof Film)) {
            return validateResult;
        }
        const filmNeu = validateResult;
        const merged = this.#repo.merge(filmNeu, film);
        this.#logger.debug('update: merged=%o', merged);
        const updated = await this.#repo.save(merged);
        this.#logger.debug('update: updated=%o', updated);
        return updated.version;
    }
    async delete(id) {
        this.#logger.debug('delete: id=%d', id);
        const film = await this.#readService.findById({
            id,
            mitSchauspieler: true,
        });
        if (film === undefined) {
            return false;
        }
        let deleteResult;
        await this.#repo.manager.transaction(async (transactionalMgr) => {
            const titelId = film.titel?.id;
            if (titelId !== undefined) {
                await transactionalMgr.delete(Titel, titelId);
            }
            const schauspieler = film.schauspieler ?? [];
            for (const schausp of schauspieler) {
                await transactionalMgr.delete(Schauspieler, schausp.id);
            }
            deleteResult = await transactionalMgr.delete(Film, id);
            this.#logger.debug('delete: deleteResult=%o', deleteResult);
        });
        return (deleteResult?.affected !== undefined &&
            deleteResult.affected !== null &&
            deleteResult.affected > 0);
    }
    async #sendmail(film) {
        const subject = `Neuer Film ${film.id}`;
        const titel = film.titel?.titel ?? 'N/A';
        const body = `Der Film mit dem Titel <strong>${titel}</strong> ist angelegt`;
        await this.#mailService.sendmail({ subject, body });
    }
    async #validateUpdate(film, id, versionStr) {
        const result = this.#validateVersion(versionStr);
        if (typeof result !== 'number') {
            return result;
        }
        const version = result;
        this.#logger.debug('#validateUpdate: film=%o, version=%s', film, version);
        const resultFindById = await this.#findByIdAndCheckVersion(id, version);
        this.#logger.debug('#validateUpdate: %o', resultFindById);
        return resultFindById;
    }
    #validateVersion(version) {
        if (version === undefined ||
            !FilmWriteService_1.VERSION_PATTERN.test(version)) {
            const error = { type: 'VersionInvalid', version };
            this.#logger.debug('#validateVersion: VersionInvalid=%o', error);
            return error;
        }
        return Number.parseInt(version.slice(1, -1), 10);
    }
    async #findByIdAndCheckVersion(id, version) {
        const filmDb = await this.#readService.findById({ id });
        if (filmDb === undefined) {
            const result = { type: 'FilmNotExists', id };
            this.#logger.debug('#checkIdAndVersion: FilmNotExists=%o', result);
            return result;
        }
        const versionDb = filmDb.version;
        if (version < versionDb) {
            const result = {
                type: 'VersionOutdated',
                id,
                version,
            };
            this.#logger.debug('#checkIdAndVersion: VersionOutdated=%o', result);
            return result;
        }
        return filmDb;
    }
};
FilmWriteService = FilmWriteService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(Film)),
    __metadata("design:paramtypes", [Repository,
        FilmReadService,
        MailService])
], FilmWriteService);
export { FilmWriteService };
//# sourceMappingURL=film-write.service.js.map