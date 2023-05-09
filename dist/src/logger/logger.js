import { parentLogger } from '../config/logger.js';
export const getLogger = (context, kind = 'class') => {
    const bindings = {};
    bindings[kind] = context;
    return parentLogger.child(bindings);
};
//# sourceMappingURL=logger.js.map