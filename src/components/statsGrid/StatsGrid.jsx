import { Box, Container, Grid, Card, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';

const stats = [
  { id: 1, icon: Inventory2RoundedIcon, value: '10k+', label: 'Products' },
  { id: 2, icon: GroupRoundedIcon, value: '50k+', label: 'Customers' },
  { id: 3, icon: VerifiedRoundedIcon, value: '100+', label: 'Brands' },
  { id: 4, icon: LocalShippingRoundedIcon, value: 'Fast', label: 'Delivery' },
];

export default function StatsGrid() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
                <Card
                  sx={{
                    p: 3, textAlign: 'center', boxShadow: 'none', border: '1px solid', borderColor: 'divider', transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: (theme) => theme.shadows[1],
                      transform: 'translateY(-2px)',
                    }
                  }}>
                  <Stack sx={{ alignItems: 'center', gap: 1 }}>
                    <Icon sx={{ fontSize: '2.25rem', color: 'primary.main' }} />
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: 'primary.main' }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                      {t(stat.label)}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}