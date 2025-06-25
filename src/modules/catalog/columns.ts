import type { Character } from "../../api/__generated__/graphql.ts";

type CellType = "string" | "array" | "object";

type ColumnType = {
  fieldName: string;
  fieldKey: keyof Character;
  type: CellType;
  overflow?: boolean;
};

export const COLUMNS: ColumnType[] = [
  {
    fieldName: "Name",
    fieldKey: "name",
    type: "string",
  },
  {
    fieldName: "Type",
    fieldKey: "type",
    type: "string",
  },
  {
    fieldName: "Species",
    fieldKey: "species",
    type: "string",
  },
  {
    fieldName: "Gender",
    fieldKey: "gender",
    type: "string",
  },
  {
    fieldName: "Origin",
    fieldKey: "origin",
    type: "object",
  },
  {
    fieldName: "Location",
    fieldKey: "location",
    type: "object",
  },
  {
    fieldName: "Episodes",
    fieldKey: "episode",
    type: "array",
    overflow: true,
  },
];
