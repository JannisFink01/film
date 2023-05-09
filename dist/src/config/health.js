import { env } from './env.js';
import { loggerDefaultValue } from './logger.js';
const { HEALTH_PRETTY_PRINT } = env;
export const healthConfig = {
    prettyPrint: HEALTH_PRETTY_PRINT !== undefined &&
        HEALTH_PRETTY_PRINT.toLowerCase() === 'true',
};
if (!loggerDefaultValue) {
    console.debug('healthConfig: %o', healthConfig);
}
//# sourceMappingURL=health.js.map