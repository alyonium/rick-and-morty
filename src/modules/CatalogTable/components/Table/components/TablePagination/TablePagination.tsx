import { TablePagination as Pagination } from '@mui/material';

type PaginationProps = {
  count: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

// MUI table first page = 0; API first page = 1
export const TablePagination = ({
  count,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <Pagination
      component="div"
      count={count}
      onPageChange={(_, pageNumber) => onPageChange(pageNumber)}
      page={currentPage}
      rowsPerPage={20}
      rowsPerPageOptions={[20]}
    />
  );
};
