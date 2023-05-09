import { ApolloDriver } from '@nestjs/apollo';
import { existsSync } from 'node:fs';
const BASE_PATH = existsSync('src') ? 'src' : 'dist';
const SCHEMA_GRAPHQL = 'film/graphql/schema.graphql';
const LOGIN_GRAPHQL = 'security/auth/login.graphql';
export const graphQlModuleOptions = {
    typePaths: [
        `./${BASE_PATH}/${SCHEMA_GRAPHQL}`,
        `./${BASE_PATH}/${LOGIN_GRAPHQL}`,
    ],
    driver: ApolloDriver,
    playground: true,
};
//# sourceMappingURL=graphql.js.map