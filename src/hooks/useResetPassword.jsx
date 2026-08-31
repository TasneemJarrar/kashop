import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export default function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email, code, newPassword }) => {
      const response = await axiosInstance.patch('/auth/Account/ResetPassword', {
        email,
        code,
        newPassword,
      });
      return response.data;
    },
  });
}
