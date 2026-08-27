import { alpha, Box, Button, Container, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FAQ from '../../components/FAQ/FAQ';
import LocationMap from "../../components/locationMap/LocationMap";


const contactMethods = [
  {
    id: 1,
    icon: EmailRoundedIcon,
    title: 'Email us',
    value: 'hello@kashop.studio',
  },
  {
    id: 2,
    icon: CallRoundedIcon,
    title: 'Call us',
    value: '+970 2 000 1234',
  },
  {
    id: 3,
    icon: LocationOnRoundedIcon,
    title: 'Visit us',
    value: '12 Old Town Road, Hebron',
  },
  {
    id: 4,
    icon: AccessTimeRoundedIcon,
    title: 'Operating hours',
    value: 'Sun–Thu, 9:00–18:00',
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const theme = useTheme();

  return <>
    <Box component="section" sx={{ py: 3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} fullWidth>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 0.5, textTransform: 'uppercase' }}>
                {t('Contact')}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' }, mb: 1 }}>
                {t("Let's talk")}
              </Typography>
              <Typography variant="p" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.9rem', textWrap: 'pretty' }}>
                {t("contactDescription")}</Typography>
            </Box>

            <Stack sx={{ gap: 2 }}>
              {contactMethods.map((item) => {
                const Icon = item.icon;

                return (
                  <Box key={item.id}
                    sx={{display: 'flex', alignItems: 'center', gap: 2, p: 2, minHeight: 100, border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: 'secondary.main',
                        boxShadow: theme.shadows[1],
                      }
                    }}>
                    <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.14), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon sx={{ color: 'secondary.main', fontSize: '1.5rem' }} />
                    </Box>

                    <Stack spacing={0.35}>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        {t(item.title)}
                      </Typography>

                    <Typography sx={{ color: 'text.primary', fontSize: '1rem', fontWeight: 500 }}>
                        {t(item.value)}
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 3, sm: 4 }, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.common.black, 0.05)}` }}>
              <Typography variant="h3" sx={{ color: 'text.primary', fontSize: { xs: '1.8rem', md: '2rem' }, mb: { xs: 3, md: 4 } }}>
                {t('Send a message')}
              </Typography>

              <Grid container spacing={{ xs: 2, md: 2.5 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', fontWeight: 500 }}>
                      {t('Name')}
                    </Typography>

                    <TextField type="text" placeholder={t('Your name')} variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper', '& fieldset': { borderColor: 'divider' }, '&:hover fieldset': { borderColor: 'secondary.main' }, '&.Mui-focused fieldset': { borderColor: 'secondary.main' } }, '& .MuiInputBase-input': { py: 1.25, px: 2 } }} />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack spacing={1}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', fontWeight: 500 }}>
                      {t('Email')}
                    </Typography>

                    <TextField type="email" placeholder={t('you@email.com')} variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper', '& fieldset': { borderColor: 'divider' }, '&:hover fieldset': { borderColor: 'secondary.main' }, '&.Mui-focused fieldset': { borderColor: 'secondary.main' } }, '& .MuiInputBase-input': { py: 1.25, px: 2 } }} />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Stack spacing={1}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', fontWeight: 500 }}>
                      {t('Subject')}
                    </Typography>

                    <TextField type="text" placeholder={t('How can we help?')} variant="outlined" fullWidth sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper', '& fieldset': { borderColor: 'divider' }, '&:hover fieldset': { borderColor: 'secondary.main' }, '&.Mui-focused fieldset': { borderColor: 'secondary.main' } }, '& .MuiInputBase-input': { py: 1.25, px: 2 } }} />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Stack spacing={1}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', fontWeight: 500 }}>
                      {t('Message')}
                    </Typography>

                    <TextField placeholder={t('Tell us a bit more...')} variant="outlined" fullWidth multiline minRows={3} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper', alignItems: 'flex-start', '& fieldset': { borderColor: 'divider' }, '&:hover fieldset': { borderColor: 'secondary.main' }, '&.Mui-focused fieldset': { borderColor: 'secondary.main' } }, '& .MuiInputBase-input': { p: 0.5 } }} />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button variant="contained" color="secondary" type="submit" fullWidth sx={{ py: 1.4, mt: 0.5, fontSize: '1rem', fontWeight: 600 }}>
                    {t('Send message')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

        </Grid>

        <FAQ />
        <LocationMap />


      </Container>
    </Box >
  </>
}
