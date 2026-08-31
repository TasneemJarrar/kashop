import * as yup from 'yup';

export const sendCodeSchema = yup.object({
  email: yup.string().email('Invalid_Email').required('Email_Required'),
});

export const resetPasswordSchema = yup.object({
  code: yup.string().required('Code_Required'),
  newPassword: yup.string().required('New_Password_Required').min(8, 'Password_Min_Length').max(20),
  confirmNewPassword: yup
    .string()
    .required('Confirm_Password_Required')
    .oneOf([yup.ref('newPassword')], 'Passwords_Do_Not_Match'),
});
