var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AuthModule } from '../security/auth/auth.module.js';
import { FilmGetController } from './rest/film-get.controller.js';
import { FilmMutationResolver } from './graphql/film-mutation.resolver.js';
import { FilmQueryResolver } from './graphql/film-query.resolver.js';
import { FilmReadService } from './service/film-read.service.js';
import { FilmWriteController } from './rest/film-write.controller.js';
import { FilmWriteService } from './service/film-write.service.js';
import { MailModule } from '../mail/mail.module.js';
import { Module } from '@nestjs/common';
import { QueryBuilder } from './service/query-builder.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entity/entities.js';
let FilmModule = class FilmModule {
};
FilmModule = __decorate([
    Module({
        imports: [MailModule, TypeOrmModule.forFeature(entities), AuthModule],
        controllers: [FilmGetController, FilmWriteController],
        providers: [
            FilmReadService,
            FilmWriteService,
            FilmQueryResolver,
            FilmMutationResolver,
            QueryBuilder,
        ],
        exports: [FilmReadService, FilmWriteService],
    })
], FilmModule);
export { FilmModule };
//# sourceMappingURL=film.module.js.map