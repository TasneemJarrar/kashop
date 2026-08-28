import { alpha, Alert, Box, Container, Link, Skeleton, Stack, Typography } from '@mui/material';
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import EastIcon from '@mui/icons-material/East';

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories();
  const { t } = useTranslation();
  const categories = data?.response?.data ?? [];

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
          <Box>
            <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 0.5 }}>
              {t('BROWSE')}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' } }}>
              {t('Shop by Category')}
            </Typography>
          </Box>

          <Link
            component={RouterLink}
            to="/shop"
            color="primary.main"
            sx={{ fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', gap: 1, alignItems: 'center', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
            {t('View All')}
            <EastIcon sx={{ fontSize: 18 }} />
          </Link>
        </Stack>

        {isError && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error?.message || t('Failed_To_Load_Categories') }
          </Alert>
        )}

        {isLoading && (
          <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
            {[1, 2, 3, 4, 5].map((key) => (
              <Skeleton
                key={key}
                variant="rounded"
                sx={{ flex: '0 0 auto', width: { xs: 180, sm: 200, md: 220 }, height: 80, borderRadius: (theme) => `${theme.shape.borderRadius}px` }}/>
            ))}
          </Stack>
        )}

        {!isLoading && !isError && (
          <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
            {categories.map((category) => (
              <Box
                key={category.id}
                component={RouterLink}
                to="/shop"
                className="category-card"
                sx={{ position: 'relative', overflow: 'hidden', flex: '0 0 auto', width: { xs: 180, sm: 200, md: 220 }, p: 3, borderRadius: (theme) => `${theme.shape.borderRadius}px`, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', textDecoration: 'none', display: 'block', transition: 'all 0.3s ease-in-out', '&:hover': { borderColor: 'secondary.main', '& .category-card-glow': { opacity: 1 } } }}>
                <Box
                  className="category-card-glow"
                  sx={{ position: 'absolute', top: -24, right: -24, width: 90, height: 90, borderRadius: '50%', bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.25), opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600, position: 'relative', zIndex: 1, fontSize: '1.1rem', mb: 0.5, color: 'text.primary' }}>
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}