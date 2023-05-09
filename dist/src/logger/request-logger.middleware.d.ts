import { type NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Request, type Response } from 'express';
export declare class RequestLoggerMiddleware implements NestMiddleware {
    #private;
    use(req: Request, _res: Response, next: NextFunction): void;
}
