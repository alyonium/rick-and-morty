import { TableCell } from "@mui/material";
import styled from "@emotion/styled";

export const StyledOverflowCell = styled(TableCell)`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
