import { type ExecutionContext } from '@nestjs/common';
import { type BasicUser } from './jwt.strategy.js';
import { type Request } from 'express';
export type RequestWithUser = Request & {
    user?: BasicUser;
};
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    #private;
    handleRequest(_err: unknown, user: any, _info: unknown, context: ExecutionContext): any;
}
export {};
