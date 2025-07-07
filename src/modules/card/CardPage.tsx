import { useParams, useLocation, useNavigate } from 'react-router-dom';
import CardEdit from './edit/CardEdit.tsx';
import CardView from './view/CardView.tsx';
import { CARD_MODE, ROUTE } from 'router/const.ts';
import { useQuery } from '@apollo/client';
import type { GetCharacterQuery } from 'api/__generated__/graphql.ts';
import { GET_CHARACTER } from 'api/queries/card/characterPage.ts';
import PageWrapper from 'components/PageWrapper/PageWrapper.tsx';
import { useMemo } from 'react';
import { StyledContentWrapper } from '../catalog/styles.ts';
import { Button, CircularProgress, Typography, Stack } from '@mui/material';
import { DEFAULT_PAGE } from 'utils/const.ts';

const CardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

    const character = localStorage.getItem(`character:${cardId}`)
      ? JSON.parse(localStorage.getItem(`character:${cardId}`) as string)
      : null;

    if (character) {
      return {
        ...data?.character,
        ...character,
      };
    } else {
      return data?.character;
    }
  }, [data, cardId]);

  if (error || data?.character === null) {
    return (
      <PageWrapper>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h3" color="textSecondary">
            Error
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() =>
              navigate(ROUTE.CATALOG, {
                state: {
                  catalogPage: location.state?.catalogPage || DEFAULT_PAGE,
                },
              })
            }
          >
            Back to catalog
          </Button>
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
