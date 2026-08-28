import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAxiosInstance from '../api/authAxiosInstance';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data) =>
      await authAxiosInstance.patch('Profile/change-email', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(t("Profile_Updated_Successfully"));
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("Profile_Update_Failed"));
    },
  });
}