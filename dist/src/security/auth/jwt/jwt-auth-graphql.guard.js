var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGraphQlGuard_1;
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getLogger } from '../../../logger/logger.js';
let JwtAuthGraphQlGuard = JwtAuthGraphQlGuard_1 = class JwtAuthGraphQlGuard extends AuthGuard('jwt') {
    #logger = getLogger(JwtAuthGraphQlGuard_1.name);
    getRequest(context) {
        this.#logger.debug('getRequest');
        return GqlExecutionContext.create(context).getContext().req;
    }
    handleRequest(_err, user, _info, context) {
        this.#logger.debug('handleRequest: user=%o', user);
        const request = this.getRequest(context);
        request.user = user;
        return user;
    }
};
JwtAuthGraphQlGuard = JwtAuthGraphQlGuard_1 = __decorate([
    Injectable()
], JwtAuthGraphQlGuard);
export { JwtAuthGraphQlGuard };
//# sourceMappingURL=jwt-auth-graphql.guard.js.map