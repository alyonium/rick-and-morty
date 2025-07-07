import { Tooltip } from '@mui/material';
import { StyledOverflowCell } from './styles.ts';

type OverflowCellProps = {
  content: string;
};

export const OverflowCell = ({ content }: OverflowCellProps) => {
  return (
    <Tooltip title={content} arrow placement="top">
      <StyledOverflowCell>{content}</StyledOverflowCell>
    </Tooltip>
  );
};
