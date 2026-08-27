import useProducts from '../../hooks/useProducts';
import { alpha, Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import 'swiper/css';
import 'swiper/css/navigation';
import useAddToCart from '../../hooks/useAddToCart';
import useAuthStore from '../../store/useAuthStore';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  const { t } = useTranslation();
  const theme = useTheme();
  const products = data?.response?.data ?? [];

  const navigate = useNavigate();

  const { token } = useAuthStore();
  const isAuthenticated = !!token;

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const { mutate: addToCart } = useAddToCart({
    onError: (err) => {
      if (err?.response?.status === 401) {
        setLoginModalOpen(true);
      }
    },
  });


  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    addToCart({ productId: product.id, count: 1 });
  };


  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return <>
    <Box component="section" sx={{ py: 3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{mb:3}}>
          <Typography
            sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 0.5, textTransform:'uppercase' }}>
            {t('Handpicked')}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' } }}>
            {t("This season's favourites")}
          </Typography>

        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3 }}>

              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[1],
                  transform: 'scale(1.02)',
                },
              }}>
                <Box component={RouterLink} to={`/product/${product.id}`} sx={{ textDecoration: 'none' }}>
                  <CardMedia component="img" image={product.image} alt={product.name} loading="lazy"
                    sx={{
                      width: '100%', aspectRatio: '1 / 1', objectFit: 'contain',

                    }} />
                </Box>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1.5, md: 3 } }}>
                  <Stack sx={{ gap: 1 }}>
                    <Typography component={RouterLink} to={`/product/${product.id}`} sx={{
                      textDecoration: 'none', color: 'text.primary', fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' },
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {product.name}
                    </Typography>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                      <StarRoundedIcon sx={{ color: 'warning.light', fontSize: { xs: '0.8rem', md: '0.9rem' } }} />
                      <Typography component="span" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' }, color: theme.palette.text.primary }}>
                        {product.rate}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '0.8rem', md: '0.9rem' }, mt: 0.5 }}>
                      {formatPrice(product.price)}
                    </Typography>
                  </Stack>

                  <Stack sx={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>

                    <IconButton
                      color='secondary'
                      size='small'
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        width: { xs: 36, md: 44 },
                        height: { xs: 36, md: 44 },
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
                        color: (theme) => theme.palette.secondary.contrastText,
                        boxShadow: (theme) =>
                          `0 6px 14px ${alpha(theme.palette.secondary.main, 0.45)}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                          transform: 'translateY(-2px)',
                          boxShadow: (theme) =>
                            `0 8px 18px ${alpha(theme.palette.secondary.main, 0.55)}`,
                        }
                      }}>
                      <AddIcon sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }} />
                    </IconButton>

                  </Stack>
                </CardContent>
              </Card>
            </Grid>

          ))}
        </Grid>


      </Container >
    </Box >

    <Dialog open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
      <DialogTitle>{t('Login required')}</DialogTitle>
      <DialogContent>
        {t('You need to be logged in to add items to your cart.')}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setLoginModalOpen(false)}>{t('Cancel')}</Button>
        <Button variant="contained" onClick={() => navigate('/login', { state: { from: location.pathname } })}>
          {t('Go to Login')}
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

