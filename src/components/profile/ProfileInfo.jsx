import { useState } from "react";
import { Alert, Box, Card, Divider, IconButton, Skeleton, Stack, TextField, Typography, Menu, MenuItem, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useProfile from "../../hooks/useProfile";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { profileSchema } from "../../validation/ProfileSchema";
import { useTranslation } from "react-i18next";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import useThemeStore from "../../hooks/useThemeStore";
import toast from "react-hot-toast";

function InfoIcon({ children }) {
  return (
    <Box sx={{ width: 40, height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.16), color: 'primary.main' }}>
      {children}
    </Box>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <InfoIcon>{icon}</InfoIcon>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.4, letterSpacing: '0.08em' }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
          {value || ''}
        </Typography>
      </Box>
    </Box>
  );
}

function PreferenceCard({ icon, title, value, onClick }) {
  return (
    <Box onClick={onClick} sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', cursor: 'pointer', transition: 'all 0.2s ease-in-out', '&:hover': { bgcolor: 'action.hover', borderColor: 'text.disabled' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <InfoIcon>{icon}</InfoIcon>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {value}
          </Typography>
        </Box>
      </Box>
      <ChevronRightRoundedIcon color="action" fontSize="small" />
    </Box>
  );
}

function EditableEmailRow({ email }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(profileSchema), defaultValues: { email } });

  const handleStartEdit = () => {
    reset({ email });
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset({ email });
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      toast.success(t('Profile_Updated') || 'Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || t('Failed_To_Update') || 'Failed to update email');
    }
  };

  if (isEditing) {
    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <InfoIcon><MailOutlineRoundedIcon fontSize="small" /></InfoIcon>
        <TextField {...register('email')} type="email" label={t('Email')} size="small" autoFocus fullWidth error={!!errors.email} helperText={errors.email?.message} sx={{ maxWidth: 320 }} />
        <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
          <IconButton type="submit" size="small" color="primary" disabled={isPending} aria-label={t('save')}>
            <CheckRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleCancel} size="small" disabled={isPending} aria-label={t('Cancel')}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <InfoRow icon={<MailOutlineRoundedIcon fontSize="small" />} label={t('Email')} value={email} />
      <IconButton onClick={handleStartEdit} size="small" aria-label={t('Edit_Profile')}>
        <EditRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function ProfileInfo() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { data: profile, isLoading, isError, error } = useProfile();
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);
  const { mode, toggleMode, setMode } = useThemeStore();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLangAnchorEl(null);
  };

  const handleThemeChange = (selectedMode) => {
    if (setMode) {
      setMode(selectedMode);
    } else if (mode !== selectedMode) {
      toggleMode();
    }
    setThemeAnchorEl(null);
  };

  if (isLoading) {
    return (
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height={104} animation="wave" />
        <Box sx={{ px: { xs: 3, sm: 4 }, pb: 4 }}>
          <Skeleton variant="circular" width={88} height={88} sx={{ mt: '-44px', border: '4px solid', borderColor: 'background.paper' }} />
          <Skeleton variant="text" width={160} height={36} sx={{ mt: 1 }} />
          <Skeleton variant="text" width={100} />
          <Stack spacing={2.5} sx={{ mt: 3 }}>
            <Skeleton variant="rounded" height={40} />
            <Skeleton variant="rounded" height={40} />
          </Stack>
        </Box>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error?.response?.data?.message || t('Could_not_load_profile')}
      </Alert>
    );
  }

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
      <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 4 } }}>
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700 }}>
            {t('Account_Details')}
          </Typography>
          <Divider />

          <Stack spacing={2.5}>
            <InfoRow icon={<BadgeIcon fontSize="small" />} label={t('Full Name')} value={profile?.fullName} />
            <EditableEmailRow email={profile?.email} />
            <InfoRow icon={<LocalPhoneOutlinedIcon fontSize="small" />} label={t('Phone_Number')} value={profile?.phoneNumber} />
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700 }}>
            {t('Preferences')}
          </Typography>
          <Divider />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <PreferenceCard icon={<LanguageRoundedIcon fontSize="small" />} title={t('Language')} value={i18n.language === 'ar' ? 'العربية' : 'English (US)'} onClick={(e) => setLangAnchorEl(e.currentTarget)} />
            <PreferenceCard icon={<DarkModeOutlinedIcon fontSize="small" />} title={t('Theme')} value={(mode || theme.palette.mode) === 'dark' ? t('Dark') : t('Light')} onClick={(e) => setThemeAnchorEl(e.currentTarget)} />
          </Stack>

          <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={() => setLangAnchorEl(null)}>
            <MenuItem onClick={() => handleLanguageChange('en')}>English (US)</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('ar')}>العربية</MenuItem>
          </Menu>

          <Menu anchorEl={themeAnchorEl} open={Boolean(themeAnchorEl)} onClose={() => setThemeAnchorEl(null)}>
            <MenuItem onClick={() => handleThemeChange('light')}>{t('Light')}</MenuItem>
            <MenuItem onClick={() => handleThemeChange('dark')}>{t('Dark')}</MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Card>
  );
}