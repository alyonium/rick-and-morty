import { TableCell } from '@mui/material';
import {
  COLUMNS,
  type ObjectType,
  type ArrayType,
} from 'modules/CatalogTable/components/Table/consts/columns.ts';
import { OverflowCell } from '../OverflowCell/OverflowCell.tsx';
import { StyledTableBody, StyledTableRow } from './styles.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE } from 'router/const.ts';
import { DEFAULT_SEARCH } from 'utils/const.ts';
import type { SelectedCharacterFields } from 'src/types/types.ts';

type TableContentProps = {
  data: SelectedCharacterFields[];
};

export const TableContent = ({ data }: TableContentProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <StyledTableBody>
      {data.map((row: SelectedCharacterFields) => {
        return (
          <StyledTableRow
            key={row.id}
            onClick={() => {
              navigate(`${ROUTE.CARD_VIEW}/${row.id}`, {
                state: {
                  page:
                    searchParams.get('page') &&
                    +(searchParams.get('page') as string),
                  search: searchParams.get('search') || DEFAULT_SEARCH,
                },
              });
            }}
          >
            {COLUMNS.map((col) => {
              let content: string = '';

              if (col.type === 'string') {
                content = row[col.fieldKey] as string;
              }

              if (col.type === 'object') {
                content = (row[col.fieldKey] as ObjectType)?.name as string;
              }

              if (col.type === 'array') {
                content = (row[col.fieldKey] as ArrayType)
                  ?.map((item: ObjectType) => item.name)
                  .join(', ') as string;
              }

              if (col.overflow) {
                return (
                  <OverflowCell
                    key={`${col.fieldKey as string}-${row.id}`}
                    content={content}
                  />
                );
              }

              return (
                <TableCell key={`${col.fieldKey as string}-${row.id}`}>
                  {content}
                </TableCell>
              );
            })}
          </StyledTableRow>
        );
      })}
    </StyledTableBody>
  );
};
