import authAxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';

export default function useProfile() {
  const token = useAuthStore((state) => state.token);

  const getProfile = async () => {
    const response = await authAxiosInstance.get('/Profile');
    return response.data;
  }

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
}