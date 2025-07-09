import { useParams } from 'react-router-dom';
import CardEdit from 'modules/Card/components/CardEdit/CardEdit.tsx';
import CardView from 'modules/Card/components/CardView/CardView.tsx';
import { CARD_MODE } from 'router/const.ts';
import { useQuery } from '@apollo/client';
import type {
  Character,
  GetCharacterQuery,
} from 'api/__generated__/graphql.ts';
import { GET_CHARACTER } from 'api/queries/card/characterPage.ts';
import { CircularProgress, Typography } from '@mui/material';
import { StyledContainer, StyledContentWrapper } from 'src/styles.ts';
import BackButton from 'components/BackButton/BackButton.tsx';

const Card = () => {
  const { cardMode, cardId } = useParams();

  const { loading, error, data } = useQuery<GetCharacterQuery>(GET_CHARACTER, {
    variables: {
      id: cardId,
    },
  });

  if (loading) {
    return (
      <StyledContainer>
        <StyledContentWrapper>
          <CircularProgress />
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Typography variant="body1">Error: {error.message}</Typography>

        <StyledContentWrapper>
          <BackButton />
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  if (data?.character === null || data?.character === undefined) {
    return (
      <StyledContainer>
        <Typography variant="body1">Character does not exist</Typography>

        <StyledContentWrapper>
          <BackButton />
        </StyledContentWrapper>
      </StyledContainer>
    );
  }

  const getUpdatedCharacterData = (): Character => {
    const character = localStorage.getItem(`character:${cardId}`)
      ? JSON.parse(localStorage.getItem(`character:${cardId}`) as string)
      : null;

    if (character) {
      return {
        ...data?.character,
        ...character,
      };
    } else {
      return data?.character as Character;
    }
  };

  if (cardMode === CARD_MODE.EDIT) {
    return <CardEdit defaultData={getUpdatedCharacterData()} />;
  }

  if (cardMode === CARD_MODE.VIEW) {
    return <CardView data={getUpdatedCharacterData()} />;
  }
};

export default Card;
