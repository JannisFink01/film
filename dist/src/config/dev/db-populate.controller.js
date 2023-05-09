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
import { Controller, HttpStatus, Post, Res, UseGuards, UseInterceptors, } from '@nestjs/common';
import { DbPopulateService } from './db-populate.service.js';
import { JwtAuthGuard } from '../../security/auth/jwt/jwt-auth.guard.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { RolesAllowed } from '../../security/auth/roles/roles-allowed.decorator.js';
import { RolesGuard } from '../../security/auth/roles/roles.guard.js';
let DbPopulateController = class DbPopulateController {
    #service;
    constructor(service) {
        this.#service = service;
    }
    async dbPopulate(res) {
        await this.#service.populateTestdaten();
        return res.sendStatus(HttpStatus.OK);
    }
};
__decorate([
    Post(),
    __param(0, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DbPopulateController.prototype, "dbPopulate", null);
DbPopulateController = __decorate([
    Controller('dbPopulate'),
    UseGuards(JwtAuthGuard, RolesGuard),
    RolesAllowed('admin'),
    UseInterceptors(ResponseTimeInterceptor),
    __metadata("design:paramtypes", [DbPopulateService])
], DbPopulateController);
export { DbPopulateController };
//# sourceMappingURL=db-populate.controller.js.map