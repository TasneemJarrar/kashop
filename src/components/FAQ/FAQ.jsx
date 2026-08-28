import { Box, Container, Typography, Stack, Grid, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link as routerLink } from 'react-router';

const faqs = [
  { id: 1, questionKey: 'FAQ_Q1', answerKey: 'FAQ_A1' },
  { id: 2, questionKey: 'FAQ_Q2', answerKey: 'FAQ_A2' },
  { id: 3, questionKey: 'FAQ_Q3', answerKey: 'FAQ_A3' },
  { id: 4, questionKey: 'FAQ_Q4', answerKey: 'FAQ_A4' },
];

export default function FAQ() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, mb: 1, textTransform: 'uppercase' }}>
              {t('QUESTIONS')}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {t('Good to know')}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7, mb: 3 }}>
              {t('FAQ_INTRO')}
            </Typography>
            <Button
              component={routerLink}
              to="/contact"
              variant="outlined"
              sx={{
                borderRadius: 999,
                borderColor: 'divider',
                color: 'text.primary',
                textTransform: 'none',
                px: 3,
                '&:hover': { borderColor: 'text.primary', bgcolor: 'transparent' },
              }}>
              {t('Talk to us')}
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack>
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleChange(faq.id)}
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    bgcolor: 'transparent',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:before': { display: 'none' },
                  }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon sx={{ color: 'text.secondary' }} />}
                    sx={{ px: 0, py: 1, '& .MuiAccordionSummary-content': { my: 2 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                      {t(faq.questionKey)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pb: 2.5, pt: 0 }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {t(faq.answerKey)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}