import { Box, Container, Typography } from '@mui/material'
import style from "./hero.module.css";
import { useTranslation } from 'react-i18next';


export default function Hero() {
  const { t } = useTranslation();

  return <Box className={style.hero}>
    <Container>
      <Box className={style.heroContent} sx={{display:'flex', flexDirection:'column', gap:2, alignItems: 'left'}}>
        <Typography color='primary' variant='body' sx={{fs:'small'}}>{t('NEW COLLECTION 2026')}</Typography>
        <Typography color='primary'>{t('NEW COLLECTION 2024')}</Typography>
        <Typography color='primary'>{t('NEW COLLECTION 2024')}</Typography>
      </Box>

    </Container>
    </Box>
}
