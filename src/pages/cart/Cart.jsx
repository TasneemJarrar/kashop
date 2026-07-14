import axios from 'axios';
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';


export default function Cart() {
  const getItems = async () => {
    try {
      const response = await authAxiosInstance.get(`/Carts`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getItems();
  }, [])
  return (
    <div>Cart</div>
  )
}
