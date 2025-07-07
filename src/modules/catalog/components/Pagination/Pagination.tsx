import { TablePagination } from "@mui/material";

type PaginationProps = {
  count: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  count,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={(_, pageNumber) => onPageChange(pageNumber)}
      page={currentPage}
      rowsPerPage={20}
      rowsPerPageOptions={[20]}
    />
  );
};
