var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getLogger } from '../../../logger/logger.js';
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends AuthGuard('jwt') {
    #logger = getLogger(JwtAuthGuard_1.name);
    handleRequest(_err, user, _info, context) {
        this.#logger.debug('handleRequest: user=%o', user);
        const request = context.switchToHttp().getRequest();
        request.user = user;
        return user;
    }
};
JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    Injectable()
], JwtAuthGuard);
export { JwtAuthGuard };
//# sourceMappingURL=jwt-auth.guard.js.map