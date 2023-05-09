export class NoTokenError extends Error {
    constructor() {
        super('Es gibt keinen Token');
        this.name = 'NoTokenError';
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
export class UserInvalidError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserInvalidError';
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
//# sourceMappingURL=errors.js.map