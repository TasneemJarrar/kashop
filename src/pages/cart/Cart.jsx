import axios from 'axios';
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import useCounterStore from '../../store/useCounterStore';


export default function Cart() {

  const counter= useCounterStore( (state) => state.counter);
  const Increment= useCounterStore( (state) => state.Increment);

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
  return <>
    <button onClick={Increment}>+</button>
    <div>Cart - {counter}</div>
  </>
  
}
