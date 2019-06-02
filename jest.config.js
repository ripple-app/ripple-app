// jest.config.js
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    collectCoverage: true,
    coverageReporters: ['text', 'html', 'lcov'],
    coverageDirectory: 'coverage/unit'
};