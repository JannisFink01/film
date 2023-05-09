var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtStrategy_1;
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { getLogger } from '../../../logger/logger.js';
import { jwtConfig } from '../../../config/jwt.js';
const { algorithm, publicKey } = jwtConfig;
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends PassportStrategy(Strategy) {
    #logger = getLogger(JwtStrategy_1.name);
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: publicKey,
            algorithms: [algorithm],
            ignoreExpiration: false,
        });
    }
    validate(payload) {
        this.#logger.debug('validate: payload=%o', payload);
        const user = {
            userId: payload.sub,
            username: payload.username,
        };
        this.#logger.debug('validate: user=%o', user);
        return user;
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map