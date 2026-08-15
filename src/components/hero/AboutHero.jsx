import { alpha, Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function AboutHero() {

  const { t } = useTranslation();

  return <>
    <Box sx={{
      bgcolor: (theme) => alpha(theme.palette.primary.light, 0.1),
      minHeight:'100dvh' ,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 2, sm: 0 },
    }}>
      <Container sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', maxWidth: { xs: '100%', md: 600 } }}>

          <Typography component="h1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, textAlign: 'center' }}>
            {t('About KaShop')}
          </Typography>

          <Typography variant="p" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' }, textAlign: 'center' }}>
            {t('We believe shopping should be more than a transaction. Our mission is to curate a collection that brings joy, quality, and effortless style to your everyday life through a seamless digital experience.')}
          </Typography>

        </Box>
      </Container>
    </Box>
  </>
}
