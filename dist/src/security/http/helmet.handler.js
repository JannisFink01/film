import { contentSecurityPolicy, frameguard, hidePoweredBy, hsts, noSniff, xssFilter, } from 'helmet';
export const helmetHandlers = [
    contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["https: 'self'"],
            scriptSrc: ["https: 'unsafe-inline' 'unsafe-eval'"],
            imgSrc: ["data: 'self'"],
        },
        reportOnly: false,
    }),
    xssFilter(),
    frameguard(),
    hsts(),
    noSniff(),
    hidePoweredBy(),
];
//# sourceMappingURL=helmet.handler.js.map