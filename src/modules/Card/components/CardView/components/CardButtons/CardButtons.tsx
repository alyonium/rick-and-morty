import { Button, Stack } from '@mui/material';
import { ROUTE } from 'router/const.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CardButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = useParams();

  return (
    <>
      <Stack pb="10px">
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(ROUTE.CATALOG, {
              state: {
                page: location.state?.page,
                search: location.state?.search,
              },
            });
          }}
        >
          Back to catalog
        </Button>
      </Stack>

      <Stack spacing={1} direction="row" pb="10px">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(`${ROUTE.CARD_EDIT}/${cardId}`, {
              state: {
                page: location.state?.page,
                search: location.state?.search,
              },
            });
          }}
        >
          Edit
        </Button>
      </Stack>
    </>
  );
};

export default CardButtons;
