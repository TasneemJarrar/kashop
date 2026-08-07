import { Box, CircularProgress, Container, Link, Stack, Typography } from '@mui/material';
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories();
  const { t } = useTranslation();
  const categories = data?.response?.data ?? [];
  const loopedCategories = [...categories, ...categories];

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography color="error">
      {error.message}
    </Typography>
  }

  return (
    <Box component="section" sx={{ pt:3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h2' sx={{mb:2, fontWeight: 700, fontSize: { xs: '1.5rem', sm: '1.7rem', md: '2rem' }}}>
            {t('Shop by Category')}
          </Typography>
          <Link component={RouterLink} to='/shop' color='secondary.main' sx={{ fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', gap: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 600 }}>
            {t('View All')}<EastIcon sx={{ fontSize: 18 }} />
          </Link>
        </Stack>
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={2500}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            600: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}>
          {loopedCategories.map((category, index) => (
            <SwiperSlide key={`${category.id}-${index}`}>
              <Box component={RouterLink} to={`/shop?category=${encodeURIComponent(category.name)}`}
                sx={{
                  textDecoration: 'none', color: "text.secondary", display: 'flex', alignItems: 'center', gap: 2, py: 2, transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: "secondary.main"
                  }
                }}>
                <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  {category.name}
                </Typography>

                <EastIcon sx={{ fontSize: "1rem" }} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  )
}
