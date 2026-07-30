import { Box, Button, Card, CardContent, CircularProgress, Divider, Stack, TextField, Typography } from "@mui/material";
import useCart from "../../../hooks/useCart";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from "react-i18next";


export default function ReviewOrder({ onContinue }) {
  const { data, isLoading, isError, error } = useCart();

  const { t } = useTranslation();


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

  return (
    <div>
      <Card elevation={0} sx={{ p: 2, mb: 2, border: "1px solid", borderColor: 'divider' }}>
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

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <LockOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                {t("Secure_Encrypted_Checkout")}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Button onClick={onContinue}>
        payment
      </Button>
    </div>
  )
}
