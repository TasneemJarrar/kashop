import { Box, Card, CircularProgress, Divider, Stack, Typography, Alert } from "@mui/material";
import useProfile from "../../hooks/useProfile";
import { useTranslation } from "react-i18next";

export default function ProfileInfo() {
  const { t } = useTranslation();
  const { data: profile, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error?.response?.data?.message || t('Could_not_load_profile')}
      </Alert>
    );
  }

  const fields = [
    { label: t('User_Name'), value: profile?.userName },
    { label: t('Full_Name'), value: profile?.fullName },
    { label: t('Email'), value: profile?.email },
    { label: t('Phone_Number'), value: profile?.phoneNumber },
  ];

  return (
    <Card elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid', borderColor: 'divider', mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {t('Profile_Information')}
      </Typography>

      <Stack divider={<Divider flexItem />} spacing={2}>
        {fields.map((field) => (
          <Box key={field.label} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {field.label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {field.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}