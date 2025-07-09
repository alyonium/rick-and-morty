import {
  StyledStack,
  StyledTableContainer,
} from 'modules/CatalogTable/components/Table/styles.ts';
import {
  Table as TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { COLUMNS } from 'modules/CatalogTable/components/Table/consts/columns.ts';
import { TableContent } from 'modules/CatalogTable/components/Table/components/TableContent/TableContent.tsx';
import { TablePagination } from 'modules/CatalogTable/components/Table/components/TablePagination/TablePagination.tsx';
import type { TableDataType } from 'src/types/types.ts';

type TableProps = {
  data: TableDataType;
  currentPage: number;
  onPageChange: (page: number) => void;
};

// MUI table first page = 0; API first page = 1
export const Table = ({ data, currentPage, onPageChange }: TableProps) => {
  return (
    <StyledStack spacing={1}>
      <StyledTableContainer>
        <TableContainer stickyHeader>
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableCell key={col.fieldKey} width="220px">
                  {col.fieldName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableContent data={data.results} />
        </TableContainer>
      </StyledTableContainer>

      <TablePagination
        count={data.info.count || 0}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </StyledStack>
  );
};
