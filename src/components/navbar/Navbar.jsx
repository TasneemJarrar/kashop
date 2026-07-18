import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router';
import { NavLink } from "react-router";
import useCart from '../../hooks/useCart';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Link from "@mui/material/Link";
import i18n from '../../i18next';
import { Avatar, Grid } from '@mui/material';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Navbar() {
  const { data } = useCart();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();
  const changeLanguage = () => {
    const newLng = i18n.language == "ar" ? "en" : "ar";
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

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='light'>
        <Toolbar>
          <Grid container spacing={1} sx={{display:'flex', flexGrow:1}}>

<Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Menu anchorElNav={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}>
            <MenuItem component={NavLink}
              to="/"
              onClick={handleCloseNavMenu}>
              {t("Home")}
            </MenuItem>

            <MenuItem component={NavLink}
              to="/shop"
              onClick={handleCloseNavMenu}>
              {t("Shop")}
            </MenuItem>

            <MenuItem component={NavLink}
              to="/contact"
              onClick={handleCloseNavMenu}>
              {t("Contact_Us")}
            </MenuItem>

            <MenuItem component={NavLink}
              to="/about"
              onClick={handleCloseNavMenu}>
              {t("About")}
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KASHOP
          </Typography>
</Grid>

          <Grid size={{ xs: 0, md: 4 }} sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Link component={NavLink} color="inherit" underline='none' to="/" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold",}, }}>{t('Home')}</Link>
            <Link component={NavLink} color="inherit" underline='none' to="/shop" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold",}, }}>{t('Shop')}</Link>
            <Link component={NavLink} color="inherit" underline='none' to="/contact" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold",}, }}>{t('Contact_Us')}</Link>
            <Link component={NavLink} color="inherit" underline='none' to="/about" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold",}, }}>{t('About')}</Link>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: i18n.language === "ar" ? "left" : "right"}}>

            {token ?
              <>
                <Link component={NavLink} color="inherit" underline='none' to="/cart">
                  <IconButton aria-label={`View cart with ${cartCount} items`} color="inherit">
                    <ShoppingBagOutlinedIcon color="inherit" fontSize="medium" />
                    <CartBadge badgeContent={cartCount} color="secondary" overlap="circular" />
                  </IconButton>
                </Link>
                <Button variant='text' color='inherit' sx={{minWidth:0}} onClick={changeLanguage}>
                  {i18n.language === 'ar' ? 'EN' : 'AR'}
                </Button>
                <Button color="inherit" underline='none' onClick={handleOpenUserMenu}>
                  <Avatar sx={{ width: 32, height: 32 }} />
                </Button>
                <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/login" color="inherit" underline='none' component="button" onClick={handleLogout}>
                  {t('Logout')}
                </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/profile" color="inherit" underline='none' component={NavLink}>
                  {t('Edit_Profile')}
                </Link>
                </MenuItem>
            
            </Menu>
              </> :
              <>
                <Button variant='text' color='inherit' onClick={changeLanguage}>
                  {i18n.language === 'ar' ? 'EN' : 'AR'}
                </Button>
                <Link component={NavLink} color="inherit" underline='none' to="/login">{t('Login')}</Link>
                <Link component={NavLink} color="inherit" underline='none' to="/register">{t('Register')}</Link>
              </>
            }
          </Grid>

</Grid>
        </Toolbar>
      </AppBar>
    </Box>

  </>
}
