var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResponseTimeInterceptor_1;
import { Injectable, } from '@nestjs/common';
import { Temporal } from '@js-temporal/polyfill';
import { getLogger } from './logger.js';
import { tap } from 'rxjs/operators';
let ResponseTimeInterceptor = ResponseTimeInterceptor_1 = class ResponseTimeInterceptor {
    #logger = getLogger(ResponseTimeInterceptor_1.name);
    intercept(context, next) {
        const start = Temporal.Now.instant().epochMilliseconds;
        const responseTimeObserver = {
            subscribe: this.#empty,
            unsubscribe: this.#empty,
            finalize: () => {
                const response = context.switchToHttp().getResponse();
                const { statusCode, statusMessage } = response;
                const responseTime = Temporal.Now.instant().epochMilliseconds - start;
                if (statusMessage === undefined) {
                    this.#logger.debug('Response time: %d ms', responseTime);
                    return;
                }
                this.#logger.debug('Response time: %d ms, %d %s', responseTime, statusCode, statusMessage);
            },
            next: this.#empty,
            error: this.#empty,
            complete: this.#empty,
        };
        return next.handle().pipe(tap(responseTimeObserver));
    }
    #empty = () => {
    };
};
ResponseTimeInterceptor = ResponseTimeInterceptor_1 = __decorate([
    Injectable()
], ResponseTimeInterceptor);
export { ResponseTimeInterceptor };
//# sourceMappingURL=response-time.interceptor.js.map