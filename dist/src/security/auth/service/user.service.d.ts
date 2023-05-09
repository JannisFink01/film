import { type Role } from './role.js';
export interface User {
    userId: number;
    username: string;
    password: string;
    email: string;
    roles: Role[];
}
export declare class UserService {
    #private;
    constructor();
    findOne(username: string): Promise<User | undefined>;
    findById(id: number | undefined): Promise<User | undefined>;
}
