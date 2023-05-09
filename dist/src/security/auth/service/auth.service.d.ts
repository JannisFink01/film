import { UserService } from './user.service.js';
import { JwtService } from '@nestjs/jwt';
export interface ValidateParams {
    username: string | undefined;
    pass: string | undefined;
}
export interface LoginResult {
    token: string;
    expiresIn: number | string | undefined;
    roles?: readonly string[];
}
export declare class AuthService {
    #private;
    constructor(userService: UserService, jwtService: JwtService);
    validate({ username, pass }: ValidateParams): Promise<{
        userId: number;
        username: string;
        email: string;
        roles: import("./role.js").Role[];
    } | undefined>;
    login(user: unknown): Promise<LoginResult>;
}
