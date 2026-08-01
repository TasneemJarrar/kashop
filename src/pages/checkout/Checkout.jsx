import useCart from "../../hooks/useCart";
import {Box, Card, CardContent, CircularProgress, Container, Grid, Stack, Typography,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useState } from "react";
import CheckoutStepper from "../../components/checkoutStepper/CheckoutStepper";
import PaymentForm from "../../components/checkoutStepper/checkout/PaymentForm";
import ReviewOrder from "../../components/checkoutStepper/checkout/ReviewOrder";

export default function Checkout() {
  const { data, isLoading, isError, error } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const calculateTotal = (items) => {
  //   if (!items || items.length === 0) return 0;
  //   return items.reduce((sum, item) => sum + item.totalPrice, 0);
  // };

  // const total = calculateTotal(data?.items);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const steps = ["Review", "Payment"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <Box color="red">Error: {error.message}</Box>;
  }

  return (
    <>
      <Box component="section" sx={{ py: 5 }}>
        <Container maxWidth="lg">
        
          <CheckoutStepper activeStep={activeStep} steps={steps} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              {activeStep === 0 && (<ReviewOrder onContinue={handleNext}/>)}
              {activeStep === 1 && (<PaymentForm onBack={handleBack} />)}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              {data?.items?.map((item) => (
                <Card
                  key={item.productId}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <CardContent sx={{ p: "0 !important" }}>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Stack spacing={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {item.productName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(item.price)}
                        </Typography>
                      </Stack>

                      <Stack
                        sx={{
                          height: 100,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontSize: 16 }}>
                          {formatPrice(item.totalPrice)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
