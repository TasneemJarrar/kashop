import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function UseCategories() {
  const getCategories = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BURL}/categories`, {
      headers:{
        "Accept-language": "en"
      }
    });
    return response.data;
  };

    const query = useQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
      staleTime: 1000 * 60 * 5
    })

    return query;
}
