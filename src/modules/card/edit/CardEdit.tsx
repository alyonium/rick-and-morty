import type { Character } from "../../../api/__generated__/graphql.ts";
import { useFormik } from "formik";
import { TextField, Button, Autocomplete, Avatar } from "@mui/material";
import { validationSchema } from "./validationSchema.ts";
import { StyledStack } from "../styles.ts";
import SelectPicker from "./components/SelectPicker.tsx";
import { GenderOptions, StatusOptions } from "./data.ts";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_CHARACTER_LOCAL } from "../../../api/mutations/card/updateCharacterPage.ts";

type CardEditProps = {
  defaultData: Character;
};

const CardEdit = ({ defaultData }: CardEditProps) => {
  const [updateCharacterLocal] = useMutation(UPDATE_CHARACTER_LOCAL);

  const convertDataToBackendFormat = (values) => {
    return {
      name: values.name,
      species: values.species,
      status: StatusOptions.find((item) => {
        return item.value === values.status;
      })?.label,
      gender: GenderOptions.find((item) => {
        return item.value === values.gender;
      })?.label,
    };
  };

  const formik = useFormik({
    initialValues: {
      name: defaultData.name,
      species: defaultData.species,
      status: StatusOptions.find((item) => item.label === defaultData.status)
        ?.value,
      gender: GenderOptions.find((item) => item.label === defaultData.gender)
        ?.value,
      location: +defaultData?.location?.id,
      episode: defaultData.episode.map((item) => {
        return { id: item?.id, label: item?.name };
      }),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedCharacter = convertDataToBackendFormat(values);

      const character = JSON.parse(
        localStorage.getItem(`character:${defaultData.id}`),
      );

      updateCharacterLocal({
        variables: {
          id: defaultData.id,
          updatedData: { ...updatedCharacter },
        },
      });

      localStorage.setItem(
        `character:${defaultData.id}`,
        JSON.stringify({
          ...character,
          ...updatedCharacter,
        }),
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          defaultValue={formik.values.gender}
        />
        <SelectPicker
          fullWidth
          id="status"
          name="status"
          label="Status"
          options={StatusOptions}
          defaultValue={formik.values.status}
        />
        {/*Paginated API doesn't suit well for array and object edit*/}
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Save
        </Button>
        <Link to={`/card/view/${defaultData.id}`} style={{ width: "100%" }}>
          <Button color="error" variant="contained" fullWidth>
            Cancel
          </Button>
        </Link>
      </StyledStack>
    </form>
  );
};

export default CardEdit;
