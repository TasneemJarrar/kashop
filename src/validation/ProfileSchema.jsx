import * as yup from 'yup';

export const profileSchema = yup.object({
  email: yup.string().email().required(),
});