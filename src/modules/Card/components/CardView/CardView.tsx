import type { Character } from 'api/__generated__/graphql.ts';
import { Autocomplete, Avatar, TextField } from '@mui/material';
import SelectPicker from 'modules/Card/components/CardEdit/components/SelectPicker/SelectPicker.tsx';
import {
  GenderOptions,
  StatusOptions,
} from 'modules/Card/components/CardEdit/consts/data.ts';
import { StyledStack } from '../../styles.ts';
import { convertDataToFrontend } from 'modules/Card/components/CardEdit/utils/convertData.ts';
import CardButtons from 'modules/Card/components/CardView/components/CardButtons/CardButtons.tsx';

type CardViewProps = {
  data: Character;
};

const CardView = ({ data }: CardViewProps) => {
  const convertedData = convertDataToFrontend(data);

  return (
    <div>
      <CardButtons />

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
