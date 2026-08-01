import useCart from '../../hooks/useCart';
import { Box, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Link, Stack, Typography, } from '@mui/material';
import useDeleteFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useClearCart from '../../hooks/useClearCart';
import { Link as routerLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useState } from 'react';



export default function Cart() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: RemoveItem, isPending } = useDeleteFromCart();
  const { mutate: UpdateItem } = useUpdateCartItem();
  const { mutate: clearCart } = useClearCart();
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, isLoading, isError, error } = useCart();

  const handleUpdate = (productId, action) => {
    const item = data.items.find(i => i.productId == productId);
    if (action == '+') {
      UpdateItem({ productId, count: item.count + 1 })
    } else {
      if (item.count === 1) {
        RemoveItem(productId);
        return;
      }
      UpdateItem({ productId, count: item.count - 1 })
    }
  }

  const calculateTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const total = calculateTotal(data?.items);


  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (isLoading) { return <CircularProgress /> }
  if (isError) { return <Box color='red'>Error: {error.message}</Box> }

  return <>
    <Box component="section" sx={{ pt: 2, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Stack direction='row' sx={{ alignItems: 'bottom', gap: 2, py: 2 }}>
          <Typography component="h2" variant="h4" sx={{ fontWeight: 700 }}>
            {t('Shopping_Bag')}
          </Typography>

          {!data?.items || data.items.length === 0 ? null :
            <>
              <Button variant="text" color="error"
                 onClick={handleClickOpen} sx={{ textTransform: "none", pb: 0, textDecoration: "underline", fontWeight: 500, color: "text.secondary", "&:hover": { color: "error.main" }, width: "fit-content" }}>
                {t("Clear_Cart")}
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
              >
                <DialogTitle id="alert-dialog-title">
                  {t('Clear_Cart_Title')}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {t('Clear_Cart_Body')}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus variant="outlined" color="grey" sx={{ textTransform: "none", fontWeight: 600}}>
                    {t("Cancel")}
                  </Button>
                  <Button onClick={() => { clearCart();  handleClose();}} variant="outlined" color="error" sx={{ textTransform: "none", fontWeight: 600, color: "error.main", "&:hover": { bgcolor: "error.main", color: "white" } }}>
                    {t("Clear_Cart")}
                  </Button>
                </DialogActions>
              </Dialog>
            </>

          }
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>

            {!data?.items || data.items.length === 0 ? <Card
              elevation={0}
              sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider' }}>
              <CardContent sx={{ p: "0 !important" }}>
                <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 2, py: 5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150, height: 150, borderRadius: 50, backgroundColor: 'action.hover' }}>
                    <ShoppingBasketOutlinedIcon sx={{ fontSize: 81, color: 'action.disabled' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {t('Your_cart_is_empty')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 400, textAlign: 'center' }}>
                    {t('Looks_like_you_havent_added_anything_to_your_cart_yet.Start_browsing_our_products_and_add_items_that_you_like_to_your_cart_to_get_started.')}
                  </Typography>
                  <Button component={routerLink} to="/shop" variant="contained" color='primary' sx={{ textTransform: "none", fontWeight: 500 }}>
                    {t('Browse_Products')}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

              : <Box>{data?.items?.map((item) => (
                <Card
                  key={item.productId}
                  elevation={0}
                  sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider' }}>
                  <CardContent sx={{ p: "0 !important" }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>

                      <Stack spacing={2}>
                        <Link component={routerLink} to={`/product/${item.productId}`} sx={{ fontWeight: 600, textDecoration: 'none', color: 'text.primary' }}>
                          {item.productName}
                        </Link>

                        <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                          {formatPrice(item.price)}
                        </Typography>
                      </Stack>

                      <Stack
                        sx={{ height: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center", width: "fit-content",justifyContent: "between", border: "1px solid #CBC4D2", borderRadius: 10, px: 1, py: 0.5 }}>

                          <IconButton
                            size="small"
                            onClick={() => handleUpdate(item.productId, "-")}>
                            <RemoveIcon sx={{ fontSize: 16 }} />
                          </IconButton>

                          <Typography fontWeight={500}>
                            {item.count}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => handleUpdate(item.productId, "+")}>
                            <AddIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Stack>

                        <Button
                          color="error"
                          disabled={isPending}
                          onClick={() => RemoveItem(item.productId)}
                          sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                          {t('Remove')}
                        </Button>

                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              </Box>
            }
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}  sx={{display:{xs:!data?.items || data.items.length === 0? 'none' : 'block', md:'block'}}}>
            <Card elevation={0} sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider' }}>
              <CardContent sx={{ p: "0 !important" }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('Order_Summary')}
                  </Typography>

                  <Stack direction='row' spacing={1} sx={{ justifyContent: "space-between" }}>
                    <Stack spacing={1}>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        {t('Total')}
                      </Typography>

                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formatPrice(total)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300 }}>
                    {t('Shipping_and_discounts_calculated_at_checkout')}
                  </Typography>

                  <Stack spacing={2}>
                    <Button onClick={() => navigate('/checkout')} variant="contained" color="primary"
                      disabled={!data?.items || data.items.length === 0}
                      sx={{ textTransform: 'none', fontWeight: 500 }}>
                      {t('Proceed_to_checkout')}
                    </Button>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <LockOutlinedIcon fontSize="small" />
                      <Typography variant="body2">
                        {t("Secure_Encrypted_Checkout")}
                      </Typography>
                    </Stack>
                  </Stack>


                </Stack>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box >
  </>
}

