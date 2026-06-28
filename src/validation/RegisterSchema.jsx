import * as yup from 'yup';

export const registerSchema = yup.object({
    userName: yup.string().required().min(3).max(20),
    fullName: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required().min(9).max(15),
    password: yup.string().required().min(8).max(20),
  })