import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance";

export default function useAddReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rating, comment }) => {
      const response = await authAxiosInstance.post(`/Products/${productId}/reviews`,
        { rating, comment }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "product" && query.queryKey.includes(productId),
      });
    },
  });
}