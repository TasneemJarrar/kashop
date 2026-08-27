import useProducts from '../../hooks/useProducts';
import { alpha, Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Drawer, FormControl, Grid, IconButton, Menu, Stack, Tooltip, Typography, useTheme } from '@mui/material';
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
import { Select, MenuItem, InputLabel } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import useProductsByCategory from '../../hooks/useProductsByCategory';
import FiltersPanel from '../../components/filtersPanel/FiltersPanel';
import UseCategories from '../../hooks/useCategories';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';


export default function Shop() {

  const [sortBy, setSortBy] = useState('price');
  const [ascending, setAscending] = useState('true');
  const [appliedFilters, setAppliedFilters] = useState({
    categoryIds: [],
    priceRange: [10, 500],
    ratingSelected: false,
    ratingVal: 2,
  });

  const { data: allProductsData, isLoading: allLoading, isError, error } = useProducts({ sortBy, ascending });
  const ProductsCount = allProductsData?.response?.totalCount;

  const { data: categories } = UseCategories();
  const { data: categoryProductsData, isLoading: categoryLoading } = useProductsByCategory({ categoryId: appliedFilters.categoryId });
  const isFilteringByCategory = !!appliedFilters.categoryId;
  const data = isFilteringByCategory ? categoryProductsData : allProductsData;
  const isLoading = isFilteringByCategory ? categoryLoading : allLoading;
  const products = data?.response?.data ?? [];

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

  const sortOptions = [
    { value: 'price_true', label: t('Price: Low to High') },
    { value: 'price_false', label: t('Price: High to Low') },
    { value: 'name_true', label: t('Name: A to Z') },
    { value: 'name_false', label: t('Name: Z to A') },
    { value: 'rate_true', label: t('Rating: Low to High') },
    { value: 'rate_false', label: t('Rating: High to Low') },
  ];

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const sortMenuOpen = Boolean(sortAnchorEl);

  const handleSortMenuOpen = (e) => setSortAnchorEl(e.currentTarget);
  const handleSortMenuClose = () => setSortAnchorEl(null);

  const handleSortSelect = (value) => {
    const [newSortBy, newAscending] = value.split('_');
    setSortBy(newSortBy);
    setAscending(newAscending);
    handleSortMenuClose();
  }

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


  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const filteredProducts = products.filter((product) => {
    const inPriceRange =
      product.price >= appliedFilters.priceRange[0] &&
      product.price <= appliedFilters.priceRange[1];

    const meetsRating =
      !appliedFilters.ratingSelected || product.rate >= appliedFilters.ratingVal;

    return inPriceRange && meetsRating;
  });


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
          <Grid size={3} sx={{ display: { xs: 'none', md: "flex" } }}>
            <Card sx={{ p: 2 }}><FiltersPanel
              categories={categories}
              appliedFilters={appliedFilters}
              onApply={setAppliedFilters}
            /></Card>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Stack direction='row' sx={{ alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {ProductsCount} {t('Results')}
                </Typography>

                <Button sx={{ display: { xs: 'inline-flex', md: 'none' }, minWidth: 'fit-content', minHeight: 'fit-content', pt: 1 }} color='secondary' onClick={toggleDrawer(true)}>
                  <TuneRoundedIcon color='secondary' />
                </Button>

                <Drawer open={drawerOpen} onClose={toggleDrawer(false)}
                  paperprops={{ sx: { top: { xs: 64 }, height: 'calc(100% - 64px)', maxWidth: 320 } }}>
                  <FiltersPanel
                    categories={categories}
                    appliedFilters={appliedFilters}
                    onApply={setAppliedFilters}
                    onClose={() => setDrawerOpen(false)}
                  />
                </Drawer>
              </Stack>

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth color='secondary' size="small" sx={{ display: { xs: 'none', md: "block" } }}>
                  <InputLabel>{t('sortBy')}</InputLabel>
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

              <Tooltip title={t('Sort By')}>
                <IconButton
                  color='secondary'
                  onClick={handleSortMenuOpen}
                  sx={{
                    display: { xs: 'block', md: "none" }
                  }}
                >
                  <SwapVertRoundedIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={sortAnchorEl}
                open={sortMenuOpen}
                onClose={handleSortMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {sortOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    selected={option.value === `${sortBy}_${ascending}`}
                    onClick={() => handleSortSelect(option.value)}
                  >
                    {t(option.label)}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 6, sm: 4 }}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
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