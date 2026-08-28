import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ productId, count }) =>
      await authAxiosInstance.patch(`Carts/${productId}`, { count }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
}