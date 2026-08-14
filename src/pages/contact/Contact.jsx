import { Box, Button, Card, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from '@mui/icons-material/Send';
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
    data: ['hello@kashop.com'],
    note: 'Response within 24 hours',
  },
  {
    id: 2,
    icon: CallRoundedIcon,
    title: 'Call us',
    data: ['+1 (555) 000-0000'],
    note: 'Mon\u2013Fri from 8am to 5pm',
  },
  {
    id: 3,
    icon: LocationOnRoundedIcon,
    title: 'Visit us',
    data: ['123 Design Avenue, Creative Suite 404'],
    note: 'New York, NY 10001',
  },
  {
    id: 4,
    icon: AccessTimeRoundedIcon,
    title: 'Operating hours',
    schedule: [
      { day: 'Mon \u2013 Fri', hours: '09:00 \u2013 18:00' },
      { day: 'Sat', hours: '10:00 \u2013 15:00' },
    ],
  },
];

export default function Contact() {
  const { t } = useTranslation();
    const theme = useTheme();


  const [subject, setsubject] = useState('');

  const handleChange = (event) => {
    setsubject(event.target.value);
  };

  return <>
    <Box component="section" sx={{ py: 3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={5} sx={{ alignItems: 'center', mb: 5 }}>
          <Stack spacing={1} sx={{ display: 'flex', alignItems: 'center', maxWidth: 'sm' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} >{t('Get in Contact')}</Typography>
            <Typography variant="p" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '1rem', textWrap: 'pretty' }}>{t("We're here to help you with any questions about your orders, products, or our collections. Drop us a line and we'll respond as soon as possible.")}</Typography>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} fullWidth sx={{ p: { xs: 4, sm: 5 }, border: '1px solid', borderColor: 'divider' }}>
              <Stack spacing={2} fullWidth>
                <TextField type="text" label={t('Full Name')} variant="outlined" fullWidth />
                <TextField type="email" label={t('Email_Address')} variant="outlined" fullWidth />
                <FormControl fullWidth>
                  <InputLabel>subject</InputLabel>
                  <Select
                    value={subject}
                    label="subject"
                    onChange={handleChange}>
                    <MenuItem value={'GeneralInquiry'}>{t('General Inquiry')}</MenuItem>
                    <MenuItem value={'ProductInquiry'}>{t('Product Inquiry')}</MenuItem>
                    <MenuItem value={'TechnicalSupport'}>{t('Technical Support')}</MenuItem>
                    <MenuItem value={'OrderPurchaseHelp'}>{t('Order / Purchase Help')}</MenuItem>
                    <MenuItem value={'BillingPayment'}>{t('Billing & Payment')}</MenuItem>
                    <MenuItem value={'PartnershipCollaboration'}>{t('Partnership / Collaboration')}</MenuItem>
                    <MenuItem value={'Feedback'}>{t('Feedback')}</MenuItem>
                    <MenuItem value={'ReportaProblem'}>{t('Report a Problem')}</MenuItem>
                    <MenuItem value={'Other'}>{t('Other')}</MenuItem>
                  </Select>
                </FormControl>
                <TextField type="text" label={t('Message')} variant="outlined" fullWidth multiline rows={4} />
                <Button variant="contained" color="primary" type="submit" fullWidth
                  sx={{ textTransform: 'none', fontWeight: 600, py: 1.25, mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>{t('Send Message')} <SendIcon sx={{ fontSize: '1rem' }} /></Button>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} fullWidth>
            <Stack sx={{ gap: 2 }}>
              {contactMethods.map((item) => {
                const Icon = item.icon;
                return (
                  <Box key={item.id}
                    sx={{display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius:'12px' , bgcolor: 'background.paper', transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        boxShadow: theme.shadows[1],
                      }}}>
                    <Box
                      sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center',flexShrink: 0}}>
                      <Icon sx={{ color: 'secondary.main', fontSize: '1.3rem' }} />
                    </Box>

                    <Stack sx={{ gap: 0.25 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {t(item.title)}
                      </Typography>

                      {item.data?.map((line, i) => (
                        <Typography key={i} sx={{ fontSize: '0.9rem', color: 'text.primary' }}>
                          {line}
                        </Typography>
                      ))}

                      {item.schedule?.map((row, i) => (
                        <Stack key={i} direction="row" sx={{ gap: 2, fontSize: '0.9rem' }}>
                          <Typography sx={{ fontSize: '0.9rem', minWidth: 70 }}>{row.day}</Typography>
                          <Typography sx={{ fontSize: '0.9rem' }}>{row.hours}</Typography>
                        </Stack>
                      ))}

                      {item.note && (
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.25 }}>
                          {t(item.note)}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <FAQ />
        <LocationMap />


      </Container>
    </Box>
  </>
}
