import { Box, Container, Button, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'primary.main', borderRadius: 4, py: { xs: 5, md: 7 }, px: { xs: 3, md: 4 }, textAlign: 'center'}}>
          <Stack sx={{ alignItems: 'center', gap: 1.5, maxWidth: 480, mx: 'auto' }}>
            <Typography component="h2" sx={{fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, color: 'primary.contrastText'}}>
              {t('Ready to start shopping?')}
            </Typography>

            <Typography sx={{fontSize: { xs: '0.9rem', md: '1rem' },color: (theme) => theme.palette.getContrastText(theme.palette.primary.main), opacity: 0.9}}>
              {t('Experience the difference that quality and care can make in your daily routine.')}
            </Typography>

            <Button component={RouterLink} to="/shop" variant="contained"
              sx={{mt: 1.5, bgcolor: 'background.paper', color: 'primary.main', fontWeight: 700, textTransform: 'none', borderRadius: 999, px: 4, py: 1, transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.shadows[3],
                }}}>
              {t('Shop Now')}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}