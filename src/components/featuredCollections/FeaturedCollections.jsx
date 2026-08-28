import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import newArrivalImg from "../../assets/featuredCollections/newArrival.webp";
import techEssentialsImg from "../../assets/featuredCollections/techEssentials.webp";
import performanceGearImg from "../../assets/featuredCollections/performanceGear.webp";
import organicBeautyImg from "../../assets/featuredCollections/organicBeauty.webp";
import { Link } from "react-router";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function FeaturedCollections() {
  const { t } = useTranslation();

  const collections = [
    { image: newArrivalImg, title: t('New Arrivals'), subtitle: t('Fresh drops, curated weekly'), cta: t('Discover'), size: { xs: 12, sm: 6, md: 8 } },
    { image: organicBeautyImg, title: t('Organic Beauty'), subtitle: t('Clean formulas, real results'), cta: t('Discover'), size: { xs: 12, sm: 6, md: 4 } },
    { image: performanceGearImg, title: t('Performance Gear'), subtitle: t('Built for daily movement'), cta: t('Discover'), size: { xs: 12, sm: 6, md: 4 } },
    { image: techEssentialsImg, title: t('Tech Essentials'), subtitle: t('Quiet tools that keep up'), cta: t('Discover'), size: { xs: 12, sm: 6, md: 8 } },
  ];

  return (
    <Box component="section" sx={{ py: 5, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 0.5, textTransform: 'uppercase' }}>
            {t('Collections')}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' } }}>
            {t('Curated for the way you live')}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {collections.map((collection) => (
              <Grid key={collection.title} size={collection.size}>
                <Box
                  component={Link}
                  to="/shop"
                  sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', height: 280, p: 3, borderRadius: 2, overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease-in-out', '&::after': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)', zIndex: 1 }, '&:hover': { boxShadow: (theme) => theme.shadows[4], transform: 'translateY(-4px)' } }}>
                  <Box
                    component="img"
                    src={collection.image}
                    alt={collection.title}
                    loading="lazy"
                    sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>

                  <Stack sx={{ position: 'relative', zIndex: 2, color: '#fff' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {collection.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.85, fontSize: '0.9rem', mb: 1 }}>
                      {collection.subtitle}
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', fontWeight: 600, fontSize: '0.9rem', transition: 'gap 0.2s ease-in-out', '&:hover': { gap: '10px' } }}>
                      <span>{collection.cta}</span>
                      <ArrowForwardRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}