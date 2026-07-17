import React from 'react'
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import i18n from '../i18next';

export default function useProducts() {

    const getProducts = async () => {
      const response = await axiosInstance.get(`/Products?page=1&limit=3&sortBy=price&ascending=false`);
      return response.data;  
  }

  const query = useQuery ({
    queryKey: ['products', i18n.language],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  })

  return query;
}
 