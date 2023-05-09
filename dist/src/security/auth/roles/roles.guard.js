var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RolesGuard_1;
import { Injectable, } from '@nestjs/common';
import { ROLES_KEY } from './roles-allowed.decorator.js';
import { Reflector } from '@nestjs/core';
import { UserService } from '../service/user.service.js';
import { getLogger } from '../../../logger/logger.js';
let RolesGuard = RolesGuard_1 = class RolesGuard {
    #reflector;
    #userService;
    #logger = getLogger(RolesGuard_1.name);
    constructor(reflector, userService) {
        this.#reflector = reflector;
        this.#userService = userService;
    }
    async canActivate(context) {
        const requiredRoles = this.#reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.#logger.debug('canActivate: requiredRoles=%o', requiredRoles);
        if (requiredRoles === undefined || requiredRoles.length === 0) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const requestUser = request.user;
        this.#logger.debug('canActivate: requestUser=%o', requestUser);
        if (requestUser === undefined) {
            return false;
        }
        const { userId } = requestUser;
        const user = await this.#userService.findById(userId);
        this.#logger.debug('canActivate: user=%o', user);
        if (user === undefined) {
            return false;
        }
        return requiredRoles.some((role) => user.roles.includes(role));
    }
};
RolesGuard = RolesGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector, UserService])
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=roles.guard.js.map