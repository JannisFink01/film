import { Film } from '../film/entity/film.js';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { dbType } from './dbtype.js';
import { entities } from '../film/entity/entities.js';
import { env } from './env.js';
import { k8sConfig } from './kubernetes.js';
import { loggerDefaultValue } from './logger.js';
import { nodeConfig } from './node.js';
const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PASSWORD_ADMIN, DB_POPULATE, } = env;
const database = DB_NAME ?? Film.name.toLowerCase();
const { detected } = k8sConfig;
const host = detected ? dbType : DB_HOST ?? 'localhost';
const username = DB_USERNAME ?? Film.name.toLowerCase();
const pass = DB_PASSWORD ?? 'p';
const passAdmin = DB_PASSWORD_ADMIN ?? 'p';
const namingStrategy = new SnakeNamingStrategy();
const logging = (nodeConfig.nodeEnv === 'development' || nodeConfig.nodeEnv === 'test') &&
    !loggerDefaultValue;
const logger = 'advanced-console';
export let typeOrmModuleOptions;
switch (dbType) {
    case 'postgres': {
        typeOrmModuleOptions = {
            type: 'postgres',
            host,
            port: 5432,
            username,
            password: pass,
            database,
            entities,
            namingStrategy,
            logging,
            logger,
        };
        const { password, ...typeOrmModuleOptionsLog } = typeOrmModuleOptions;
        if (!loggerDefaultValue) {
            console.debug('typeOrmModuleOptions: %o', typeOrmModuleOptionsLog);
        }
        break;
    }
    case 'mysql': {
        typeOrmModuleOptions = {
            type: 'mysql',
            host,
            port: 3306,
            username,
            password: pass,
            database,
            entities,
            namingStrategy,
            supportBigNumbers: true,
            logging,
            logger,
        };
        const { password, ...typeOrmModuleOptionsLog } = typeOrmModuleOptions;
        if (!loggerDefaultValue) {
            console.debug('typeOrmModuleOptions: %o', typeOrmModuleOptionsLog);
        }
        break;
    }
    case 'sqlite': {
        typeOrmModuleOptions = {
            type: 'sqlite',
            database: `${database}.sqlite`,
            entities,
            namingStrategy,
            logging,
            logger,
        };
        if (!loggerDefaultValue) {
            console.debug('typeOrmModuleOptions: %o', typeOrmModuleOptions);
        }
        break;
    }
    default: {
        typeOrmModuleOptions = {
            type: 'postgres',
            host,
            port: 5432,
            username,
            password: pass,
            database,
            entities,
            logging,
            logger,
        };
        break;
    }
}
Object.freeze(typeOrmModuleOptions);
export const dbPopulate = DB_POPULATE?.toLowerCase() === 'true';
export const adminDataSourceOptions = dbType === 'mysql'
    ? {
        type: 'mysql',
        host,
        port: 3306,
        username: 'root',
        password: passAdmin,
        database,
        namingStrategy,
        supportBigNumbers: true,
        logging,
        logger,
    }
    : {
        type: 'postgres',
        host,
        port: 5432,
        username: 'postgres',
        password: passAdmin,
        database,
        schema: database,
        namingStrategy,
        logging,
        logger,
    };
//# sourceMappingURL=db.js.map