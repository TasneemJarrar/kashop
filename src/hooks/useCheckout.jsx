import { useMutation } from "@tanstack/react-query"
import authAxiosInstance from "../api/authAxiosInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function useCheckout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {
      return await authAxiosInstance.post('Checkouts', { paymentMethod });
    },

    onSuccess: (response) => {
      toast.success("Checkout completed successfully!");

      if (response?.data?.url) {
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 1200);
        return;
      }

      setTimeout(() => {
        navigate('/cart');
      }, 1200);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Could not add item to cart');
    },
  });
}