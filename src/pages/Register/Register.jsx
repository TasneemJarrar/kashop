import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

export default function Register() {
  const { register, handleSubmit } = useForm ();

  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/register`, data); 
      console.log(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <Box component="section" sx={{ mt: 5 }}>
      <Typography variant="h1" component="h2">
        Register
      </Typography>

      <Box onSubmit={handleSubmit(RegisterForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField {...register('userName')} label="User Name" variant="standard" />
      <TextField {...register('fullName')} label="Full Name" variant="standard" />
      <TextField {...register('email')} label="Email" variant="standard" />
      <TextField {...register('phoneNumber')} label="Phone Number" variant="standard" />
      <TextField {...register('password')} label="Password" variant="standard" />
      <Button variant="outlined" type="submit">
        Register
      </Button>
      </Box>


    </Box>
  )
}
