var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocalStrategy_1;
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service.js';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { getLogger } from '../../../logger/logger.js';
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends PassportStrategy(Strategy) {
    #authService;
    #logger = getLogger(LocalStrategy_1.name);
    constructor(authService) {
        super();
        this.#authService = authService;
    }
    async validate(username, password) {
        this.#logger.debug('validate: username=%s, password=*****', username);
        const user = await this.#authService.validate({
            username,
            pass: password,
        });
        if (user === undefined) {
            this.#logger.debug('validate: user=undefined');
            throw new UnauthorizedException();
        }
        this.#logger.debug('validate: user=%o', user);
        return user;
    }
};
LocalStrategy = LocalStrategy_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService])
], LocalStrategy);
export { LocalStrategy };
//# sourceMappingURL=local.strategy.js.map