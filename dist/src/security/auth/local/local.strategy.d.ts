import { AuthService } from '../service/auth.service.js';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    #private;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
