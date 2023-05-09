import { configDir } from './node.js';
import { env } from './env.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const algorithm = 'RS256';
const jwtDir = resolve(configDir, 'jwt');
const utf8 = 'utf8';
const publicKey = readFileSync(resolve(jwtDir, 'public-key.pem'), utf8);
const privateKey = readFileSync(resolve(jwtDir, 'private-key.pem'), utf8);
const { JWT_EXPIRES_IN, JWT_ISSUER } = env;
const signOptions = {
    algorithm,
    expiresIn: JWT_EXPIRES_IN ?? '1h',
    issuer: JWT_ISSUER ?? 'https://hka.de/JuergenZimmermann',
};
const verifyOptions = {
    algorithms: [algorithm],
    issuer: signOptions.issuer,
};
export const jwtConfig = {
    algorithm,
    publicKey,
    privateKey,
    signOptions,
    verifyOptions,
};
//# sourceMappingURL=jwt.js.map