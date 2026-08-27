import { Alert, Box, Button, Card, CircularProgress, Container, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validation/RegisterSchema';
import { Link as routerLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(registerSchema) });
  const [successOpen, setSuccessOpen] = useState(false);


  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/register`, data);
      console.log(response);
      setServerErrors({});
      toast.success(t('Account_Created'));
      setTimeout(() => { navigate('/'); }, 3000);
    } catch (error) {
      const errorsList = error.response?.data?.errors || [];
      setServerErrors(errorsList);
      toast.error(errorsList[0] || "Registration failed. Please check your details.");
    }
  }


  return <>
    <Box component="section" sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2, py: 6 }}>
      <Container maxWidth="sm">

        <Card elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid', borderColor: 'divider' }}>

          <Stack spacing={0.5} sx={{ mb: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
              {t('Create Account')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {t('Join our community of mindful shoppers today.')}
            </Typography>
          </Stack>

          <Box onSubmit={handleSubmit(RegisterForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField {...register('userName')} type='text' label={t("User Name")} variant="outlined" fullWidth error={errors.userName} helperText={errors.userName?.message} />
            <TextField {...register('fullName')} type='text' label={t("Full Name")} variant="outlined" fullWidth error={errors.fullName} helperText={errors.fullName?.message} />
            <TextField {...register('email')} type='email' label={t("Email")} variant="outlined" fullWidth error={errors.email} helperText={errors.email?.message} />
            <TextField {...register('phoneNumber')} type='tel' label={t("Phone Number")} variant="outlined" fullWidth error={errors.phoneNumber} helperText={errors.phoneNumber?.message} />

            <TextField {...register('password')} label={t("Password")} type={showPassword ? 'text' : 'password'} variant="outlined" fullWidth error={errors.password} helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        aria-label={showPassword ? t('Hide_Password') : t('Show_Password')}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }} />

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} fullWidth
              sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1 }}>
              {isSubmitting ? <CircularProgress size={20} sx={{ color: 'primary.contrastText' }} /> : t('Sign_Up')}
            </Button>

            <Snackbar
              open={successOpen}
              autoHideDuration={4000}
              onClose={() => setSuccessOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert severity="success" onClose={() => setSuccessOpen(false)} sx={{ width: '100%' }}>
                {t('Account_Created')}
              </Alert>
            </Snackbar>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {serverErrors.length > 0 ? serverErrors.map((error) => {
                return (
                  <Alert variant="outlined" severity="error">
                    {error}
                  </Alert>
                )
              }) : null}

            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
            {t('Do_you_have_an_account')}{' '}
            <Typography component={routerLink} to="/login" variant="body2" sx={{ display: 'inline', color: 'secondary.main', textDecoration: 'none', fontWeight: 600 }}>
              {t('Sign_In')}
            </Typography>
          </Typography>

        </Card>
      </Container>
    </Box>

  </>
}
