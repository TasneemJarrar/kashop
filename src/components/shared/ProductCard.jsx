import { alpha, Box, Card, CardContent, CardMedia, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const MotionCard = motion.create(Card);

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

export default function ProductCard({ product, index = 0, onAddToCart }) {
  const theme = useTheme();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', textDecoration: 'none', transformOrigin: 'center' }}
    >
      <Box component={RouterLink} to={`/product/${product.id}`} data-cursor="view" sx={{ textDecoration: 'none', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          loading="lazy"
          sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'contain', transition: 'transform 0.5s ease' }}
        />
      </Box>

      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1.5, md: 3 } }}>
        <Stack sx={{ gap: 1 }}>
          <Typography
            component={RouterLink}
            to={`/product/${product.id}`}
            sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' }, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {product.name}
          </Typography>

          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <StarRoundedIcon sx={{ color: 'warning.light', fontSize: { xs: '0.8rem', md: '0.9rem' } }} />
            <Typography component="span" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' }, color: theme.palette.text.primary }}>
              {product.rate}
            </Typography>
          </Stack>

          <Typography sx={{ fontWeight: 800, fontSize: { xs: '0.8rem', md: '0.9rem' }, mt: 0.5 }}>
            {formatPrice(product.price)}
          </Typography>
        </Stack>

        <Stack sx={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <IconButton
              color="secondary"
              size="small"
              onClick={() => onAddToCart(product)}
              sx={{
                width: { xs: 36, md: 44 },
                height: { xs: 36, md: 44 },
                background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
                color: (theme) => theme.palette.secondary.contrastText,
                boxShadow: (theme) => `0 6px 14px ${alpha(theme.palette.secondary.main, 0.45)}`,
                '&:hover': {
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              <AddIcon sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }} />
            </IconButton>
          </motion.div>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}
