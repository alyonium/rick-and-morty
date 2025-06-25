import type { Character } from "../../../../api/__generated__/graphql.ts";
import { TableCell, TableRow } from "@mui/material";
import { COLUMNS } from "../../columns.ts";
import { OverflowCell } from "./components/OverflowCell.tsx";

type TableProps = {
  data: Character[];
};

export const Table = ({ data }: TableProps) => {
  return (
    <>
      {data.map((row: Character) => {
        return (
          <TableRow key={row.id}>
            {COLUMNS.map((col) => {
              let content = undefined;

              if (col.type === "string") {
                content = row[col.fieldKey];
              }

              if (col.type === "object") {
                content = row[col.fieldKey]?.name;
              }

              if (col.type === "array") {
                content = row[col.fieldKey]
                  ?.map((item) => item.name)
                  .join(", ");
              }

              if (col.overflow) {
                return (
                  <OverflowCell key={`${col.fieldKey}-${row.id}`}>
                    {content}
                  </OverflowCell>
                );
              }

              return (
                <TableCell key={`${col.fieldKey}-${row.id}`}>
                  {content}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};
