import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  species: yup.string().required('Species is required'),
});
