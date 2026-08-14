import { Box, Button, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import newArrivalImg from "../../assets/newArrival.webp";
import techEssentialsImg from "../../assets/techEssentials.webp";
import performanceGearImg from "../../assets/performanceGear.webp";
import organicBeautyImg from "../../assets/organicBeauty.webp";
import { Link } from "react-router";

export default function FeaturedCollections() {
  const { t } = useTranslation();
  const theme = useTheme();

  return <>
    <Box component="section" sx={{ pb: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} >{t('Featured Collections')}</Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  position: 'relative', height: 280, borderRadius: 2, overflow: 'hidden', backgroundImage: `url(${newArrivalImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', p: 3, transition: 'all 0.3s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.45)'
                  },
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-4px)',
                  }
                }}>
                <Stack sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                  <Typography sx={{ color: 'primary.main', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {t('New Arrival')}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {t('The Sanctuary Home Collection')}
                  </Typography>
                  <Typography sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                    {t('COLLECTION_1_DESC')}
                  </Typography>
                  <Button component={Link} to={'/shop'} variant="contained" sx={{
                    textTransform: 'none', bgcolor: '#fff', color: '#000', mt: 2, alignSelf: 'flex-start',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      scale: '1.05',
                      transition: 'all 0.3s ease-in-out',
                    }
                  }}>
                    {t('Explore Collection')}
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: 'relative', height: 280, borderRadius: 2, overflow: 'hidden', backgroundImage: `url(${techEssentialsImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', p: 3, transition: 'all 0.3s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.45)'
                  },
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-4px)',
                  }
                }}>
                <Stack sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                  <Typography variant="p" sx={{ fontWeight: 600 }}>
                    {t('Tech Essentials')}
                  </Typography>
                  <Button component={Link} to={'/shop'} variant="text" sx={{
                    textTransform: 'none', color: '#fff', alignSelf: 'flex-start', textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                      bgcolor: 'transparent',
                      color: 'text.secondary',
                      translate: '-1px',
                      transition: 'all 0.3s ease-in-out',
                    }
                  }}>
                    {t('Shop Tech')}
                  </Button>
                </Stack>
              </Box>

            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative', height: 280, borderRadius: 2, overflow: 'hidden', backgroundImage: `url(${performanceGearImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', p: 3, transition: 'all 0.3s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.45)'
                  },
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-4px)',
                  }
                }}>
                <Stack sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                  <Typography variant="p" sx={{ fontWeight: 600 }}>
                    {t('Performance Gear')}
                  </Typography>
                  <Button component={Link} to={'/shop'} variant="text" sx={{
                    textTransform: 'none', color: '#fff', alignSelf: 'flex-start', textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                      bgcolor: 'transparent',
                      color: 'text.secondary',
                      translate: '-1px',
                      transition: 'all 0.3s ease-in-out',
                    }
                  }}>
                    {t('Upgrade Now')}
                  </Button>
                </Stack>
              </Box>

            </Grid>

            <Grid size={{ xs: 12, md: 8 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative', height: 280, borderRadius: 2, overflow: 'hidden', backgroundImage: `url(${organicBeautyImg})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', p: 3, transition: 'all 0.3s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.45)'
                  },
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-4px)',
                  }
                }}>
                <Stack sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {t('Organic Beauty')}
                  </Typography>
                  <Typography sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                    {t('COLLECTION_4_DESC')}
                  </Typography>
                  <Button component={Link} to={'/shop'} variant="contained" sx={{
                    textTransform: 'none', bgcolor: '#fff', color: '#000', mt: 2, alignSelf: 'flex-start',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      scale: '1.05',
                      transition: 'all 0.3s ease-in-out',
                    }
                  }}>
                    {t('Discover Beauty')}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box >
  </>
}
