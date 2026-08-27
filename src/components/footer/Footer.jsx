import { Box, Container, Grid, Typography, Stack, IconButton, Divider, Link as MuiLink, useTheme, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const quickLinks = ['Shop All', 'New Arrivals', 'Collections', 'About Us'];
  const customer = ['Shipping Info', 'Returns & Exchanges', 'FAQ', 'Contact_Us'];
  const legal = ['Privacy Policy', 'Terms of Use', 'Accessibility'];

  const SocialHoverEffect = {
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: 'action.selected',
      transform: 'translateY(-2px)',
    },
  };

  const linkHoverEffect = {
    transition: 'all 0.2s ease',
    '&:hover': {
      color: 'primary.main',
      transform: 'translateY(-1px)',
    },
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'KaShop',
        text: 'Check out KaShop!',
        url: window.location.href,
      });
    }
  };

  const renderMobileAccordion = (title, links) => (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:before': { display: 'none' },
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 0,
          minHeight: 48,
          '& .MuiAccordionSummary-content': { my: 1.5 },
        }}>
        <Typography
          sx={{
            fontFamily: theme.typography.h6.fontFamily,
            fontWeight: 600,
            fontSize: '1rem',
          }}>
          {t(title)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pb: 2 }}>
        <Stack spacing={1.25}>
          {links.map((link) => (
            <MuiLink
              key={link}
              href="#"
              underline="none"
              sx={{
                color: 'text.secondary',
                fontSize: '0.9rem',
                ...linkHoverEffect,
              }}>
              {t(link)}
            </MuiLink>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  const renderDesktopLinks = (title, links) => (
    <Grid
      size={{ xs: 12, md: 4 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      <Typography
        sx={{
          fontFamily: theme.typography.h6.fontFamily,
          fontWeight: 600,
          fontSize: '1rem',
          mb: 1.5,
        }}>
        {t(title)}
      </Typography>
      <Stack spacing={1}>
        {links.map((link) => (
          <MuiLink
            key={link}
            href="#"
            underline="none"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              ...linkHoverEffect,
            }}>
            {t(link)}
          </MuiLink>
        ))}
      </Stack>
    </Grid>
  );

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
            }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '1.65rem' },
                letterSpacing: '-0.01em',
                mb: 1,
              }}>
              KaShop
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                maxWidth: 360,
                mb: 2.5,
              }}>
              {t('Redefining modern retail through curated mindfulness and uncompromising quality.')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                type="button"
                aria-label="Share KaShop"
                onClick={handleShare}
                sx={{
                  bgcolor: 'action.hover',
                  width: 36,
                  height: 36,
                  color: 'secondary.dark',
                  ...SocialHoverEffect,
                }}>
                <ShareIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href="mailto:"
                aria-label="Email"
                sx={{
                  bgcolor: 'action.hover',
                  width: 36,
                  height: 36,
                  color: 'secondary.dark',
                  ...SocialHoverEffect,
                }}>
                <AlternateEmailIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {isMobile ? (
              <Stack spacing={0}>
                {renderMobileAccordion('Quick Links', quickLinks)}
                {renderMobileAccordion('Customer Service', customer)}
                {renderMobileAccordion('Legal', legal)}
              </Stack>
            ) : (
              <Grid container spacing={4}>
                {renderDesktopLinks('Quick Links', quickLinks)}
                {renderDesktopLinks('Customer Service', customer)}
                {renderDesktopLinks('Legal', legal)}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: 'divider', opacity: { xs: 0, md: 1 } }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            gap: 2,
          }}>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              textAlign: { xs: 'center', md: 'left' },
            }}>
            {t('© 2026 KaShop. All rights reserved.')}
          </Typography>
          <Stack direction="row" spacing={0.75}>
            <IconButton
              component="a"
              href="https://github.com/TasneemJarrar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              size="small"
              sx={{
                bgcolor: 'action.hover',
                width: 32,
                height: 32,
                color: 'secondary.dark',
                ...SocialHoverEffect,
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/tasnymjrr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              size="small"
              sx={{
                bgcolor: 'action.hover',
                width: 32,
                height: 32,
                color: 'secondary.dark',
                ...SocialHoverEffect,
              }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/tasneem.jarrar.25/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              size="small"
              sx={{
                bgcolor: 'action.hover',
                width: 32,
                height: 32,
                color: 'secondary.dark',
                ...SocialHoverEffect,
              }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/tasneem-jarrar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              size="small"
              sx={{
                bgcolor: 'action.hover',
                width: 32,
                height: 32,
                color: 'secondary.dark',
                ...SocialHoverEffect,
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}