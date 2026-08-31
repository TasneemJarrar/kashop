import { Alert, Box, Button, Card, CircularProgress, Container, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'motion/react';
import { sendCodeSchema, resetPasswordSchema } from '../../validation/ForgotPasswordSchema';
import { useNavigate, Link as routerLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';
import useSendCode from '../../hooks/useSendCode';
import useResetPassword from '../../hooks/useResetPassword';

const MotionCard = motion.create(Card);

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const { mutate: sendCode, isPending: isSendingCode } = useSendCode();
  const { mutate: resetPassword, isPending: isResettingPassword } = useResetPassword();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({ resolver: yupResolver(sendCodeSchema) });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const onSendCode = (data) => {
    setServerError('');
    sendCode(
      { email: data.email },
      {
        onSuccess: () => {
          setEmail(data.email);
          setStep(2);
          toast.success(t('Reset_Code_Sent'));
        },
        onError: (error) => {
          const message = error.response?.data?.message || t('Failed_To_Send_Code');
          setServerError(message);
          toast.error(message);
        },
      }
    );
  };

  const onResetPassword = (data) => {
    setServerError('');
    resetPassword(
      { email, code: data.code, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success(t('Password_Reset_Successfully'));
          navigate('/login');
        },
        onError: (error) => {
          const message = error.response?.data?.message || t('Password_Reset_Failed');
          setServerError(message);
          toast.error(message);
        },
      }
    );
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
          <Button
            component={routerLink}
            to="/login"
            startIcon={<ArrowBackIcon />}
            color="inherit"
            sx={{ textTransform: 'none', mb: 2, px: 0, '&:hover': { bgcolor: 'transparent', opacity: 0.75 } }}
          >
            {t('Back_To_Login')}
          </Button>

          {step === 1 ? (
            <>
              <Stack spacing={0.5} sx={{ mb: 3 }}>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                  {t('Forgot_Password_Title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('Forgot_Password_Subtitle')}
                </Typography>
              </Stack>

              <Box onSubmit={handleSubmitEmail(onSendCode)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.1 }}>
                  <TextField
                    {...registerEmail('email')}
                    type="email"
                    label={t('Email_Address')}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    error={!!emailErrors.email}
                    helperText={emailErrors.email?.message ? t(emailErrors.email.message) : ''}
                  />
                </motion.div>

                {serverError && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <Alert variant="outlined" severity="error">
                      {serverError}
                    </Alert>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSendingCode}
                    fullWidth
                    sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1 }}
                  >
                    {isSendingCode ? <CircularProgress size={20} sx={{ color: 'primary.contrastText' }} /> : t('Send_Reset_Code')}
                  </Button>
                </motion.div>
              </Box>
            </>
          ) : (
            <>
              <Stack spacing={0.5} sx={{ mb: 3 }}>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                  {t('Reset_Password_Title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('Reset_Password_Subtitle', { email })}
                </Typography>
              </Stack>

              <Box onSubmit={handleSubmitReset(onResetPassword)} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.1 }}>
                  <TextField
                    {...registerReset('code')}
                    label={t('Reset_Code')}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    error={!!resetErrors.code}
                    helperText={resetErrors.code?.message ? t(resetErrors.code.message) : ''}
                  />
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.16 }}>
                  <TextField
                    {...registerReset('newPassword')}
                    label={t('New_Password')}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={!!resetErrors.newPassword}
                    helperText={resetErrors.newPassword?.message ? t(resetErrors.newPassword.message) : ''}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" size="small" aria-label={showPassword ? t('Hide_Password') : t('Show_Password')}>
                              {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35, delay: 0.22 }}>
                  <TextField
                    {...registerReset('confirmNewPassword')}
                    label={t('Confirm_New_Password')}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={!!resetErrors.confirmNewPassword}
                    helperText={resetErrors.confirmNewPassword?.message ? t(resetErrors.confirmNewPassword.message) : ''}
                  />
                </motion.div>

                {serverError && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <Alert variant="outlined" severity="error">
                      {serverError}
                    </Alert>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isResettingPassword}
                    fullWidth
                    sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1 }}
                  >
                    {isResettingPassword ? <CircularProgress size={20} sx={{ color: 'primary.contrastText' }} /> : t('Reset_Password')}
                  </Button>
                </motion.div>

                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => setStep(1)}
                  sx={{ textTransform: 'none', fontWeight: 500, alignSelf: 'center' }}
                >
                  {t('Use_A_Different_Email')}
                </Button>
              </Box>
            </>
          )}
        </MotionCard>
      </Container>
    </Box>
  );
}
