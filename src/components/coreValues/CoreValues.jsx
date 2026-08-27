import { alpha, Box, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

const values = [
  {
    id: 1,
    icon: SpaOutlinedIcon,
    title: 'Made to last',
    description: 'We choose renewable materials and repairable designs over trends.',
  },
  {
    id: 2,
    icon: ExploreOutlinedIcon,
    title: 'Honest curation',
    description: "If it doesn't survive our own homes, it doesn't get listed.",
  },
  {
    id: 3,
    icon: HandshakeOutlinedIcon,
    title: 'Fair sourcing',
    description: 'Every supplier is audited for labour and material practices.',
  },
  {
    id: 4,
    icon: AutoAwesomeOutlinedIcon,
    title: 'Quiet design',
    description: 'Objects that recede into daily life instead of shouting.',
  },
]

export default function CoreValues() {
  const { t } = useTranslation()

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">

        <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, mb: { xs: 5, md: 7 } }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontSize: { xs: '0.75rem', md: '0.9rem' }, mb: 1.5, textAlign: { xs: 'center', md: 'left' } }}>
            {t('What We Stand For')}
          </Typography>

          <Typography variant="h2" sx={{ color: 'text.primary', fontSize: { xs: '2.3rem', sm: '3rem', md: '3.4rem' }, lineHeight: 1.05, textAlign: { xs: 'center', md: 'left' } }}>
            {t("Four rules we don't bend")}
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {values.map((value) => {
            const Icon = value.icon

            return (
              <Grid key={value.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ p: { xs: 3, md: 3.5 }, minHeight: { xs: 280, md: 325 }, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', transition: 'all 0.25s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: (theme) => `0 16px 35px ${alpha(theme.palette.common.black, 0.08)}` } }}>

                  <Box sx={{ width: 66, height: 66, borderRadius: '50%', bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14), color: 'secondary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 3, md: 4 } }}>
                    <Icon sx={{ fontSize: '2rem' }} />
                  </Box>

                  <Typography variant="h5" sx={{ color: 'text.primary', fontSize: { xs: '1.2rem', md: '1.35rem' }, fontWeight: 600, mb: 1.5 }}>
                    {t(value.title)}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.65 }}>
                    {t(value.description)}
                  </Typography>

                </Card>
              </Grid>
            )
          })}
        </Grid>

      </Container>
    </Box>
  )
}