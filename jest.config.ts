export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,

  collectCoverage: false,
  // collectCoverageFrom: undefined,
  coverageDirectory: '__tests__/coverage',
  coverageProvider: 'v8',

  testMatch: ['<rootDir>/__tests__/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'],
  preset: 'ts-jest'
}
