import useProducts from '../../hooks/useProducts';
import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  const { t } = useTranslation();
  const theme = useTheme();
  const products = data?.response?.data ?? [];
  console.log(data)


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

  return <Box component="section" sx={{ pt: 3, backgroundColor: theme.palette.background.default }}>
    <Container maxWidth="lg">
      <Stack sx={{ py: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '1.7rem', md: '2rem' } }}>
          {t('Featured Products')}
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem', }}>
          {t("Our community's most-loved essentials this month.")}
        </Typography>
      </Stack>

      <Box sx={{
          '& .swiper-button-next, & .swiper-button-prev': {
          width: 36,
          height: 36,
          p: 1,
          borderRadius: '50%',
          color: theme.palette.text.primary,

          '&::after': {
            fontSize: '1rem',
            fontWeight: 800,
          },
          '&:hover': {
            bgcolor: theme.palette.action.hover,
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
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card component={RouterLink} to={`/product/${product.id}`} sx={{
                textDecoration: 'none',
                bgcolor: 'transparent',
                boxShadow: 'none',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[1],
                  transform: 'scale(1.08)',
                },
              }}>
                <CardMedia component="img" image={product.image} alt={product.name}
                  sx={{
                    width: '100%', aspectRatio: '1 / 1', borderRadius: 2, objectFit: 'contain',
                    backgroundColor: theme.palette.background.paper
                  }} />
                <CardContent>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, mt: 0.5 }}>
                    {formatPrice(product.price)}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

    </Container>
  </Box>
}

