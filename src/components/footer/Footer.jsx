import { Box, Container, Grid, Typography, Stack, IconButton, Divider, Link as MuiLink, useTheme, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'; import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  const quickLinks = ['Shop All', 'New Arrivals', 'Collections', 'About Us']
  const customer = ['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Contact_Us']
  const legal = ['Privacy Policy', 'Terms of Use', 'Accessibility']
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const SocialHoverEffect = {
    '&:hover': {
      bgcolor: 'action.selected',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.2s ease',
  };

  const linkHoverEffect = {
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.2s ease',

  };

  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${theme.palette.divider}`, backgroundColor: "background.default", color: 'text.primary' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={4}>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', mb: 1 }}>KaShop</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2, maxWidth: 360, textAlign: { xs: 'center', md: 'start' } }}>
              {t('Redefining modern retail through curated mindfulness and uncompromising quality.')}
            </Typography>

            <Stack direction="row" sx={{ gap: 2 }}>
              <IconButton component='a' href='' target='_blank' aria-label="share"
                onClick={() => {
                  navigator.share({
                    title: 'KaShop',
                    text: 'Check out KaShop!',
                    url: window.location.href,
                  });
                }}
                sx={{
                  bgcolor: 'action.hover', width: 40, height: 40, ...SocialHoverEffect
                }}>
                <ShareIcon fontSize="small" sx={{ color: 'secondary.dark' }} />
              </IconButton>
              <IconButton component='a' href='mailto:tasneem.a.jarrar.com' target='_blank' aria-label="email" sx={{
                bgcolor: 'action.hover', width: 40, height: 40, ...SocialHoverEffect
              }}>
                <AlternateEmailIcon fontSize="small" sx={{ color: 'secondary.dark' }} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={4} sx={{justifyContent:{xs:'center', md:'flex-start'}}} >
              {isMobile ?
                <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 800 }}>{t('Quick Links')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {quickLinks.map((link) => (
                        <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary' }}>{t(link)}</MuiLink>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                :
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>{t('Quick Links')}</Typography>
                  <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                    {quickLinks.map((link) => (
                      <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary', ...linkHoverEffect }}>{t(link)}</MuiLink>
                    ))}
                  </Stack>
                </Grid>}

              {isMobile ?
                <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 800 }}>{t('Customer Service')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {customer.map((link) => (
                        <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary' }}>{t(link)}</MuiLink>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                :
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>{t('Customer Service')}</Typography>
                  <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                    {customer.map((link) => (
                      <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary', ...linkHoverEffect }}>{t(link)}</MuiLink>
                    ))}
                  </Stack>
                </Grid>}

              {isMobile ?
                <Accordion disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 800 }}>{t('Legal')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {legal.map((link) => (
                        <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary' }}>{t(link)}</MuiLink>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                :
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>{t("Legal")}</Typography>
                  <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
                    {legal.map((link) => (
                      <MuiLink key={link} href="#" underline="none" sx={{ color: 'text.primary', ...linkHoverEffect }}>{t(link)}</MuiLink>
                    ))}
                  </Stack>
                </Grid>}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{t('© 2026 KaShop. All rights reserved.')}</Typography>

          <Stack direction="row" sx={{ gap: 2 }}>
            <IconButton component='a' to='https://github.com/TasneemJarrar' target='_blank' size="small" sx={{
              bgcolor: "action.hover", width: 32, height: 32, ...SocialHoverEffect
            }}>
              <GitHubIcon fontSize="small" sx={{
                color: "secondary.dark"
              }} />
            </IconButton>

            <IconButton component='a' href='https://www.instagram.com/tasnymjrr' target='_blank' size="small" sx={{
              bgcolor: 'action.hover', width: 32, height: 32, ...SocialHoverEffect
            }}>
              <InstagramIcon fontSize="small" sx={{ color: 'secondary.dark' }} />
            </IconButton>

            <IconButton component='a' href='https://www.facebook.com/tasneem.jarrar.25/' target='_blank' size="small" sx={{
              bgcolor: 'action.hover', width: 32, height: 32, ...SocialHoverEffect
            }}>
              <FacebookIcon fontSize="small" sx={{ color: 'secondary.dark' }} />
            </IconButton>

            <IconButton component='a' href='https://www.linkedin.com/in/tasneem-jarrar/' target='_blank' size="small" sx={{
              bgcolor: 'action.hover', width: 32, height: 32, ...SocialHoverEffect
            }}>
              <LinkedInIcon fontSize="small" sx={{ color: 'secondary.dark' }} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
