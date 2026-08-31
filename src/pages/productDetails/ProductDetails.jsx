import { useState } from 'react';
import { Box, Button, Typography, Grid, Tabs, Tab, Rating, LinearProgress, Paper, IconButton, Container, Skeleton, Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import useProduct from '../../hooks/useProduct';
import useAddToCart from '../../hooks/useAddToCart';
import useAddReview from '../../hooks/useAddReview';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export default function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProduct(id);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addReview, isPending: isSubmittingReview } = useAddReview(id);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewError, setReviewError] = useState(null);

  const handleOpenReview = () => {
    setReviewError(null);
    setOpenReviewModal(true);
  };

  const handleCloseReview = () => {
    setOpenReviewModal(false);
    setNewRating(5);
    setNewComment('');
    setReviewError(null);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviewError(null);

    addReview(
      { rating: newRating, comment: newComment },
      {
        onSuccess: () => {
          handleCloseReview();
        },
        onError: (err) => {
          const serverMessage = err?.response?.data?.message || t('Failed to submit review. Please try again.');
          setReviewError(serverMessage);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Box component="section" sx={{ py: 3, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rounded" width="100%" height={450} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Skeleton variant="text" width="80%" height={50} />
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="text" width="30%" height={40} />
              <Skeleton variant="rounded" width={140} height={40} sx={{ my: 1 }} />
              <Skeleton variant="rounded" width="100%" height={50} />
              <Skeleton variant="rounded" width="100%" height={50} />
            </Grid>
          </Grid>
          <Box sx={{ mt: 6 }}>
            <Skeleton variant="rectangular" width="100%" height={48} />
            <Skeleton variant="rounded" width="100%" height={150} sx={{ mt: 3 }} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Alert severity="error" variant="filled">
          <AlertTitle>{t('Error_Loading_Product')}</AlertTitle>
          {error?.message || t('Failed to fetch product details. Please try again later.')}
        </Alert>
      </Container>
    );
  }

  const product = data?.response || {};

  const reviews = product.reviews || [];
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((rev) => {
    const star = Math.min(5, Math.max(1, Math.round(rev.rating)));
    ratingCounts[star] += 1;
  });
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percent: reviews.length ? (ratingCounts[stars] / reviews.length) * 100 : 0,
  }));

  return (
    <Box component="section" sx={{ py: 3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ width: '100%', maxHeight: { xs: 300, sm: 500 }, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#fff', borderRadius: 1, overflow: 'hidden', p: 2 }}>
              <Box component="img" src={product.image} alt={product.name} sx={{ maxWidth: '100%', maxHeight: 450, objectFit: 'cover' }} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.5rem' } }} gutterBottom>{product.name}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rate || 0} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">{product.rate} ({product.reviews?.length || 0} {t('Reviews')})</Typography>
            </Box>

            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.25rem' } }}>${product.price}</Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>{t('Quantity') || 'Quantity'}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', width: 'fit-content', borderRadius: 2 }}>
                <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}><RemoveIcon /></IconButton>
                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity((q) => q + 1)}><AddIcon /></IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="contained" size="large" fullWidth startIcon={<ShoppingBagOutlinedIcon />} onClick={() => addToCart({ productId: product.id, count: quantity })} sx={{ py: 1.5, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
                {t('Add_To_Cart')}
              </Button>
              <Button variant="outlined" disabled size="large" fullWidth startIcon={<FavoriteBorderIcon />} color="inherit">
                {t('Add_To_Wishlist')}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
            <Tab label={t('Description')} />
            <Tab label={`${t('Reviews')} (${product.reviews?.length || 0})`} />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box sx={{ mt: 3 }}>
            <Paper variant="outlined" sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>{t('Product_Overview')}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {product.description}
              </Typography>
            </Paper>
          </Box>
        )}

        {activeTab === 1 && (
          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>{t('Customer_Ratings')}</Typography>
                <Typography variant="h2" fontWeight="bold">{product.rate || 0}</Typography>
                <Rating value={product.rate || 0} readOnly precision={0.1} />

                <Box sx={{ mt: 3, mb: 3 }}>
                  {ratingBreakdown.map(({ stars, percent }) => (
                    <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2">{stars}</Typography>
                      <LinearProgress variant="determinate" value={percent} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                    </Box>
                  ))}
                </Box>

                <Button variant="outlined" fullWidth startIcon={<RateReviewOutlinedIcon />} onClick={handleOpenReview}>
                  {t('Write_A_Review')}
                </Button>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
              {product.reviews?.map((rev, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 2, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 1 }}>
                    <Typography sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 600, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rev.userName}</Typography>
                    <Rating value={rev.rating} readOnly size="small" sx={{ flexShrink: 0 }} />
                  </Box>
                  <Typography color="text.secondary" sx={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{rev.comment}</Typography>
                </Paper>
              ))}
            </Grid>
          </Grid>
        )}
      </Container>

      <Dialog open={openReviewModal} onClose={handleCloseReview} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>{t('Write_A_Review')}</DialogTitle>
        <Box component="form" onSubmit={handleSubmitReview}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {reviewError && (
                <Alert severity="error" onClose={() => setReviewError(null)}>
                  {reviewError}
                </Alert>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">{t('Your_Overall_Rating')}</Typography>
                <Rating value={newRating} onChange={(e, val) => setNewRating(val || 1)} size="large" />
              </Box>
              <TextField label={t('Your_Review')} multiline rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} required placeholder={t('Share_Review_Placeholder')} fullWidth />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseReview} color="inherit" disabled={isSubmittingReview}>
              {t('Cancel')}
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmittingReview || !newComment.trim()}>
              {isSubmittingReview ? t('Submitting...') : t('Submit_Review')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}