import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const RolesAllowed = (...roles) => SetMetadata(ROLES_KEY, roles);
//# sourceMappingURL=roles-allowed.decorator.js.map