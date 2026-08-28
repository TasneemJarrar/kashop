import { alpha, Box, Card, Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import elenaImg from '../../assets/team/elena.webp'
import marcusImg from '../../assets/team/marcus.webp'
import sarahImg from '../../assets/team/sarah.webp'
import davidImg from '../../assets/team/david.webp'

const team = [
  { id: 1, name: 'Elena Vance', role: 'Founder & CEO', image: elenaImg },
  { id: 2, name: 'Marcus Chen', role: 'Head of Design', image: marcusImg },
  { id: 3, name: 'Sarah Miller', role: 'Operations Director', image: sarahImg },
  { id: 4, name: 'David Ross', role: 'Lead Developer', image: davidImg },
]

export default function Team() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">

        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontSize: { xs: '0.75rem', md: '0.9rem' }, mb: 1.5, display: 'block' }}>
            {t('The Team')}
          </Typography>

          <Typography variant="h2" sx={{ color: 'text.primary', fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' }, lineHeight: 1.05 }}>
            {t('Four people, one catalogue')}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {team.map((member) => (
            <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ overflow: 'hidden', height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', transition: 'all 0.25s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: (theme) => `0 16px 35px ${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0.08 : 0.25)}` } }}>

                <Box sx={{ position: 'relative', height: { xs: 360, sm: 380, md: 410, lg: 425 }, width: '100%' }}>
                  <Box
                    component="img"
                    src={member.image}
                    alt={t(member.name)}
                    loading="lazy"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} />
                </Box>

                <Box sx={{ px: { xs: 2.5, md: 3 }, py: { xs: 2.5, md: 2.75 } }}>
                  <Typography variant="h5" sx={{ color: 'text.primary', fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 600, lineHeight: 1.2, mb: 1 }}>
                    {t(member.name)}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '0.95rem' }, lineHeight: 1.4 }}>
                    {t(member.role)}
                  </Typography>
                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  )
}