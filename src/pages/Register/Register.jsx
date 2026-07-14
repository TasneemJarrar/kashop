import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validation/RegisterSchema';

export default function Register() {
  const [serverErrors, setServerErrors] = useState({});

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(registerSchema) });

  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/register`, data);
      console.log(response.data);
      setServerErrors({});
    } catch (error) {
      console.error('Error', error.response.data.errors);
      setServerErrors(error.response.data.errors);

    }
  }

  return (
    <Box component="section" sx={{ mt: 5 }}>
      <Typography variant="h1" component="h2"> Register </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {serverErrors.length > 0 ? serverErrors.map((error) => {
          return (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )
        }) : null}
      </Box>
      <Box onSubmit={handleSubmit(RegisterForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField {...register('userName')} label="User Name" variant="standard" error={errors.userName} helperText={errors.userName?.message} />
        <TextField {...register('fullName')} label="Full Name" variant="standard" error={errors.fullName} helperText={errors.fullName?.message} />
        <TextField {...register('email')} label="Email" variant="standard" error={errors.email} helperText={errors.email?.message} />
        <TextField {...register('phoneNumber')} label="Phone Number" variant="standard" error={errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        <TextField {...register('password')} label="Password" variant="standard" error={errors.password} helperText={errors.password?.message} />
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={20} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  )
}
