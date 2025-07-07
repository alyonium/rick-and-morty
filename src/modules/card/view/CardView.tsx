import type { Character } from "api/__generated__/graphql.ts";
import { Autocomplete, Avatar, Button, TextField, Stack } from "@mui/material";
import SelectPicker from "../edit/components/SelectPicker.tsx";
import { GenderOptions, StatusOptions } from "../edit/data.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledStack } from "../styles.ts";
import { ROUTE } from "router/const.ts";
import { convertDataToFrontend } from "../edit/convertData.ts";

type CardViewProps = {
  data: Character;
};

const CardView = ({ data }: CardViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const convertedData = convertDataToFrontend(data);

  return (
    <div>
      <Stack pb="10px">
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(ROUTE.CATALOG, {
              state: {
                catalogPage: location.state?.catalogPage,
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
            navigate(`${ROUTE.CARD_EDIT}/${data.id}`, {
              state: {
                catalogPage: location.state?.catalogPage,
                search: location.state?.search,
              },
            });
          }}
        >
          Edit
        </Button>
      </Stack>
      <StyledStack spacing={2}>
        <Avatar alt={data.name} src={data.image} />
        <TextField fullWidth disabled value={data.name} />
        <TextField fullWidth disabled value={data.species} />
        <SelectPicker
          fullWidth
          disabled
          value={convertedData?.gender}
          options={GenderOptions}
        />
        <SelectPicker
          fullWidth
          disabled
          value={convertedData?.status}
          options={StatusOptions}
        />
        <SelectPicker
          fullWidth
          disabled
          value={convertedData?.location}
          options={[
            {
              value: convertedData?.location as number,
              label: data?.location?.name,
            },
          ]}
        />
        <Autocomplete
          disabled
          multiple
          fullWidth
          id="episode"
          options={[]}
          getOptionLabel={(option) => option?.name}
          defaultValue={data.episode}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Episodes" />
          )}
        />
      </StyledStack>
    </div>
  );
};

export default CardView;
