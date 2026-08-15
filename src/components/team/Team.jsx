import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import elenaImg from '../../assets/team/elena.webp';
import marcusImg from '../../assets/team/marcus.webp';
import sarahImg from '../../assets/team/sarah.webp';
import davidImg from '../../assets/team/david.webp';

const team = [
  { id: 1, name: 'Elena Vance', role: 'Founder & CEO', image: elenaImg },
  { id: 2, name: 'Marcus Chen', role: 'Head of Design', image: marcusImg },
  { id: 3, name: 'Sarah Miller', role: 'Operations Director', image: sarahImg },
  { id: 4, name: 'David Ross', role: 'Lead Developer', image: davidImg },
];

export default function Team() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack sx={{ mb: { xs: 4, md: 5 }, gap: 0.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} >{t('Meet Our Team')}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
            {t('The passionate minds behind your shopping experience.')}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid key={member.id} size={{ xs: 4, md: 3 }}>
              <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: 1.5 }}>
                <Box component="img"
                  src={member.image}
                  alt={t(member.name)}
                  sx={{ width: { xs: 120, md: 160 }, height: { xs: 120, md: 160 }, borderRadius: '50%', objectFit: 'cover', border: '4px solid', borderColor: 'background.paper', boxShadow: (theme) => theme.shadows[2] }} />

                <Stack sx={{ gap: 0.25 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                    {t(member.name)}
                  </Typography>
                  <Typography sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.85rem' }}>
                    {t(member.role)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}