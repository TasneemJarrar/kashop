import useProducts from '../../hooks/useProducts';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, FormGroup, Grid, Radio, Rating, Slider, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import 'swiper/css';
import 'swiper/css/navigation';
import useAddToCart from '../../hooks/useAddToCart';
import useAuthStore from '../../store/useAuthStore';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UseCategories from '../../hooks/useCategories';
import { Select, MenuItem, InputLabel } from '@mui/material';

function sliderValuetext(sliderValue) {
  return `$${sliderValue}`;
}

const minDistance = 50;


export default function Shop() {


  const [sortBy, setSortBy] = useState('price');
  const [ascending, setAscending] = useState('true');

  const { data, isLoading, isError, error } = useProducts({ sortBy, ascending });
  const products = data?.response?.data ?? [];
  const ProductsCount = data?.response?.totalCount;
  const { data: categories, isLoading: categoriesLoading, isError: categoriesIsError, error: categoriesError } = UseCategories();

  const { t } = useTranslation();
  const theme = useTheme();
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


  const [sliderVal, setSliderVal] = useState([10, 2000]);
  const handleSliderChange = (event, newsliderValue, activeThumb) => {
    if (activeThumb === 0) {
      setSliderVal([Math.min(newsliderValue[0], sliderVal[1] - minDistance), sliderVal[1]]);
    } else {
      setSliderVal([sliderVal[0], Math.max(newsliderValue[1], sliderVal[0] + minDistance)]);
    }
  };

  const [ratingVal, setRatingVal] = useState(2);
  const [selectedValue, setSelectedValue] = useState('a');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const sortOptions = [
    { value: 'price_true', label: t('Price: Low to High') },
    { value: 'price_false', label: t('Price: High to Low') },
    { value: 'name_true', label: t('Name: A to Z') },
    { value: 'name_false', label: t('Name: Z to A') },
    { value: 'rate_true', label: t('Rating: Low to High') },
    { value: 'rate_false', label: t('Rating: High to Low') },
  ];

  const handleSortChnage = (e) => {
    const [newSortBy, newAscending] = e.target.value.split('_');
    setSortBy(newSortBy);
    setAscending(newAscending);
  }

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
    <Box component="section" sx={{ py: 3, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 4 }}>
              <Stack sx={{ gap: 4 }}>
                <Typography variant='h4' sx={{ textTransform: 'capitalize', fontWeight: 600, color: 'text.primary' }}>{t('filters')}</Typography>
                <Stack>
                  <Typography variant='p' sx={{ textTransform: 'uppercase', color: 'secondary.main' }}>{t('category')}</Typography>
                  <FormControl>
                    <FormGroup>
                      {categories?.response?.data?.map((category) => (
                        <FormControlLabel key={category.id} control={<Checkbox color='secondary' />} label={category.name} />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Stack>

                <Stack spacing={2}>
                  <Typography variant='p' sx={{ textTransform: 'uppercase', color: 'secondary.main' }}>{t('price range')}</Typography>
                  <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <Typography variant='span' sx={{ fontSize: '0.8rem' }}> $10</Typography>
                    <Box sx={{ width: 300 }}>
                      <Slider
                        color='secondary'
                        size="small"
                        getAriaLabel={() => 'Minimum distance'}
                        value={sliderVal}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={sliderValuetext}
                        disableSwap
                        min={10}
                        max={2000}
                        step={10}
                      />
                    </Box>
                    <Typography variant='span' sx={{ fontSize: '0.8rem' }}> $2000</Typography>
                  </Stack>
                </Stack>

                <Stack spacing={2}>
                  <Typography variant='p' sx={{ textTransform: 'uppercase', color: 'secondary.main' }}>{t('rating')}</Typography>
                  <FormControlLabel
                    value="rating"
                    control={
                      <Radio
                        color='secondary'
                        size="small"
                        checked={selectedValue === 'rating'}
                        onClick={handleChange}
                        value="rating"
                        name="radio-buttons"
                        slotProps={{ input: { 'aria-label': 'rating' } }}
                      />
                    }
                    label={
                      <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                        <Rating
                          name="simple-controlled"
                          value={ratingVal}
                          onChange={(event, newValue) => {
                            setRatingVal(newValue);
                          }}
                        />
                        <Typography variant='span'> & Up</Typography>
                      </Stack>
                    }
                    sx={{ ml: 0 }}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: '1.7rem', lg: '2rem' } }}>
                {ProductsCount}  {t('Results')}
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth color='secondary'>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={`${sortBy}_${ascending}`}
                    label={t('sortBy')}
                    onChange={handleSortChnage}>
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{t(option.label)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', px: 3, flexGrow: 1, }}>
                      <Stack sx={{ gap: 3 }}>
                        <Typography component={RouterLink} to={`/product/${product.id}`} sx={{
                          textDecoration: 'none', color: 'text.primary', fontWeight: 600, fontSize: '0.9rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {product.name}
                        </Typography>
                        <Typography sx={{ fontWeight: 800, mt: 0.5 }}>
                          {formatPrice(product.price)}
                        </Typography>
                      </Stack>

                      <Stack sx={{ gap: 3, alignItems: 'flex-end' }}>
                        <Stack direction="row" spacing={0.75} sx={{ mr: 1, alignItems: "center" }}>
                          <StarRoundedIcon sx={{ color: 'warning.light', fontSize: '0.9rem' }} />
                          <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.9rem', color: theme.palette.text.primary }}>
                            {product.rate}
                          </Typography>
                        </Stack>

                        <Button variant='contained' onClick={() => handleAddToCart(product)} sx={{
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            bgcolor: 'secondary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[2],
                          },
                        }}><AddShoppingCartRoundedIcon sx={{ fontSize: '2rem' }} /></Button>

                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
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