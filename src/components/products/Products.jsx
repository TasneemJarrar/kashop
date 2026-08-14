import useProducts from '../../hooks/useProducts';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
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
        <Stack sx={{ pt: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}>
            {t('Featured Products')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', }}>
            {t("Our community's most-loved essentials this month.")}
          </Typography>
        </Stack>

        <Box sx={{
          '& .my-swiper': {
            px: 4,
            py: 5,
          },
          '& .swiper-button-next, & .swiper-button-prev': {
            width: 36,
            height: 36,
            p: 1,
            borderRadius: '50%',
            color: 'text.primary',

            '&::after': {
              fontSize: '1rem',
              fontWeight: 800,
            },
            '&:hover': {
              bgcolor: 'action.hover',
              transform: 'scale(1.08)',
              transition: 'all 0.3s ease-in-out'
            },
          },

          '& .swiper-button-prev': {
            left: 4,
          },

          '& .swiper-button-next': {
            right: 4,
          }
        }}>
          <Swiper
            className="my-swiper"
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,  
              }
            }}>
            {products.map((product) => (
              <SwiperSlide key={product.id}>
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

                      <Button variant='text' color='primary' size='small' onClick={() => handleAddToCart(product)} sx={{
                        transition: 'all 0.2s ease',
                        px: { xs: 1, md: 2 },
                        minWidth: { xs: 'fit-content' },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}><AddShoppingCartRoundedIcon sx={{ fontSize: { xs: '1.1rem', md: '2rem' } }} /></Button>

                    </Stack>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

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

