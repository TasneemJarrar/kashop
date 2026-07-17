import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import { Link as RouterLink, useNavigate } from 'react-router';
import useCart from '../../hooks/useCart';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Link from "@mui/material/Link";
import i18n from '../../i18next';

export default function Navbar() {
  const { data } = useCart();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();
  const changeLanguage = () => {
    const newLng= i18n.language=="ar"?"en":"ar";
    i18n.changeLanguage(newLng);
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const cartCount = data?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -2px;
  }
`;



  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KASHOP
          </Typography>

          <Button variant='text' color='inherit' onClick={changeLanguage}>
              {i18n.language === 'ar'? 'EN':'AR'}
            </Button>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>            
            <Link component={RouterLink} color="inherit" underline='none' to="/">{t('Home')}</Link>
            {token ?
              <>

                <Link to="/login" color="inherit" underline='none' component="button" onClick={handleLogout}>
                  {t('Logout')}
                </Link>
                <Link component={RouterLink} color="inherit" underline='none' to="/cart">
                  <IconButton aria-label={`View cart with ${cartCount} items`} color="inherit">
                    <ShoppingCartIcon color="inherit" fontSize="small" />
                    <CartBadge badgeContent={cartCount} color="secondary" overlap="circular" />
                  </IconButton>
                </Link>
              </> :
              <>
                <Link component={RouterLink} color="inherit" underline='none' to="/login">{t('Login')}</Link>
                <Link component={RouterLink} color="inherit" underline='none' to="/register">{t('Rigister')}</Link>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  </>
}
