import { Request, Response } from 'express';
import { AuthService } from './service/auth.service.js';
import { UserService } from './service/user.service.js';
export declare class Login {
    username: string | undefined;
    password: string | undefined;
}
export declare class AuthController {
    #private;
    constructor(authService: AuthService, userService: UserService);
    login(req: Request, res: Response, body: Login): Promise<Response<any, Record<string, any>>>;
    getRoles(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
