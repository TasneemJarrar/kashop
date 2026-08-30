import { Alert, Box, Button, Snackbar, Card, CircularProgress, Container, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import { loginSchema } from '../../validation/LoginSchema';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate, Link as routerLink, useLocation } from 'react-router';
import authAxiosInstance from '../../api/authAxiosInstance';
import { useTranslation } from 'react-i18next';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import toast from 'react-hot-toast';

const MotionCard = motion.create(Card);

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const setToken = useAuthStore((state) => state.setToken);

  const [showPassword, setShowPassword] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const location = useLocation();
  const from = location.state?.from || '/';

  const LoginForm = async (data) => {
    try {
      const response = await authAxiosInstance.post(`/auth/Account/login`, data);

      setToken(response.data.accessToken);
      setServerError('');
      setSuccessOpen(true);

      toast.success(t('Logged_in_successfully'));

      setTimeout(() => navigate(from, { replace: true }));
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';

      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <Box component="section" sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2, py: 6 }}>
      <Container maxWidth="sm">
        <MotionCard
          elevation={0}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          sx={{ p: { xs: 3, sm: 4 }, border: '1px solid', borderColor: 'divider' }}
        >
          <Stack spacing={0.5} sx={{ mb: 3 }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
              {t('Welcome_Back')}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t('Enter_your_details_to_access_your_account')}
            </Typography>
          </Stack>

          <Box onSubmit={handleSubmit(LoginForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.12 }}>
              <TextField
                {...register('email')}
                type="email"
                label={t('Email_Address')}
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </motion.div>

            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.18 }}>
              <TextField
                {...register('password')}
                label={t('Password')}
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            size="small"
                            aria-label={showPassword ? t('Hide_Password') : t('Show_Password')}
                          >
                            {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                          </IconButton>
                        </motion.div>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.24 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
                <Typography
                  component={routerLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{ color: 'secondary.main', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s ease', '&:hover': { opacity: 0.75 } }}
                >
                  {t('Forgot_Password')}
                </Typography>
              </Box>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1 }}
              >
                {isSubmitting ? <CircularProgress size={20} sx={{ color: 'primary.contrastText' }} /> : t('Sign_In')}
              </Button>
            </motion.div>

            <Snackbar
              open={successOpen}
              autoHideDuration={4000}
              onClose={() => setSuccessOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert severity="success" onClose={() => setSuccessOpen(false)} sx={{ width: '100%' }}>
                {t('Logeed_in_successfully')}
              </Alert>
            </Snackbar>

            {serverError && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <Alert variant="outlined" severity="error">
                  {serverError}
                </Alert>
              </motion.div>
            )}
          </Box>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.38 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
              {t('Dont_have_an_account')}{' '}
              <Typography
                component={routerLink}
                to="/register"
                variant="body2"
                sx={{ display: 'inline', color: 'secondary.main', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.2s ease', '&:hover': { opacity: 0.75 } }}
              >
                {t('Sign_Up')}
              </Typography>
            </Typography>
          </motion.div>
        </MotionCard>
      </Container>
    </Box>
  );
}