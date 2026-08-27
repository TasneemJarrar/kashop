import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';

export default function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => authAxiosInstance.delete(`/Carts/clear`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success("Cart cleared");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't clear cart");
    },
  })
}
