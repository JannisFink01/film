var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator, } from '@nestjs/terminus';
import { Agent } from 'node:https';
import { ApiTags } from '@nestjs/swagger';
import { k8sConfig } from '../config/kubernetes.js';
import { nodeConfig } from '../config/node.js';
let HealthController = class HealthController {
    #health;
    #http;
    #typeorm;
    #schema = k8sConfig.detected && !k8sConfig.tls ? 'http' : 'https';
    #httpsAgent = new Agent({
        requestCert: true,
        rejectUnauthorized: false,
        ca: nodeConfig.httpsOptions?.cert,
    });
    constructor(health, http, typeorm) {
        this.#health = health;
        this.#http = http;
        this.#typeorm = typeorm;
    }
    live() {
        return this.#health.check([
            () => this.#http.pingCheck('film REST-API', `${this.#schema}://${nodeConfig.host}:${nodeConfig.port}/00000000-0000-0000-0000-000000000001`, { httpsAgent: this.#httpsAgent }),
        ]);
    }
    ready() {
        return this.#health.check([() => this.#typeorm.pingCheck('DB')]);
    }
};
__decorate([
    Get('live'),
    HealthCheck(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "live", null);
__decorate([
    Get('ready'),
    HealthCheck(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "ready", null);
HealthController = __decorate([
    Controller('health'),
    ApiTags('Health'),
    __metadata("design:paramtypes", [HealthCheckService,
        HttpHealthIndicator,
        TypeOrmHealthIndicator])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map