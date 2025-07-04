import type { Character } from "../../../api/__generated__/graphql.ts";
import { Autocomplete, Avatar, Button, TextField, Stack } from "@mui/material";
import SelectPicker from "../edit/components/SelectPicker.tsx";
import { GenderOptions, StatusOptions } from "../edit/data.ts";
import { Link } from "react-router-dom";
import { StyledStack } from "../styles.ts";
import { ROUTE } from "../../../router/const.ts";
import { convertDataToFrontend } from "../edit/convertData.ts";

type CardViewProps = {
  data: Character;
};

const CardView = ({ data }: CardViewProps) => {
  const convertedData = convertDataToFrontend(data);

  return (
    <div>
      <Stack pb="10px">
        <Link to={ROUTE.CATALOG} style={{ width: "100%" }}>
          <Button color="secondary" variant="contained" fullWidth>
            Back to catalog
          </Button>
        </Link>
      </Stack>
      <Stack spacing={1} direction="row" pb="10px">
        <Link to={`${ROUTE.CARD_EDIT}/${data.id}`} style={{ width: "100%" }}>
          <Button color="primary" variant="contained" fullWidth>
            Edit
          </Button>
        </Link>
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
              value: convertedData?.location,
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
