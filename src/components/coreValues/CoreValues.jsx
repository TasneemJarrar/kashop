import { Box, Container, Grid, Card, Typography, Stack, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HighQualityRoundedIcon from '@mui/icons-material/HighQualityRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';

const values = [
  {
    id: 1,
    icon: HighQualityRoundedIcon,
    title: 'Uncompromising Quality',
    description: 'We source only the finest materials and partner with brands that share our obsession with craftsmanship and longevity.',
  },
  {
    id: 2,
    icon: HandshakeRoundedIcon,
    title: 'Built on Trust',
    description: 'Transparency is our foundation. From clear pricing to honest reviews, we strive to earn your confidence in every interaction.',
  },
  {
    id: 3,
    icon: VolunteerActivismRoundedIcon,
    title: 'Customer First',
    description: 'Your satisfaction is our primary metric. Our support team is empowered to go above and beyond to make things right.',
  },
];

export default function CoreValues() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack sx={{ alignItems: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: {xs:1 ,md:3}, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} >  {t('Our Core Values')}</Typography>
          <Box sx={{ width: 56, height: 4, borderRadius: 1, bgcolor: 'primary.main', mt:1 }} />
        </Stack>

        <Grid container spacing={3}>
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Grid key={value.id} size={{ xs: 12, md: 4 }}>
                <Card sx={{
                  p: 3.5, height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider', transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: (theme) => theme.shadows[1],
                  }
                }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                    <Icon sx={{ fontSize: '1.6rem', color: 'primary.main' }} />
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 1.5 }}>
                    {t(value.title)}
                  </Typography>

                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.7 }}>
                    {t(value.description)}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}