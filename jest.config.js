// jest.config.js
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/', '/environment/'],
    collectCoverage: true,
    coverageReporters: ['text', 'html', 'lcov'],
    coverageDirectory: 'coverage/unit'
};