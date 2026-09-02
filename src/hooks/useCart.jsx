import authAxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';

export default function useCart() {
  const token = useAuthStore((state) => state.token);

  const getItems = async () => {
    const response = await authAxiosInstance.get(`/Cart`);
    return response.data;
  }

  return useQuery({
    queryKey: ['cart'],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

}
