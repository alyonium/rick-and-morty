import { TableCell, Tooltip } from "@mui/material";
import { css } from "@emotion/react";
import type { ReactNode } from "react";

type OverflowCellProps = {
  children: ReactNode;
};

export const OverflowCell = ({ children }: OverflowCellProps) => {
  const text = String(children);

  return (
    <Tooltip title={text} arrow placement="top">
      <TableCell
        sx={css`
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      >
        {text}
      </TableCell>
    </Tooltip>
  );
};
