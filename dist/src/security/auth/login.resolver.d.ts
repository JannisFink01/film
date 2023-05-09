import { AuthService } from './service/auth.service.js';
export interface LoginInput {
    readonly username: string;
    readonly password: string;
}
export declare class LoginResolver {
    #private;
    constructor(service: AuthService);
    login(input: LoginInput): Promise<import("./service/auth.service.js").LoginResult>;
}
