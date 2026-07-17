import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../api/axiosInstance";
import axios from 'axios';
import i18n from '../i18next';

export default function UseCategories() {
  const getCategories = async () => {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  };

    const query = useQuery({
      queryKey: ['categories',i18n.language],
      queryFn: getCategories,
      staleTime: 1000 * 60 * 5
    })

    return query;
}
