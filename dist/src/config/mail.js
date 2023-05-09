import { env } from './env.js';
import { loggerDefaultValue } from './logger.js';
const { SMTP_DEACTIVATED, SMTP_HOST, SMTP_PORT, SMTP_LOG } = env;
export const mailDeactivated = SMTP_DEACTIVATED?.toLowerCase() === 'true';
const host = SMTP_HOST ?? 'smtp';
const port = Number.parseInt(SMTP_PORT ?? '25', 10);
const logger = SMTP_LOG?.toLowerCase() === 'true';
export const mailConfig = {
    host,
    port,
    secure: false,
    priority: 'normal',
    logger,
};
Object.freeze(mailConfig);
if (!loggerDefaultValue) {
    console.debug('mailConfig: %o', mailConfig);
}
//# sourceMappingURL=mail.js.map