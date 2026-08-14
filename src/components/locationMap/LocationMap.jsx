import { Box } from '@mui/material';

export default function LocationMap() {
  return (
    <Box
      sx={{ width: '100%', height: { xs: 200, md: 250 }, borderRadius: '12px', overflow: 'hidden', mt: 4 }}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26932.607431032047!2d35.28161436043935!3d32.45728403526771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cfed5525459a7%3A0x8af2eaf8c123e9a4!2sJenin!5e0!3m2!1sen!2s!4v1786671867940!5m2!1sen!2s" width="100%" height="100%" sx={{border:"none"}} allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </Box>
  );
}