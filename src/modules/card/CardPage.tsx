import { Link, useParams } from "react-router-dom";
import CardEdit from "./edit/CardEdit.tsx";
import CardView from "./view/CardView.tsx";
import { CARD_MODE, ROUTE } from "../../router/const.ts";
import { useQuery } from "@apollo/client";
import type { GetCharacterQuery } from "../../api/__generated__/graphql.ts";
import { GET_CHARACTER } from "../../api/queries/card/characterPage.ts";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";
import { useMemo } from "react";
import { StyledContentWrapper } from "../catalog/styles.ts";
import { Button, CircularProgress, Typography, Stack } from "@mui/material";

const CardPage = () => {
  const { cardMode, cardId } = useParams();

  const { loading, error, data } = useQuery<GetCharacterQuery>(GET_CHARACTER, {
    variables: {
      id: cardId,
    },
  });

  const updatedCharacterData = useMemo(() => {
    if (data?.character === null) {
      return null;
    }

    const character = JSON.parse(localStorage.getItem(`character:${cardId}`));

    if (character) {
      return {
        ...data?.character,
        ...character,
      };
    } else {
      return data?.character;
    }
  }, [data, cardMode]);

  if (error || data?.character === null) {
    return (
      <PageWrapper>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h3" color="textSecondary">
            Error
          </Typography>

          <Link to={ROUTE.CATALOG} style={{ width: "100%" }}>
            <Button color="secondary" variant="contained" fullWidth>
              Back to catalog
            </Button>
          </Link>
        </Stack>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {loading && (
        <StyledContentWrapper>
          <CircularProgress />
        </StyledContentWrapper>
      )}

      {cardMode === CARD_MODE.EDIT && !loading && (
        <CardEdit defaultData={updatedCharacterData} />
      )}

      {cardMode === CARD_MODE.VIEW && !loading && (
        <CardView data={updatedCharacterData} />
      )}
    </PageWrapper>
  );
};

export default CardPage;
