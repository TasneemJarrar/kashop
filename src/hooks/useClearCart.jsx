import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function useClearCart() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async () => authAxiosInstance.delete(`/Carts/clear`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success(t("Cart_Cleared_Successfully"));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("Could_Not_Clear_Cart"));
    },
  })
}
