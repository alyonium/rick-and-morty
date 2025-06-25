import type { CodegenConfig } from "@graphql-codegen/cli";
import { BASE_URL } from "./src/utils/const";

const config: CodegenConfig = {
  schema: BASE_URL,
  documents: "src/**/*.ts?(x)",
  overwrite: true,
  config: {
    namingConvention: {
      enumValues: "keep",
    },
    maybeValue: "T | undefined",
  },
  generates: {
    "./src/api/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
