import * as yup from 'yup';

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current_Password_Required').min(8, 'Password_Min_Length').max(20),
  newPassword: yup
    .string()
    .required('New_Password_Required')
    .min(8, 'Password_Min_Length')
    .max(20)
    .notOneOf([yup.ref('currentPassword')], 'New_Password_Must_Be_Different'),
  confirmNewPassword: yup
    .string()
    .required('Confirm_Password_Required')
    .oneOf([yup.ref('newPassword')], 'Passwords_Do_Not_Match'),
});