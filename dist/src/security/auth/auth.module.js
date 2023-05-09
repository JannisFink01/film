var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AuthController } from './auth.controller.js';
import { AuthService } from './service/auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy.js';
import { LocalStrategy } from './local/local.strategy.js';
import { LoginResolver } from './login.resolver.js';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './service/user.service.js';
import { jwtConfig } from '../../config/jwt.js';
const { privateKey, signOptions, verifyOptions } = jwtConfig;
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({ privateKey, signOptions, verifyOptions }),
        ],
        controllers: [AuthController],
        providers: [
            AuthService,
            UserService,
            LocalStrategy,
            JwtStrategy,
            LoginResolver,
        ],
        exports: [AuthService, UserService],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map