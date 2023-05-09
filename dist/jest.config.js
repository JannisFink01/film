const jestConfig = {
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts', '.mts', '.json'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.m?js$': '$1',
    },
    transform: {
        '\\.test\\.m?ts$': [
            'ts-jest',
            {
                useESM: true,
                isolatedModules: false,
            },
        ],
    },
    testRegex: '__tests__\\.*\\\\.*test\\.m?ts$',
    collectCoverageFrom: ['<rootDir>/src/**/*.*ts'],
    testEnvironment: 'node',
    bail: true,
    coveragePathIgnorePatterns: [
        '<rootDir>/src/main\\.m?ts$',
        '.*\\.module\\.m?ts$',
        '<rootDir>/src/health/',
    ],
    coverageReporters: ['text-summary', 'html'],
    errorOnDeprecated: true,
    testTimeout: 60000,
    verbose: true,
};
export default jestConfig;
//# sourceMappingURL=jest.config.js.map