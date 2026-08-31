import { Alert, Box, Button, Card, CircularProgress, Container, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validation/RegisterSchema';
import { Link as routerLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

const MotionCard = motion.create(Card);

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: yupResolver(registerSchema) });

  const RegisterForm = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/register`, data);

      setServerErrors([]);
      setSuccessOpen(true);

      toast.success(t('Account_Created'));

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      const errorsList = error.response?.data?.errors || [];

      setServerErrors(errorsList);

      toast.error(errorsList[0] || 'Registration failed. Please check your details.');
    }
  };

  const inputFields = [
    { name: 'userName', type: 'text', label: t('User Name'), error: errors.userName },
    { name: 'fullName', type: 'text', label: t('Full Name'), error: errors.fullName },
    { name: 'email', type: 'email', label: t('Email'), error: errors.email },
    { name: 'phoneNumber', type: 'tel', label: t('Phone Number'), error: errors.phoneNumber },
  ];

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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Stack spacing={0.5} sx={{ mb: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                {t('Create Account')}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {t('Join our community of mindful shoppers today.')}
              </Typography>
            </Stack>
          </motion.div>

          <Box onSubmit={handleSubmit(RegisterForm)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {inputFields.map((field, index) => (
              <motion.div
                key={field.name}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.35, delay: 0.14 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <TextField
                  {...register(field.name)}
                  type={field.type}
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  error={!!field.error}
                  helperText={field.error?.message}
                />
              </motion.div>
            ))}

            <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}>
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
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: 2 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
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

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.44 }} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1 }}
              >
                {isSubmitting ? <CircularProgress size={20} sx={{ color: 'primary.contrastText' }} /> : t('Sign_Up')}
              </Button>
            </motion.div>

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
              <AnimatePresence>
                {serverErrors.length > 0 &&
                  serverErrors.map((error, index) => (
                    <motion.div
                      key={`${error}-${index}`}
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Alert variant="outlined" severity="error">
                        {error}
                      </Alert>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </Box>
          </Box>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.52 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
              {t('Do_you_have_an_account')}{' '}
              <motion.span whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                <Typography
                  component={routerLink}
                  to="/login"
                  variant="body2"
                  sx={{ display: 'inline', color: 'secondary.main', textDecoration: 'none', fontWeight: 600 }}>
                  {t('Sign_In')}
                </Typography>
              </motion.span>
            </Typography>
          </motion.div>
        </MotionCard>
      </Container>
    </Box>
  );
}