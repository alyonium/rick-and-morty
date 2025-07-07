import { useQuery } from '@apollo/client';
import type {
  Character,
  GetCharactersQuery,
} from 'api/__generated__/graphql.ts';
import { GET_CHARACTERS } from 'api/queries/catalog/charactersTable.ts';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
} from '@mui/material';
import { COLUMNS } from './columns.ts';
import { Filter } from './components/Filter/Filter.tsx';
import { useMemo } from 'react';
import { DEFAULT_PAGE, DEFAULT_SEARCH } from 'utils/const.ts';
import { Table as TableContent } from './components/Table/Table.tsx';
import { Pagination } from './components/Pagination/Pagination.tsx';
import {
  StyledContentWrapper,
  StyledContainer,
  StyledTableBody,
  StyledTableContainer,
} from './styles.ts';
import PageWrapper from 'components/PageWrapper/PageWrapper.tsx';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

// MUI table first page = 0; API first page = 1
const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.catalogPage && location.state?.search) {
      setSearchParams({
        catalogPage: `${location.state?.catalogPage}`,
        search: location.state?.search,
      });
      return;
    }

    if (location.state?.catalogPage) {
      setSearchParams({
        catalogPage: `${location.state?.catalogPage}`,
        search: DEFAULT_SEARCH,
      });
      return;
    }

    if (location.state?.search) {
      setSearchParams({
        search: location.state?.search,
        catalogPage: `${DEFAULT_PAGE}`,
      });
      return;
    }
  }, [location.state]);

  const { loading, error, data, refetch } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        page:
          location.state?.catalogPage ||
          (searchParams.get('catalogPage') &&
            +(searchParams.get('catalogPage') as string) + 1) ||
          DEFAULT_PAGE + 1,
        name:
          location.state?.search ||
          searchParams.get('search') ||
          DEFAULT_SEARCH,
      },
    },
  );

  const updatedTableData = useMemo(() => {
    if (data?.characters?.info?.count === null) {
      return data?.characters;
    }

    const updateFromLocalStorageData = data?.characters?.results?.map(
      (item: Pick<Character, 'id'>) => {
        const character = localStorage.getItem(`character:${item?.id}`);

        if (character) {
          const editedCharacter = localStorage.getItem(`character:${item?.id}`)
            ? JSON.parse(
                localStorage.getItem(`character:${item?.id}`) as string,
              )
            : null;

          return {
            ...item,
            ...editedCharacter,
          };
        } else {
          return item;
        }
      },
    );

    return {
      info: data?.characters?.info,
      results: updateFromLocalStorageData
        ? [...updateFromLocalStorageData]
        : [],
    };
  }, [data]);

  const onSearch = (searchValue: string) => {
    // Search work through API and doesn't check edited values
    setSearchParams({ catalogPage: `${DEFAULT_PAGE}`, search: searchValue });
    updateTable(DEFAULT_PAGE, searchValue);
  };

  const updateTable = (page: number, searchValue: string) => {
    refetch({
      page: page + 1,
      name: searchValue,
    });
  };

  if (error) {
    return (
      <StyledContentWrapper>
        <Typography variant="body1">Error: {error.message}</Typography>
      </StyledContentWrapper>
    );
  }

  return (
    <PageWrapper title="characters catalog">
      <StyledContainer>
        <Filter onSearch={onSearch} />

        {loading && (
          <StyledContentWrapper>
            <CircularProgress />
          </StyledContentWrapper>
        )}

        {!loading && updatedTableData?.results?.length === 0 && (
          <StyledContentWrapper>
            <Typography variant="body1">No data</Typography>
          </StyledContentWrapper>
        )}

        {!loading && updatedTableData?.results?.length > 0 && (
          <>
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
                  <TableContent
                    data={updatedTableData?.results as Character[]}
                  />
                </StyledTableBody>
              </Table>
            </StyledTableContainer>

            <Pagination
              count={updatedTableData?.info?.count || 0}
              onPageChange={(page: number) => {
                setSearchParams({
                  catalogPage: `${page}`,
                  search: searchParams.get('search') || DEFAULT_SEARCH,
                });
                updateTable(page, searchParams.get('search') || DEFAULT_SEARCH);
              }}
              currentPage={
                (searchParams.get('catalogPage') &&
                  +(searchParams.get('catalogPage') as string)) ||
                DEFAULT_PAGE
              }
            />
          </>
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default CatalogPage;
