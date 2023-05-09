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
var AuthController_1;
import { ApiBearerAuth, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors, } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard.js';
import { AuthService } from './service/auth.service.js';
import { LocalAuthGuard } from './local/local-auth.guard.js';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { UserService } from './service/user.service.js';
import { getLogger } from '../../logger/logger.js';
import { paths } from '../../config/paths.js';
export class Login {
    username;
    password;
}
__decorate([
    ApiProperty({ example: 'admin', type: String }),
    __metadata("design:type", Object)
], Login.prototype, "username", void 0);
__decorate([
    ApiProperty({ example: 'p', type: String }),
    __metadata("design:type", Object)
], Login.prototype, "password", void 0);
let AuthController = AuthController_1 = class AuthController {
    #authService;
    #userService;
    #logger = getLogger(AuthController_1.name);
    constructor(authService, userService) {
        this.#authService = authService;
        this.#userService = userService;
    }
    async login(req, res, body) {
        this.#logger.debug('login: username=%o', body.username);
        const result = await this.#authService.login(req.user);
        this.#logger.debug('login: 200');
        return res.json(result).send();
    }
    async getRoles(req, res) {
        const reqUser = req.user;
        this.#logger.debug('getRoles: reqUser=%o', reqUser);
        if (reqUser === undefined) {
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }
        const user = await this.#userService.findById(reqUser.userId);
        this.#logger.debug('getRoles: user=%o', user);
        if (user?.roles === undefined) {
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }
        const { roles } = user;
        this.#logger.debug('getRoles: roles=%o', roles);
        if (roles.length === 0) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }
        return res.json(roles).send();
    }
};
__decorate([
    Post(paths.login),
    UseGuards(LocalAuthGuard),
    HttpCode(HttpStatus.OK),
    ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
    ApiOperation({ summary: 'Login mit Benutzername und Passwort' }),
    ApiOkResponse({ description: 'Erfolgreich eingeloggt.' }),
    ApiUnauthorizedResponse({
        description: 'Benutzername oder Passwort sind falsch.',
    }),
    __param(0, Req()),
    __param(1, Res()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Login]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Get(paths.roles),
    UseGuards(JwtAuthGuard),
    ApiOperation({ summary: 'Rollen zum User des Tokens ermitteln' }),
    ApiOkResponse({ description: 'Die Rollen zum User.' }),
    ApiNotFoundResponse({ description: 'Keine Rollen zum User.' }),
    ApiBearerAuth(),
    __param(0, Req()),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
AuthController = AuthController_1 = __decorate([
    Controller(paths.auth),
    UseInterceptors(ResponseTimeInterceptor),
    ApiTags('auth'),
    __metadata("design:paramtypes", [AuthService, UserService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map