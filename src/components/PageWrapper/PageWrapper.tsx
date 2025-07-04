import type { ReactNode } from "react";
import { StyledPageWrapper, StyledImage } from "./styles.ts";
import { Typography } from "@mui/material";
import RickAndMorty from "../../assets/RickandMorty.png";

type PageWrapperProps = {
  title?: string;
  children: ReactNode;
};

const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <StyledPageWrapper>
      <StyledImage src={RickAndMorty} />
      {title && (
        <Typography variant="h6" component="h1">
          {title}
        </Typography>
      )}
      <>{children}</>
    </StyledPageWrapper>
  );
};

export default PageWrapper;
