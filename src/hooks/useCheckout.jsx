import { useMutation } from "@tanstack/react-query"
import authAxiosInstance from "../api/authAxiosInstance";
import { useNavigate } from "react-router";

export default function useCheckout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {

      return await authAxiosInstance.post('Checkouts', { paymentMethod })
    }, onSuccess: (response) => {
      if (response?.data?.url) {
        location.href = response.data.url;
      }
      navigate('/cart')

    }
  })
}
