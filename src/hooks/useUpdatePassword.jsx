import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data) => {
      const response = await authAxiosInstance.patch("/Profile/change-password", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(t("Password_Updated_Successfully"));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("Password_Update_Failed"));
    },
  });
}