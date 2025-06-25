import { useQuery } from "@apollo/client";
import type {
  Character,
  GetCharactersQuery,
} from "../../api/__generated__/graphql.ts";
import { GET_CHARACTERS } from "../../api/queries/charactersTable.ts";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { COLUMNS } from "./columns.ts";
import { Filter } from "./components/Filter/Filter.tsx";
import { useState } from "react";
import { DEFAULT_PAGE } from "./utils.ts";
import { Table as TableContent } from "./components/Table/Table.tsx";
import { Pagination } from "./components/Pagination/Pagination.tsx";
import {
  StyledContainer,
  StyledLoaderWrapper,
  StyledTableBody,
  StyledTableContainer,
} from "./styles.ts";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";

// MUI table first page = 0; API first page = 1
const CatalogPage = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [debounceInputValue, setDebounceInputValue] = useState<string>("");
  const { loading, error, data, refetch } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        page: DEFAULT_PAGE + 1,
      },
    },
  );

  const onSearch = (searchValue: string) => {
    setDebounceInputValue(searchValue);
    setCurrentPage(DEFAULT_PAGE);
    updateTable(DEFAULT_PAGE, searchValue);
  };

  const updateTable = (page: number, searchValue: string) => {
    refetch({
      page: page + 1,
      name: searchValue,
    });
  };

  if (error) return <p>Error : {error.message}</p>;

  return (
    <PageWrapper title="characters catalog">
      <StyledContainer>
        <Filter onSearch={onSearch} />

        {loading ? (
          <StyledLoaderWrapper>
            <CircularProgress />
          </StyledLoaderWrapper>
        ) : (
          <StyledTableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.fieldKey} width="220px">
                      {col.fieldName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <StyledTableBody>
                <TableContent data={data?.characters?.results as Character[]} />
              </StyledTableBody>
            </Table>
          </StyledTableContainer>
        )}
        <Pagination
          count={data?.characters?.info?.count || 0}
          onPageChange={(page: number) => {
            setCurrentPage(page);
            updateTable(page, debounceInputValue);
          }}
          currentPage={currentPage}
        />
      </StyledContainer>
    </PageWrapper>
  );
};

export default CatalogPage;
