import axios from 'axios';
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import useAuthStore from '../../store/useAuthStore';


export default function Cart() {

  const token = useAuthStore((state)=> state.token);
  const getItems = async () => {
    try {
      const response = await authAxiosInstance.get(`/Carts`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getItems();
  }, [])
  return <>
    
  </>
  
}
