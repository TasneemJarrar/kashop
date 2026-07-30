import useCart from '../../hooks/useCart';
import { Box, Button, Card, CardContent, CircularProgress, Container, Grid, IconButton, Stack, Typography, Divider, TextField } from '@mui/material';
import useDeleteFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useClearCart from '../../hooks/useClearCart';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

export default function Cart() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: RemoveItem, isPending } = useDeleteFromCart();
  const { mutate: UpdateItem } = useUpdateCartItem();
  const { mutate: clearCart } = useClearCart();

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
    <Box component="section" sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 5 }}>
          <Button variant="text" color="dark" sx={{
            "&:hover": {
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease"
          }} onClick={() => navigate("/")}>
            <ArrowBackIosOutlinedIcon />
          </Button>

          <Typography component="h2" variant="h4" sx={{ fontWeight: 700 }}>
            {t('Shopping_Bag')}
          </Typography>
        </Stack>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            {data?.items?.map((item) => (
              <Card
                key={item.productId}
                elevation={0}
                sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider', borderRadius: 3 }}>
                <CardContent sx={{ p: "0 !important" }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>

                    <Stack spacing={1}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.productName}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(item.price)}
                      </Typography>

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

                    </Stack>

                    <Stack
                      sx={{ height: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontSize: 16 }}>
                        {formatPrice(item.totalPrice)}
                      </Typography>

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

            <Button variant="outlined" color="error" startIcon={<DeleteForeverOutlinedIcon />}
              onClick={clearCart} sx={{ textTransform: "none", fontWeight: 500 }}>
              {t("Clear_Cart")}
            </Button>

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: "0 !important" }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('Order_Summary')}
                  </Typography>

                  <Stack spacing={1}>
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                      <Typography variant='body2'>
                        {t('Subtotal')}
                      </Typography>
                      <Typography variant="body2">
                        {formatPrice(total)}
                      </Typography>
                    </Stack>

                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                      <Typography variant='body2'>
                        {t('Free_Delivery')}
                      </Typography>
                      <Typography variant='body2' color='primary'>
                        {t('Free')}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider variant="middle" />

                  <Stack spacing={1}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      {t('DISCOUNT_CODE')}
                    </Typography>
                    <Stack direction='row' spacing={1} sx={{ gap: 2 }}>
                      <TextField id="outlined-basic" size="small" sx={{ width: "100%" }} label="Enter Code" variant="outlined" />
                      <Button variant="outlined" size="small" color='light'
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            borderColor: "primary.main",
                          },
                        }}>{t('Apply')}</Button>
                    </Stack>

                    <Stack direction='row' spacing={1} sx={{ justifyContent: "space-between" }}>
                      <Stack spacing={1}>
                        <Typography variant='body1'>
                          {t('Grand_Total')}
                        </Typography>
                        <Typography variant='body2'>
                          {t('Including_VAT')}
                        </Typography>
                      </Stack>
                      <Typography variant="body2">
                        {formatPrice(total)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button onClick={() => navigate('/checkout')} variant="contained" color='primary'>{t('Proceed_to_checkout')}</Button>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                    <LockOutlinedIcon fontSize="small" />
                    <Typography variant="body2">
                      {t("Secure_Encrypted_Checkout")}
                    </Typography>
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
