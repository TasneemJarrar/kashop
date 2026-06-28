import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../api/axiosInstance";
import axios from 'axios';

export default function UseCategories() {
  const getCategories = async () => {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  };

    const query = useQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
      staleTime: 1000 * 60 * 5
    })

    return query;
}
