import { useState, useEffect } from "react";
import { Box, Container, Typography, Stack, useTheme, Button, Skeleton, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();

  const heroImage = theme.palette?.custom?.hero?.image;
  const overlay = theme.palette?.custom?.hero?.overlay || "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))";

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!heroImage) {
      setImageError(true);
      return;
    }

    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [heroImage]);

  // 1. Loading State (Skeleton Hero Layout)
  if (!imageLoaded && !imageError) {
    return (
      <Box sx={{ minHeight: "100dvh", display: "flex", alignItems: "center", px: { xs: 2, sm: 0 }, bgcolor: "action.hover" }}>
        <Container>
          <Box sx={{ maxWidth: { xs: "100%", md: 560 } }}>
            <Skeleton variant="text" width={180} height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={80} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={60} sx={{ mb: 3 }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Skeleton variant="rounded" width={140} height={48} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={160} height={48} sx={{ borderRadius: 4 }} />
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  }

  const backgroundStyle = imageError || !heroImage
    ? { bgcolor: "grey.900" }
    : {
      backgroundImage: `${overlay}, url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      animation: "heroFlow 18s ease-in-out infinite alternate",
      "@keyframes heroFlow": {
        from: { backgroundSize: "105%", backgroundPosition: "center center" },
        to: { backgroundSize: "100%", backgroundPosition: "70% center" },
      },
    };

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", alignItems: "center", px: { xs: 2, sm: 0 }, position: "relative", ...backgroundStyle }}>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", maxWidth: { xs: "100%", md: 560 } }}>
          <Typography color="primary" variant="body2" sx={{ fontWeight: 700, letterSpacing: 2, fontSize: { xs: 12, sm: 16, md: 18 } }}>
            {t("NEW COLLECTION 2026")}
          </Typography>

          <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: "3rem", sm: "3.5rem", md: "4rem" } }}>
            {t("Mindful Shopping for Modern Living")}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>
            {t("Curated essentials that balance functionality with aesthetic pleasure. Designed for those who value quality over quantity.")}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2, mt: 1, width: { xs: "100%", sm: "auto" } }}>
            <Button component={Link} to="/shop" variant="contained" color="primary" size="large" sx={{ borderRadius: 4 }} fullWidth={false}>
              {t("Shop Now")}
            </Button>
            <Button href="#featured" variant="outlined" color="inherit" size="large" sx={{ borderRadius: 4 }}>
              {t("Explore Products")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}