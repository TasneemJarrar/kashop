import { useState } from "react";
import { Avatar, Box, Button, Card, CardActionArea, CircularProgress, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import useCart from "../../hooks/useCart";
import useCheckout from "../../hooks/useCheckout";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCart();
  const { mutate: checkout, isPending } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState("Visa");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0);

  const handlePay = () => {
    if (!paymentMethod) return;
    checkout({ paymentMethod });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", py: 5, color: "error.main" }}>
        {t("Error")}: {error?.message}
      </Box>
    );
  }

  const items = data?.items || [];
  const subtotal = data?.cartTotal;

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("Your_Cart_Is_Empty")}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>
          {t("Continue_Shopping")}
        </Button>
      </Container>
    );
  }

  const paymentOptions = [
    {
      id: "Visa",
      label: t("Visa_Card"),
      icon: <CreditCardOutlinedIcon sx={{ fontSize: 28 }} />,
      description: t("Visa_Desc"),
    },
    {
      id: "Cash",
      label: t("Cash_On_Delivery"),
      icon: <LocalAtmOutlinedIcon sx={{ fontSize: 28 }} />,
      description: t("Cash_Desc"),
    },
  ];

  return (
    <Box component="section" sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
                {t("Select_Payment_Method") || "Select Payment Method"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t("Choose_Payment_Subtitle") || "Choose how you would like to complete your purchase."}
              </Typography>

              <Stack spacing={2} sx={{ mb: 4 }}>
                {paymentOptions.map((option) => {
                  const isSelected = paymentMethod === option.id;
                  return (
                    <motion.div key={option.id} whileTap={{ scale: 0.98 }}>
                      <Card elevation={0}
                        sx={{ borderRadius: 2, border: "2px solid", borderColor: isSelected ? "primary.main" : "divider", bgcolor: isSelected ? "action.hover" : "transparent", transition: "all 0.2s ease" }}>
                        <CardActionArea onClick={() => setPaymentMethod(option.id)} sx={{ p: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box
                                sx={{ color: isSelected ? "primary.main" : "text.secondary", display: "flex", alignItems: "center" }}>
                                {option.icon}
                              </Box>
                              <Box>
                                <Typography variant="subtitle1" fontWeight={700}>
                                  {option.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {option.description}
                                </Typography>
                              </Box>
                            </Box>

                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                >
                                  <CheckCircleIcon color="primary" sx={{ fontSize: 24 }} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  );
                })}
              </Stack>

              <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2} justifyContent="space-between">
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/cart")}
                  sx={{ borderRadius: 2, px: 3, py: 1.2, fontWeight: 700 }}>
                  {t("Back_To_Cart")}
                </Button>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button variant="contained" disabled={isPending || !paymentMethod} onClick={handlePay}
                    size="large" sx={{ borderRadius: 2, px: 5, py: 1.2, fontWeight: 800, boxShadow: "none" }}>
                    {isPending ? <CircularProgress size={24} color="inherit" /> : `${t("Pay") || "Pay"} ${formatPrice(subtotal)}`}
                  </Button>
                </motion.div>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                {t("Order_Summary")}
              </Typography>

              <Stack spacing={2.5} sx={{ mb: 3, maxHeight: 320, overflowY: "auto", pr: 0.5 }}>
                {items.map((item) => (
                  <Box key={item.productId || item.id} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar variant="rounded" sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: "action.selected" }}>
                      <Inventory2OutlinedIcon color="action" />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                        {item.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 0.5 }}>
                        {t("Qty")}: {item.count || 1}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {formatPrice(item.totalPrice)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ mb: 2.5 }} />

              <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    {t("Subtotal")}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {formatPrice(subtotal)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    {t("Shipping")}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                    {t("Free")}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 2.5 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {t("Total")}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#f95738" }}>
                  {formatPrice(subtotal)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, p: 2, borderRadius: 2, bgcolor: "action.hover", alignItems: "center" }}>
                <VerifiedUserOutlinedIcon sx={{ color: "primary.main", fontSize: 20 }} />
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, fontWeight: 500 }}>
                  {t("Security_Message")}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}