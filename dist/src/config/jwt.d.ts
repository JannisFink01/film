import { type SignOptions, type VerifyOptions } from 'jsonwebtoken';
export declare const jwtConfig: {
    readonly algorithm: "RS256";
    readonly publicKey: string;
    readonly privateKey: string;
    readonly signOptions: SignOptions;
    readonly verifyOptions: VerifyOptions;
};
