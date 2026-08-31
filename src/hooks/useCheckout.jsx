import { useMutation, useQueryClient } from "@tanstack/react-query"
import authAxiosInstance from "../api/authAxiosInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function useCheckout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {
      return await authAxiosInstance.post('Checkouts', { paymentMethod });
    },

    onSuccess: (response) => {
      toast.success(t("Checkout_Completed_Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

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
      toast.error(error?.response?.data?.message || t("Checkout_Failed"));
    },
  });
}