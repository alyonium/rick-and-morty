import type { Character } from "../../../../api/__generated__/graphql.ts";
import { TableCell } from "@mui/material";
import { COLUMNS } from "../../columns.ts";
import { OverflowCell } from "./components/OverflowCell.tsx";
import { StyledTableRow } from "./styles.ts";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../router/const.ts";

type TableProps = {
  data: Character[];
};

export const Table = ({ data }: TableProps) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map((row: Character) => {
        return (
          <StyledTableRow
            key={row.id}
            onClick={() => {
              navigate(`${ROUTE.CARD_VIEW}/${row.id}`);
            }}
          >
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
          </StyledTableRow>
        );
      })}
    </>
  );
};
