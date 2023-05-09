import { type ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
declare const JwtAuthGraphQlGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGraphQlGuard extends JwtAuthGraphQlGuard_base {
    #private;
    getRequest(context: ExecutionContext): Request;
    handleRequest(_err: unknown, user: any, _info: unknown, context: ExecutionContext): any;
}
export {};
