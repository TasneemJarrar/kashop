import useProducts from '../../hooks/useProducts';
import { Box, Button, Card, CardContent, Container, Drawer, FormControl, Grid, IconButton, Menu, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';
import useAddToCart from '../../hooks/useAddToCart';
import useAuthStore from '../../store/useAuthStore';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Select, MenuItem, InputLabel } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import useProductsByCategory from '../../hooks/useProductsByCategory';
import FiltersPanel from '../../components/filtersPanel/FiltersPanel';
import UseCategories from '../../hooks/useCategories';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import ProductCard from '../../components/shared/ProductCard';

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
  };

  const handleSortChnage = (e) => {
    const [newSortBy, newAscending] = e.target.value.split('_');
    setSortBy(newSortBy);
    setAscending(newAscending);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    addToCart({ productId: product.id, count: 1 });
  };

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

  if (isError) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Error: {error.message}</Box>;
  }

  return (
    <>
      <Box component="section" sx={{ py: 3, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={3} sx={{ display: { xs: 'none', md: "flex" } }}>
              <Card sx={{ p: 2, width: '100%' }}>
                <FiltersPanel
                  categories={categories}
                  appliedFilters={appliedFilters}
                  onApply={setAppliedFilters} />
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 9 }}>
              <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Stack direction='row' sx={{ alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {isLoading ? <Skeleton width={60} /> : `${ProductsCount ?? 0} ${t('Results')}`}
                  </Typography>
                  <Button sx={{ display: { xs: 'inline-flex', md: 'none' }, minWidth: 'fit-content', minHeight: 'fit-content', p:0 }} color='secondary' onClick={toggleDrawer(true)}>
                    <TuneRoundedIcon color='secondary' />
                  </Button>
                  <Drawer
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{ sx: { top: { xs: 64 }, height: 'calc(100% - 64px)', maxWidth: 320 } }}>
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
                    }}>
                    <SwapVertRoundedIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={sortAnchorEl}
                  open={sortMenuOpen}
                  onClose={handleSortMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  {sortOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === `${sortBy}_${ascending}`}
                      onClick={() => handleSortSelect(option.value)}>
                      {t(option.label)}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>

              <Grid container spacing={2}>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 4 }}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '1 / 1' }} />
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1.5, md: 3 } }}>
                          <Stack sx={{ gap: 1, width: '100%' }}>
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="40%" height={18} />
                            <Skeleton variant="text" width="50%" height={22} />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                  : filteredProducts.map((product, index) => (
                    <Grid key={product.id} size={{ xs: 6, sm: 4 }}>
                      <ProductCard product={product} index={index} onAddToCart={handleAddToCart} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
  );
}