import { Box, Container, Grid, Card, Typography, Stack, Avatar } from '@mui/material';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const testimonials = [
  {
    id: 1,
    textKey: 'TESTIMONIAL_T1',
    nameKey: 'TESTIMONIAL_N1',
    rating: 5,
  },
  {
    id: 2,
    textKey: 'TESTIMONIAL_T2',
    nameKey: 'TESTIMONIAL_N2',
    rating: 5,
  },
  {
    id: 3,
    textKey: 'TESTIMONIAL_T3',
    nameKey: 'TESTIMONIAL_N3',
    rating: 5,
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 0.5, textTransform: 'uppercase' }}>
            {t('Testimonials')}          
            </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' } }}>
            {t('What Our Community Says')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid key={testimonial.id} size={{ xs: 12, md: 4 }}>
              <Card sx={{
                height: '100%', p: 4, position: 'relative', transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[3],
                  transform: 'translateY(-4px)',
                }
              }}>
                <FormatQuoteRoundedIcon sx={{ fontSize: '2.5rem', color: 'secondary.main', opacity: 0.3, mb: 1 }} />

                <Stack direction="row" spacing={0.25} sx={{ mb: 2 }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarRoundedIcon key={i} sx={{ color: 'warning.light', fontSize: '1.1rem' }} />
                  ))}
                </Stack>

                <Typography
                  sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7, mb: 3, minHeight: { md: 100 } }}>
                  "{t(testimonial.textKey)}"
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Avatar
                    sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', width: 36, height: 36, fontSize: '0.9rem', fontWeight: 700 }}>
                    {t(testimonial.nameKey).charAt(0)}
                  </Avatar>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {t(testimonial.nameKey)}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
