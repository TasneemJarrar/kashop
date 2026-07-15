import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';

export default function useAddToCart() {
  return useMutation({
    mutationFn: async (values) => {
      return await authAxiosInstance.post("/Carts", {
        ProductId: values.productId,
        count: values.count,
      });
    },
  });
}
