var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
import { UserService } from './user.service.js';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getLogger } from '../../../logger/logger.js';
import { jwtConfig } from '../../../config/jwt.js';
import { v4 as uuidv4 } from 'uuid';
import { verify } from 'argon2';
let AuthService = AuthService_1 = class AuthService {
    #userService;
    #jwtService;
    #logger = getLogger(AuthService_1.name);
    constructor(userService, jwtService) {
        this.#userService = userService;
        this.#jwtService = jwtService;
    }
    async validate({ username, pass }) {
        this.#logger.debug('validate: username=%s', username);
        if (username === undefined || pass === undefined) {
            this.#logger.debug('validate: username oder password fehlen.');
            return;
        }
        const user = await this.#userService.findOne(username);
        this.#logger.debug('validate: user.id=%d', user?.userId);
        if (user === undefined) {
            this.#logger.debug('validate: Kein User zu %s gefunden.', username);
            return;
        }
        const userPassword = user.password;
        this.#logger.debug('validate: userPassword=*****, password=*****');
        const isPasswordOK = await this.#checkPassword(userPassword, pass);
        if (!isPasswordOK) {
            this.#logger.debug('validate: Falsches password.');
            return;
        }
        const { password, ...result } = user;
        this.#logger.debug('validate: result=%o', result);
        return result;
    }
    async login(user) {
        const userObj = user;
        const payload = {
            username: userObj.username,
            sub: userObj.userId,
            type: 'access',
            jti: uuidv4(),
        };
        const { signOptions } = jwtConfig;
        const token = this.#jwtService.sign(payload, signOptions);
        const result = {
            token,
            expiresIn: signOptions.expiresIn,
            roles: userObj.roles,
        };
        this.#logger.debug('login: result=%o', result);
        return result;
    }
    async #checkPassword(userPassword, password) {
        if (userPassword === undefined) {
            this.#logger.debug('#checkPassword: Kein Passwort');
            return false;
        }
        const result = await verify(userPassword, password);
        this.#logger.debug('#checkPassword: %s', result);
        return result;
    }
};
AuthService = AuthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserService, JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map