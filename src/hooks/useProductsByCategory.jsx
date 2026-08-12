import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import i18n from '../i18next';

export default function useProductsByCategory({categoryId}) {

  const getProducts = async () => {
    const response = await axiosInstance.get(`/Products/category/${categoryId}`); return response.data;
  }
  const query = useQuery({
    queryKey: ['productsByCategory', i18n.language, categoryId],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    enabled: !!categoryId, 
  })

  return query;
}
