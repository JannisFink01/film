import { Strategy } from 'passport-jwt';
import { type User } from '../service/user.service.js';
export interface Payload {
    sub: number;
    username: string;
}
export type BasicUser = Pick<User, 'userId' | 'username'>;
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    #private;
    constructor();
    validate(payload: Payload): BasicUser;
}
export {};
