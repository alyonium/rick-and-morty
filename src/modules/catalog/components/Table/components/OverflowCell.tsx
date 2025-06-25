import { Tooltip } from "@mui/material";
import { StyledOverflowCell } from "./styles.ts";

type OverflowCellProps = {
  children: string;
};

export const OverflowCell = ({ children }: OverflowCellProps) => {
  return (
    <Tooltip title={children} arrow placement="top">
      <StyledOverflowCell>{children}</StyledOverflowCell>
    </Tooltip>
  );
};
