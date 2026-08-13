import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useTranslation } from 'react-i18next';

export default function BenefitsBar() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: LocalShippingOutlinedIcon,
      title: 'Free Express Shipping',
      desc: 'On orders over $150. Limited time offer.',
    },
    {
      icon: VerifiedOutlinedIcon,
      title: 'Lifetime Warranty',
      desc: 'We stand by the quality of our curated items.',
    },
    {
      icon: CurrencyExchangeOutlinedIcon,
      title: '24/7 Expert Support',
      desc: 'Our mindful team is always here for you.',
    },
  ];

  return (
    <Box component="section" sx={{ bgcolor: 'primary.main', color:'primary.contrastText', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {benefits.map(({ icon: Icon, title, desc }) => (
            <Grid size={4} sx={{ gap: 3 }}>
              <Stack key={title} direction={{ xs: 'column', md: 'row' }} sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 2, md: 3 }, px: { xs: 2, md: 0 }, py: { xs: 2, md: 0 } }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, textAlign: { xs: 'center', md: 'start' } }}>
                    {t(title)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', opacity: 0.75, display: { xs: 'none', md: 'inline' } }}>
                    {t(desc)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
      </Grid>
    </Container>
    </Box >
  );
}