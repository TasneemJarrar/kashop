import { alpha, Box, Button, Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function AboutHero() {
  const { t } = useTranslation()

  return (
    <Box component="section" sx={{ minHeight: '100dvh', bgcolor: (theme) => alpha(theme.palette.background.paper, 0.45), display: 'flex', alignItems: 'center', px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8, lg: 10 }} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>

              <Typography variant="overline" 
            sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.9rem', letterSpacing: 2, mb: 0.5, textTransform:'uppercase' }}>
                {t('Our Story')}
              </Typography>

              <Typography variant="h1" sx={{ color: 'text.primary', fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, lineHeight: 0.98, mb: { xs: 4, md: 5 }, textAlign: { xs: 'center', md: 'left' } }}>
                {t('Fewer things,')}{' '}
                <Box component="span" sx={{ color: 'secondary.main', fontStyle: 'italic', fontWeight: 500 }}>
                  {t('chosen')} {t('better')}
                </Box>
              </Typography>

              <Box sx={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.85, textAlign: { xs: 'center', md: 'left' } }}>
                  {t('Kashop started in a two-room studio with a simple frustration: buying good everyday objects took hours of research. So we did the research once, properly, and built a shop around the results.')}
                </Typography>

                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.85, textAlign: { xs: 'center', md: 'left' } }}>
                  {t("Today a team of four tests every product in real homes before it reaches this catalogue — and we still answer support emails ourselves.")}
                </Typography>
              </Box>

              <Button component={Link} to="/" variant="contained" color="secondary" size="large" sx={{ px: 5, py: 1.6, fontSize: '1rem', minWidth: 250, '&:hover': { transform: 'translateY(-2px)', boxShadow: (theme) => `0 12px 30px ${alpha(theme.palette.secondary.main, 0.25)}` }, transition: 'all 0.25s ease' }}>
                {t('Browse the catalogue')}
              </Button>

            </Box>
          </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ width: '100%', height: { xs: 350, sm: 450, md: 500, lg: 575 }, borderRadius: { xs: 4, md: 5 }, overflow: 'hidden', boxShadow: (theme) => `0 25px 60px ${alpha(theme.palette.common.black, 0.12)}` }}>
              <Box component="img" src="./src/assets/about/about hero.webp" alt={t('About hero image')} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}