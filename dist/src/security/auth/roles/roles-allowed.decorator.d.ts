import { type Role } from '../service/role.js';
export declare const ROLES_KEY = "roles";
export declare const RolesAllowed: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
