import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validation/LoginSchema';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router';
import authAxiosInstance from '../../api/authAxiosInstance';

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(loginSchema) });
  const setToken = useAuthStore((state) => state.setToken);

  const LoginForm = async (data) => {
    try {
      const response = await authAxiosInstance.post(`/auth/Account/login`, data);
      setToken(response.data.accessToken);
      setServerError("");
      navigate('/');
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
