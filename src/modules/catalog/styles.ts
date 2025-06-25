import { Container, Paper, TableBody } from "@mui/material";
import styled from "@emotion/styled";

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

export const StyledTableContainer = styled(Paper)`
  height: 440px;
  overflow: auto;
`;

export const StyledContentWrapper = styled.div`
  height: 440px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTableBody = styled(TableBody)`
  overflow: scroll;
`;
