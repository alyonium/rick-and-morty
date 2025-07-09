import type { Character } from 'api/__generated__/graphql.ts';
import { useFormik } from 'formik';
import { TextField, Autocomplete, Avatar } from '@mui/material';
import { validationSchema } from './utils/validationSchema.ts';
import { StyledStack } from '../../styles.ts';
import SelectPicker from './components/SelectPicker/SelectPicker.tsx';
import { GenderOptions, StatusOptions } from './consts/data.ts';
import { useMutation } from '@apollo/client';
import { UPDATE_CHARACTER_LOCAL } from 'api/mutations/card/updateCharacterPage.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from 'router/const.ts';
import {
  convertDataToFrontend,
  convertDataToBackend,
} from './utils/convertData.ts';
import CardButtons from 'modules/Card/components/CardEdit/components/CardButtons/CardButtons.tsx';

type CardEditProps = {
  defaultData: Character;
};

const CardEdit = ({ defaultData }: CardEditProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateCharacterLocal] = useMutation(UPDATE_CHARACTER_LOCAL);

  const formik = useFormik({
    initialValues: convertDataToFrontend(defaultData),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedCharacter = convertDataToBackend({
        name: values.name,
        species: values.species,
        status: values.status,
        gender: values.gender,
      });

      const character = localStorage.getItem(`character:${defaultData.id}`)
        ? JSON.parse(
            localStorage.getItem(`character:${defaultData.id}`) as string,
          )
        : null;

      updateCharacterLocal({
        variables: {
          id: defaultData.id,
          name: updatedCharacter.name,
          species: updatedCharacter.species,
          status: updatedCharacter.status,
          gender: updatedCharacter.gender,
        },
      });

      localStorage.setItem(
        `character:${defaultData.id}`,
        JSON.stringify({
          ...character,
          ...updatedCharacter,
        }),
      );

      navigate(`${ROUTE.CARD_VIEW}/${defaultData.id}`, {
        state: {
          page: location.state?.page,
          search: location.state?.search,
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardButtons />

      <StyledStack spacing={2}>
        <Avatar alt={defaultData.name} src={defaultData.image} />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="species"
          name="species"
          label="Species"
          value={formik.values.species}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.species && Boolean(formik.errors.species)}
          helperText={formik.touched.species && formik.errors.species}
        />
        <SelectPicker
          fullWidth
          id="gender"
          name="gender"
          label="Gender"
          options={GenderOptions}
          value={formik.values.gender}
          onChange={formik.handleChange}
        />
        <SelectPicker
          fullWidth
          id="status"
          name="status"
          label="Status"
          options={StatusOptions}
          value={formik.values.status}
          onChange={formik.handleChange}
        />
        <SelectPicker
          fullWidth
          disabled
          id="location"
          name="location"
          label="Location"
          options={[
            {
              value: +defaultData?.location?.id,
              label: defaultData?.location?.name,
            },
          ]}
          defaultValue={formik.values.location}
        />
        <Autocomplete
          fullWidth
          multiple
          disabled
          limitTags={3}
          id="episode"
          options={[]}
          getOptionLabel={(option) => option?.name}
          defaultValue={defaultData.episode}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Episodes" />
          )}
        />
      </StyledStack>
    </form>
  );
};

export default CardEdit;
