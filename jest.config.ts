// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from "ts-jest/dist/config/paths-to-module-name-mapper";

import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
