/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const esModules = [''].join('|');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.jest-cache',
  clearMocks: false,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  },
  testMatch: [
    '**/?(*.)+(test|spec).[jt]s',
    '**/(tests|mocks)/**/*.[jt]s',
    '**/__(tests|mocks)__/**/*.[jt]s'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
    // '^.+\\.ts$': [
    //   'ts-jest',
    //   {
    //     babelConfig: true,
    //     tsconfig: 'tsconfig.json'
    //   }
    // ]
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports',
        outputName: 'junit.xml'
      }
    ]
  ],
  automock: true,
  verbose: true
  // detectOpenHandles: true
  // setupFiles: ["dotenv/config"],
  // globalTeardown: "<rootDir>/src/tests/jest-globals-teardown.ts",
  // forceExit: true,
};
