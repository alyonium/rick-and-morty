import { Stack } from '@mui/material';
import { ROUTE } from 'router/const.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StyledButton } from 'modules/Card/components/CardEdit/components/CardButtons/styles.ts';
import BackButton from 'components/BackButton/BackButton.tsx';

const CardButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = useParams();

  return (
    <>
      <Stack pb="10px">
        <BackButton />
      </Stack>

      <Stack spacing={1} direction="row" pb="10px">
        <StyledButton color="primary" variant="contained" type="submit">
          Save
        </StyledButton>

        <StyledButton
          color="error"
          variant="contained"
          onClick={() => {
            navigate(`${ROUTE.CARD_VIEW}/${cardId}`, {
              state: {
                page: location.state?.page,
                search: location.state?.search,
              },
            });
          }}
        >
          Cancel
        </StyledButton>
      </Stack>
    </>
  );
};

export default CardButtons;
