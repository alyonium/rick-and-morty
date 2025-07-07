import type { Character } from "../../../../api/__generated__/graphql.ts";
import { TableCell } from "@mui/material";
import { COLUMNS, type ObjectType, type ArrayType } from "../../columns.ts";
import { OverflowCell } from "./components/OverflowCell.tsx";
import { StyledTableRow } from "./styles.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE } from "../../../../router/const.ts";
import { DEFAULT_SEARCH } from "../../utils.ts";

type TableProps = {
  data: Character[];
};

export const Table = ({ data }: TableProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <>
      {data.map((row: Character) => {
        return (
          <StyledTableRow
            key={row.id}
            onClick={() => {
              navigate(`${ROUTE.CARD_VIEW}/${row.id}`, {
                state: {
                  catalogPage:
                    searchParams.get("catalogPage") &&
                    +(searchParams.get("catalogPage") as string),
                  search: searchParams.get("search") || DEFAULT_SEARCH,
                },
              });
            }}
          >
            {COLUMNS.map((col) => {
              let content: string = "";

              if (col.type === "string") {
                content = row[col.fieldKey] as string;
              }

              if (col.type === "object") {
                content = (row[col.fieldKey] as ObjectType)?.name as string;
              }

              if (col.type === "array") {
                content = (row[col.fieldKey] as ArrayType)
                  ?.map((item: ObjectType) => item.name)
                  .join(", ") as string;
              }

              if (col.overflow) {
                return <OverflowCell content={content} />;
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
