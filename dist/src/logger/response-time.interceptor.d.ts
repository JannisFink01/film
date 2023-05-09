import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type Observable } from 'rxjs';
export declare class ResponseTimeInterceptor implements NestInterceptor {
    #private;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
