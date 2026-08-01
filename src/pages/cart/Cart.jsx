import useCart from '../../hooks/useCart';
import { Box, Button, Card, CardContent, CircularProgress, Container, Grid, IconButton, Link, Stack, Typography, } from '@mui/material';
import useDeleteFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useClearCart from '../../hooks/useClearCart';
import { Link as routerLink, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



export default function Cart() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: RemoveItem, isPending } = useDeleteFromCart();
  const { mutate: UpdateItem } = useUpdateCartItem();
  const { mutate: clearCart } = useClearCart();

  const { data, isLoading, isError, error } = useCart();

  console.log(data, "cart data");

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
        <Button variant="text" color="error"
              onClick={clearCart} sx={{ textTransform: "none",textDecoration: "underline", fontWeight: 500,color: "text.secondary" , "&:hover": { color: "error.main" }, mb: 1, width: "fit-content" }}>
              {t("Clear_Cart")}
            </Button>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* cart items cards */}
            {data?.items?.map((item) => (
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
                        sx={{ alignItems: "center", width: "fit-content", border: "1px solid #CBC4D2", borderRadius: 10, px: 1, py: 0.5 }}>

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

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
                    <Button onClick={() => navigate('/checkout')} variant="contained" color='primary' sx={{ textTransform: "none", fontWeight: 500 }}>
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
