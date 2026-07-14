import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validation/LoginSchema';

export default function Login() {
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(loginSchema) });

  const LoginForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/login`, data);
      console.log(response.data.accessToken);
      localStorage.setItem('accessToken', response.data.accessToken);
      setServerError("");
    } catch (error) {
      setServerError(error.response.data.message);
    }
  }

  return (
    <Box component="section" sx={{ mt: 5 }}>
      <Typography variant="h1" component="h2"> Login </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {serverError && (
          <Typography variant="body2" color="error">
            {serverError}
          </Typography>
        )}
      </Box>
      <Box onSubmit={handleSubmit(LoginForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField {...register('email')} label="Email" variant="standard" error={errors.email} helperText={errors.email?.message} />
        <TextField {...register('password')} label="Password" variant="standard" error={errors.password} helperText={errors.password?.message} />
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={20} /> : 'Login'}
        </Button>
      </Box>
    </Box>
  )
}
