import { useQuery } from "@apollo/client";
import type {
  Character,
  GetCharactersQuery,
} from "../../api/__generated__/graphql.ts";
import { GET_CHARACTERS } from "../../api/queries/charactersTable.ts";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TablePagination,
  TableCell,
} from "@mui/material";
import { COLUMNS } from "./columns.ts";

const CatalogPage = () => {
  const { loading, error, data } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        page: 0,
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableCell key={col.fieldKey}>{col.fieldName}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.characters?.results?.map((row: Character) => {
            return (
              <TableRow key={row.id}>
                {COLUMNS.map((col) => {
                  if (col.type === "string") {
                    return (
                      <TableCell key={`${col.fieldKey}-${row.id}`}>
                        {row[col.fieldKey]}
                      </TableCell>
                    );
                  }

                  if (col.type === "object") {
                    return (
                      <TableCell key={`${col.fieldKey}-${row.id}`}>
                        {row[col.fieldKey]?.name}
                      </TableCell>
                    );
                  }

                  if (col.type === "array") {
                    return (
                      <TableCell key={`${col.fieldKey}-${row.id}`}>
                        {row[col.fieldKey]?.map((item) => item.name).join(", ")}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={`${col}-${row.id}`}>
                      {row[col.fieldKey]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}

          <TableRow>
            <TablePagination
              count={10}
              onPageChange={() => console.log("pageChange")}
              page={10}
              rowsPerPage={20}
              rowsPerPageOptions={[20]}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CatalogPage;
