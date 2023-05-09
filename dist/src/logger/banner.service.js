var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BannerService_1;
import { Injectable } from '@nestjs/common';
import { release, type, userInfo } from 'node:os';
import { dbType } from '../config/dbtype.js';
import figlet from 'figlet';
import { getLogger } from './logger.js';
import { hash } from 'argon2';
import { k8sConfig } from '../config/kubernetes.js';
import { nodeConfig } from '../config/node.js';
import process from 'node:process';
let BannerService = BannerService_1 = class BannerService {
    #logger = getLogger(BannerService_1.name);
    async onApplicationBootstrap() {
        const { host, httpsOptions, nodeEnv, port, serviceHost, servicePort } = nodeConfig;
        const isK8s = k8sConfig.detected;
        const plattform = isK8s
            ? `Kubernetes: FILM_SERVICE_HOST=${serviceHost}, FILM_SERVICE_PORT=${servicePort}`
            : 'Kubernetes: N/A';
        figlet('film', (_, data) => console.info(data));
        this.#logger.info('Node: %s', process.version);
        this.#logger.info('NODE_ENV: %s', nodeEnv);
        this.#logger.info(plattform);
        const desPods = isK8s ? ' des Pods' : '';
        this.#logger.info('Rechnername%s: %s', desPods, host);
        this.#logger.info('Port%s: %s', desPods, port);
        this.#logger.info('%s', httpsOptions === undefined ? 'HTTP (ohne TLS)' : 'HTTPS');
        this.#logger.info('DB-System: %s', dbType);
        this.#logger.info('Betriebssystem: %s (%s)', type(), release());
        this.#logger.info('Username: %s', userInfo().username);
        this.#logger.info('GraphQL playground: %s', '/graphql');
        const hashValue = await hash('p');
        this.#logger.debug('argon2id: p -> %s', hashValue);
    }
};
BannerService = BannerService_1 = __decorate([
    Injectable()
], BannerService);
export { BannerService };
//# sourceMappingURL=banner.service.js.map