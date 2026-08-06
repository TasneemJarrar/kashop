import { Box, Button, CircularProgress, Container, Link, Stack, Typography, useTheme } from '@mui/material';
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import EastIcon from '@mui/icons-material/East';

export default function Categories() {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useCategories();
  const { t } = useTranslation();

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography color="error">
      {error.message}
    </Typography>
  }

  return (
    <Box component="section" sx={{ pt: 2, minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Stack direction='row' sx={{ justifyContent:'space-between', alignItems:'center', py: 3}}>
          <Typography variant='h2' sx={{ mb: 0, fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' } }}>
            {t('Shop by Category')}
          </Typography>
          <Link component={RouterLink} to='/shop' color='secondary.main' sx={{ fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', gap: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 600 }}>
            {t('View All')}<EastIcon sx={{ fontSize: 18 }} />
          </Link>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', md: 'repeat(5, minmax(0, 1fr))' }, gap: 1.5 }}>
          {data?.response?.data?.map((category) => (
            <Button
              key={category.id}
              variant='outlined'
              component={RouterLink}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              sx={{p:1 ,textTransform: 'none', justifyContent: 'center', alignItems: 'center', borderRadius: 2,
                borderColor: theme.palette.divider, color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[1],
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.action.hover}}}>
              <Typography variant='subtitle2' sx={{ fontWeight: 700, color: theme.palette.text.primary, textAlign: 'center' }}>
                {category.name}
              </Typography>
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
