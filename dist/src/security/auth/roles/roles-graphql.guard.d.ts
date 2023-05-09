import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../service/user.service.js';
export declare class RolesGraphQlGuard implements CanActivate {
    #private;
    constructor(reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
