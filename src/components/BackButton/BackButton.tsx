import { ROUTE } from 'router/const.ts';
import { DEFAULT_PAGE, DEFAULT_SEARCH } from 'utils/const.ts';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      color="secondary"
      variant="contained"
      fullWidth
      onClick={() =>
        navigate(ROUTE.CATALOG, {
          state: {
            page: location.state?.page || DEFAULT_PAGE,
            search: location.state?.search || DEFAULT_SEARCH,
          },
        })
      }
    >
      Back to catalog
    </Button>
  );
};

export default BackButton;
