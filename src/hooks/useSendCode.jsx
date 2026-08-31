import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export default function useSendCode() {
  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await axiosInstance.post('/auth/Account/SendCode', { email });
      return response.data;
    },
  });
}
