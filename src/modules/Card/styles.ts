import { Stack } from '@mui/material';
import styled from '@emotion/styled';

export const StyledStack = styled(Stack)`
  max-height: 400px;
  width: 500px;
  padding: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;

  @media (max-width: 600px) {
    width: 300px;
  }
`;
