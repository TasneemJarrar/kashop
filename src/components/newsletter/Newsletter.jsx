import { Box, Button, Container, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper', px: { xs: 4, md: 6 }, py: { xs: 4, md: 6 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }} sx={{ alignItems: { xs: 'stretch', md: 'center' } }}>
            <Box >
              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.7rem', md: '1.9rem' }, mb: 1 }}>
                {t('Join the KaShop Circle')}
              </Typography>

              <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '1rem', maxWidth: 340 }}>
                {t('Get early access to drops, exclusive offers, and mindful living inspiration delivered to your inbox.')}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Stack spacing={1.5}>
                <Box component="form" sx={{ display: 'flex', alignItems: 'center', border: `1px solid ${theme.palette.divider}`, borderRadius: 10, p: 0.7, gap: 1 }}>
                  <TextField fullWidth variant="standard"
                    placeholder={t('Your email address')}
                    slotProps={{ input: { disableUnderline: true } }}
                    sx={{
                      '& .MuiInputBase-root': {
                        px: 2
                      }
                    }}
                  />

                  <Button type="submit" variant="contained"
                    sx={{
                      minWidth: 88, borderRadius: 10, textTransform: 'none',
                      boxShadow: 'none', bgcolor: 'text.primary', color: 'background.paper',
                      '&:hover': {
                        bgcolor: 'text.primary',
                        opacity: 0.9,
                        boxShadow: 'none',
                      }
                    }}>
                    {t('Join')}
                  </Button>
                </Box>

                <Typography
                  sx={{ fontSize: '0.7rem', color: 'text.secondary', px: 2.5 }}>
                  {t('By subscribing, you agree to our Privacy Policy and Terms of Service.')}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}