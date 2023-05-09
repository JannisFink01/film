var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module.js';
import { DevModule } from './config/dev/dev.module.js';
import { FilmGetController } from './film/rest/film-get.controller.js';
import { FilmModule } from './film/film.module.js';
import { FilmWriteController } from './film/rest/film-write.controller.js';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthModule } from './health/health.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphQlModuleOptions } from './config/graphql.js';
import { typeOrmModuleOptions } from './config/db.js';
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(RequestLoggerMiddleware)
            .forRoutes(FilmGetController, FilmWriteController, 'auth', 'graphql');
    }
};
AppModule = __decorate([
    Module({
        imports: [
            AuthModule,
            FilmModule,
            DevModule,
            GraphQLModule.forRoot(graphQlModuleOptions),
            LoggerModule,
            HealthModule,
            TypeOrmModule.forRoot(typeOrmModuleOptions),
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map