import { useQuery } from '@apollo/client';
import type {
  Character,
  GetCharactersQuery,
} from 'api/__generated__/graphql.ts';
import { GET_CHARACTERS } from 'api/queries/catalog/charactersTable.ts';
import { CircularProgress, Typography } from '@mui/material';
import { Filter } from './components/Filter/Filter.tsx';
import { useCallback } from 'react';
import { DEFAULT_PAGE, DEFAULT_SEARCH } from 'utils/const.ts';
import { StyledContentWrapper, StyledContainer } from './styles.ts';
import { Table } from 'modules/CatalogTable/components/Table/Table.tsx';
import type { TableDataType } from 'src/types/types.ts';
import { useCatalogSearchParams } from 'src/hooks/useCatalogSearchParams.ts';

// MUI table first page = 0; API first page = 1
const CatalogTable = () => {
  const { currentPage, currentSearch, updateParams } = useCatalogSearchParams();

  const { loading, error, data, refetch } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        page: currentPage + 1,
        name: currentSearch,
      },
    },
  );

  const getUpdatedTableData = (): TableDataType => {
    if (data?.characters?.info?.count === null) {
      return {
        info: data!.characters.info,
        results: [],
      };
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
      info: data!.characters.info,
      results: updateFromLocalStorageData
        ? [...updateFromLocalStorageData]
        : [],
    };
  };

  const updateTable = useCallback((page: number, searchValue: string) => {
    updateParams({
      page: `${page}`,
      search: searchValue,
    });
    refetch({
      page: page + 1,
      name: searchValue,
    });
  }, []);

  const onSearch = useCallback(
    (searchValue: string) => {
      updateTable(DEFAULT_PAGE, searchValue);
    },
    [updateParams, updateTable],
  );

  const onPageChange = useCallback(
    (page: number) => {
      updateTable(page, currentSearch || DEFAULT_SEARCH);
    },
    [updateParams, updateTable],
  );

  if (error) {
    return (
      <StyledContainer>
        <StyledContentWrapper>
          <Typography variant="body1">Error: {error.message}</Typography>
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  if (loading) {
    return (
      <StyledContainer>
        <Filter onSearch={onSearch} />

        <StyledContentWrapper>
          <CircularProgress />
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  if (getUpdatedTableData().results.length === 0) {
    return (
      <StyledContainer>
        <Filter onSearch={onSearch} />

        <StyledContentWrapper>
          <Typography variant="body1">No data</Typography>
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Filter onSearch={onSearch} />

      <StyledContentWrapper>
        <Table
          data={getUpdatedTableData()}
          currentPage={currentPage || DEFAULT_PAGE}
          onPageChange={onPageChange}
        />
      </StyledContentWrapper>
    </StyledContainer>
  );
};

export default CatalogTable;
