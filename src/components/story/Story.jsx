import { alpha, Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import storyImage from '../../assets/about/story.webp';


export default function Story() {
  const { t } = useTranslation();

  return <>
    <Box component={'section'} sx={{ py: {xs: 4, md: 6} }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} sx={{order:{xs:1, md:2}}}>
            <Stack spacing={3}>
              <Typography color="primary" variant="p" sx={{ fontWeight: 700, letterSpacing: 1, fontSize: { xs: 10, sm: 12, md: 14 }, textTransform: 'uppercase', display:{xs:'none', md:'block'} }}>
                {t('Our journy')}
              </Typography>

              <Typography component="h1" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}>
                {t('Our Story')}
              </Typography>

              <Typography variant="p" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' } }}>
                {t('Founded in 2020, KaShop began as a small vision to bridge the gap between high-end boutique quality and accessible digital retail. What started in a small home office has grown into a global community of style enthusiasts.')}
              </Typography>

              <Typography variant="p" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' } }}>
                {t("We've spent thousands of hours vetting manufacturers, testing materials, and refining our logistics to ensure that when a KaShop package arrives at your door, it's a moment of pure delight. Every product we list is a piece we'd be proud to own ourselves.")}
              </Typography>

              <Typography variant="p" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' } }}>
                {t("Today, we're proud to serve customers across 40 countries, maintaining the same commitment to 'Quality First' that we started with on day one.")}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{order:{xs:1, md:2}}}>
            <Card sx={{ p: {xs:0, md:2}, bgcolor: (theme) => alpha(theme.palette.primary.light, 0.1)}}>
              <Box
                component="img"
                src={storyImage}
                alt="KaShop Story Image"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
}
