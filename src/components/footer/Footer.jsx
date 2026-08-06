import { Box, Container, Grid, Typography, Stack, IconButton, Divider, Link as MuiLink, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'; import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  const quickLinks = ['Shop All', 'New Arrivals', 'Collections', 'About Us']
  const customer = ['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Contact Us']
  const legal = ['Privacy Policy', 'Terms of Use', 'Accessibility']

  return (
    <Box component="footer" sx={{ mt: 3, borderTop: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>

        <Grid container spacing={4}>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', mb: 1 }}>KaShop</Typography>
            <Typography sx={{ color: theme.palette.text.secondary, mb: 2, maxWidth: 360, textAlign: { xs: 'center', md: 'start' } }}>
              {t('Redefining modern retail through curated mindfulness and uncompromising quality.')}
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton component={Link} to='' target='_blank' aria-label="share"
                onClick={() => {
                  navigator.share({
                    title: 'KaShop',
                    text: 'Check out KaShop!',
                    url: window.location.href,
                  });}}
                sx={{
                  bgcolor: theme.palette.action.hover, width: 40, height: 40,
                  '&:hover': {
                    bgcolor: theme.palette.action.selected,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}>
                <ShareIcon fontSize="small" sx={{ color: theme.palette.secondary.dark }} />
              </IconButton>
              <IconButton component={Link} to='mailto:tasneem.a.jarrar.com' target='_blank' aria-label="email" sx={{
                bgcolor: theme.palette.action.hover, width: 40, height: 40,
                '&:hover': {
                  bgcolor: theme.palette.action.selected,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}>
                <AlternateEmailIcon fontSize="small" sx={{ color: theme.palette.secondary.dark }} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={4} >
              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>{t('Quick Links')}</Typography>
                <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                  {quickLinks.map((link) => (
                    <MuiLink key={link} href="#" underline="none" sx={{ color: theme.palette.text.primary }}>{t(link)}</MuiLink>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>{t('Customer Service')}</Typography>
                <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                  {customer.map((link) => (
                    <MuiLink key={link} href="#" underline="none" sx={{ color: theme.palette.text.primary }}>{t(link)}</MuiLink>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>{t("Legal")}</Typography>
                <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                  {legal.map((link) => (
                    <MuiLink key={link} href="#" underline="none" sx={{ color: theme.palette.text.primary }}>{t(link)}</MuiLink>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem' }}>{t('© 2024 KaShop. All rights reserved.')}</Typography>

          <Stack direction="row" spacing={2}>
            <IconButton component={Link} to='https://github.com/TasneemJarrar' target='_blank' size="small" sx={{ bgcolor: theme.palette.action.hover, width: 32, height: 32 }}>
              <GitHubIcon fontSize="small" sx={{
                color: theme.palette.secondary.dark,
                '&:hover': {
                  bgcolor: theme.palette.action.selected,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }} />
            </IconButton>

            <IconButton component={Link} to='https://www.instagram.com/tasnymjrr' target='_blank' size="small" sx={{
              bgcolor: theme.palette.action.hover, width: 32, height: 32,
              '&:hover': {
                bgcolor: theme.palette.action.selected,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}>
              <InstagramIcon fontSize="small" sx={{ color: theme.palette.secondary.dark }} />
            </IconButton>

            <IconButton component={Link} to='https://www.facebook.com/tasneem.jarrar.25/' target='_blank' size="small" sx={{
              bgcolor: theme.palette.action.hover, width: 32, height: 32,
              '&:hover': {
                bgcolor: theme.palette.action.selected,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}>
              <FacebookIcon fontSize="small" sx={{ color: theme.palette.secondary.dark }} />
            </IconButton>

            <IconButton component={Link} to='https://www.linkedin.com/in/tasneem-jarrar/' target='_blank' size="small" sx={{
              bgcolor: theme.palette.action.hover, width: 32, height: 32,
              '&:hover': {
                bgcolor: theme.palette.action.selected,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}>
              <LinkedInIcon fontSize="small" sx={{ color: theme.palette.secondary.dark }} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
