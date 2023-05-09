import { type HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface.js';
export declare const configDir: string;
export declare const nodeConfig: {
    readonly host: string;
    readonly port: number;
    readonly configDir: string;
    readonly httpsOptions: HttpsOptions | undefined;
    readonly nodeEnv: "development" | "PRODUCTION" | "production" | "test" | undefined;
    readonly serviceHost: string | undefined;
    readonly servicePort: string | undefined;
};
