import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (cartItemId) => authAxiosInstance.delete(`/Carts/${cartItemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t("Item_Removed_From_Cart"));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("Could_Not_Remove_Item"));
    },
  });
}