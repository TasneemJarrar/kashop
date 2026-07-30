import { Box, Container, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next';


export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();

  return <Box sx={{
    backgroundImage: `url(${theme.palette.custom.hero.image})`,
    backgroundSize: "cover",
    backgroundPosition: "right",
    minHeight: "100dvh",
  }}>
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'left' }}>
        <Typography color='primary' variant='body' sx={{ fs: 'small' }}>{t('NEW COLLECTION 2026')}</Typography>
        <Typography color='primary'>{t('NEW COLLECTION 2024')}</Typography>
        <Typography color='primary'>{t('NEW COLLECTION 2024')}</Typography>
      </Box>

    </Container>
  </Box>
}
