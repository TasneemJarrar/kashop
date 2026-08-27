import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';

export default function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      return await authAxiosInstance.post("/Carts", {
        ProductId: values.productId,
        count: values.count,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't add item to cart");
    },
  });
}
