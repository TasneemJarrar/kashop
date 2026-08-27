import { Box, Container, Typography, Stack, useTheme, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundImage: `${theme.palette.custom.hero.overlay}, url(${theme.palette.custom.hero.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      px: { xs: 2, sm: 0 },
      animation: 'heroFlow 18s ease-in-out infinite alternate',
      '@keyframes heroFlow': {
        from: { backgroundSize: '105%', backgroundPosition: 'center center' },
        to: { backgroundSize: '100%', backgroundPosition: '70% center' },
      }
    }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', maxWidth: { xs: '100%', md: 560 } }}>
          <Typography color="primary" variant="p" sx={{ fontWeight: 700, letterSpacing: 2, fontSize: { xs: 12, sm: 16, md: 18 } }}>
            {t('NEW COLLECTION 2026')}
          </Typography>

          <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' } }}>
            {t('Mindful Shopping for Modern Living')}
          </Typography>

          <Typography variant="p" color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
            {t(
              'Curated essentials that balance functionality with aesthetic pleasure. Designed for those who value quality over quantity.'
            )}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }}  sx={{ gap:2 ,mt: 1, width: { xs: '100%', sm: 'auto' }}}>
            <Button component={Link} to="/shop" variant="contained" color="primary" size="large" sx={{ borderRadius: 4 }} fullWidth={false}>
              {t('Shop Now')}
            </Button>
            <Button href="#featured" variant="outlined" color="inherit" size="large" sx={{ borderRadius: 4 }}>
              {t('Explore Products')}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}