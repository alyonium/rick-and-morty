import type { CodegenConfig } from "@graphql-codegen/cli";
import { BASE_URL } from "./src/utils/const";

const config: CodegenConfig = {
  schema: BASE_URL,
  documents: [
    "src/**/*.ts?(x)",
    "!src/api/mutations/card/updateCharacterPage.ts",
  ],
  overwrite: true,
  config: {
    avoidOptionals: true,
    namingConvention: {
      enumValues: "keep",
    },
    maybeValue: "T",
  },
  generates: {
    "./src/api/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
