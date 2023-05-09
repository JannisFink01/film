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
var LoginResolver_1;
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './service/auth.service.js';
import { BadUserInputError } from '../../film/graphql/errors.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { UseInterceptors } from '@nestjs/common';
import { getLogger } from '../../logger/logger.js';
let LoginResolver = LoginResolver_1 = class LoginResolver {
    #service;
    #logger = getLogger(LoginResolver_1.name);
    constructor(service) {
        this.#service = service;
    }
    async login(input) {
        this.#logger.debug('login: input=%o', input);
        const { username, password } = input;
        const user = await this.#service.validate({ username, pass: password });
        if (user === undefined) {
            throw new BadUserInputError('Falscher Benutzername oder falsches Passwort');
        }
        const result = await this.#service.login(user);
        this.#logger.debug('login: result=%o', result);
        return result;
    }
};
__decorate([
    Mutation(),
    __param(0, Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = LoginResolver_1 = __decorate([
    Resolver('login'),
    UseInterceptors(ResponseTimeInterceptor),
    __metadata("design:paramtypes", [AuthService])
], LoginResolver);
export { LoginResolver };
//# sourceMappingURL=login.resolver.js.map