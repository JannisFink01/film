import { GraphQLError } from 'graphql';
export class BadUserInputError extends GraphQLError {
    constructor(message) {
        super(message, {
            extensions: {
                code: 'BAD_USER_INPUT',
            },
        });
    }
}
//# sourceMappingURL=errors.js.map