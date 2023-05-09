import { env } from './env.js';
import { nodeConfig } from './node.js';
import pino from 'pino';
import { resolve } from 'node:path';
const logDirDefault = 'log';
const logFileNameDefault = 'server.log';
const logFileDefault = resolve(logDirDefault, logFileNameDefault);
const { LOG_LEVEL, LOG_DIR, LOG_PRETTY, LOG_DEFAULT } = env;
const { nodeEnv } = nodeConfig;
export const loggerDefaultValue = LOG_DEFAULT?.toLowerCase() === 'true';
const logDir = LOG_DIR === undefined ? LOG_DIR : LOG_DIR.trimEnd();
const logFile = logDir === undefined ? logFileDefault : resolve(logDir, logFileNameDefault);
const pretty = LOG_PRETTY?.toLowerCase() === 'true';
let logLevel = 'info';
if (LOG_LEVEL === 'debug' &&
    nodeEnv !== 'production' &&
    nodeEnv !== 'PRODUCTION' &&
    !loggerDefaultValue) {
    logLevel = 'debug';
}
if (!loggerDefaultValue) {
    console.debug(`logger config: logLevel=${logLevel}, logFile=${logFile}, pretty=${pretty}, loggerDefaultValue=${loggerDefaultValue}`);
}
const fileOptions = {
    level: logLevel,
    target: 'pino/file',
    options: { destination: logFile },
};
const prettyOptions = {
    translateTime: 'SYS:standard',
    singleLine: true,
    colorize: true,
    ignore: 'pid,hostname',
};
const prettyTransportOptions = {
    level: logLevel,
    target: 'pino-pretty',
    options: prettyOptions,
};
const options = pretty
    ? {
        targets: [fileOptions, prettyTransportOptions],
    }
    : {
        targets: [fileOptions],
    };
const transports = pino.transport(options);
export const parentLogger = loggerDefaultValue
    ? pino(pino.destination(logFileDefault))
    : pino({ level: logLevel }, transports);
//# sourceMappingURL=logger.js.map