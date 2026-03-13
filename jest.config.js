const { createDefaultPreset } = require("ts-jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const tsconfig = require("./tsconfig.json");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};