import { Box, Container, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const faqs = [
  {
    id: 1,
    questionKey: 'FAQ_Q1',
    answerKey: 'FAQ_A1',
  },
  {
    id: 2,
    questionKey: 'FAQ_Q2',
    answerKey: 'FAQ_A2',
  },
  {
    id: 3,
    questionKey: 'FAQ_Q3',
    answerKey: 'FAQ_A3',
  },
  {
    id: 4,
    questionKey: 'FAQ_Q4',
    answerKey: 'FAQ_A4',
  },
  {
    id: 5,
    questionKey: 'FAQ_Q5',
    answerKey: 'FAQ_A5',
  },
];

export default function FAQ() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Stack sx={{ alignItems: 'center', textAlign: 'center', mb: 5, gap: 1 }}>
          <Typography sx={{color: 'primary.main', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1}}>
            {t('FAQ')}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t('Common Questions')}
          </Typography>
        </Stack>

        <Stack sx={{ gap: 1.5 }}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              disableGutters
              elevation={0}
              sx={{bgcolor: 'background.paper', borderRadius: 2,
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  boxShadow: (theme) => theme.shadows[1],
                }}}>
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon sx={{ color: expanded === faq.id ? 'primary.main' : 'text.secondary' }} />}
                sx={{px: 3, py: 1, '& .MuiAccordionSummary-content': { my: 1.5 }}}>
                <Typography sx={{fontWeight: 600, fontSize: '0.95rem', color: expanded === faq.id ? 'primary.main' : 'text.primary', transition: 'all 0.3s ease-in-out'}}>
                  {t(faq.questionKey)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 2.5, pt: 0 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {t(faq.answerKey)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}