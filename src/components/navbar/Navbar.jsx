import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router';
import { NavLink } from "react-router";
import useCart from '../../hooks/useCart';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Link from "@mui/material/Link";
import i18n from '../../i18next';
import { AppBar, Avatar, Container, Grid } from '@mui/material';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from 'react';
import useThemeStore from '../../hooks/useThemeStore';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageIcon from '@mui/icons-material/Language';



export default function Navbar() {
  const { data } = useCart();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);


  const { t } = useTranslation();
  const [anchorElLang, setAnchorElLang] = useState(null);
  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleCloseLangMenu();
  };


  const { mode, toggleMode } = useThemeStore();

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

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navbarIconStyles = {
    minWidth: 0,
    borderRadius: 2,
    transition: "all 0.25s ease",

    "&:hover": {
      bgcolor: "action.hover",
      transform: "translateY(-2px)",
    },

    "&:active": {
      transform: "translateY(0)",
    },
  };

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
        sx={(theme) => ({
          bgcolor: theme.palette.custom.navbar,
          color: theme.palette.custom.navcolor
        })}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Grid container spacing={1} sx={{ display: 'flex', flexGrow: 1 }}>

              <Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" 
                  color="inherit" onClick={handleOpenNavMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
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
                <Typography variant="h6" component="div" color='secondary' sx={{ flexGrow: 1, fontWeight: 700 }}>
                  KaShop
                </Typography>
              </Grid>

              <Grid size={{ xs: 0, md: 4 }} sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Link component={NavLink} color="inherit" underline='none' to="/" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold", }, }}>{t('Home')}</Link>
                <Link component={NavLink} color="inherit" underline='none' to="/shop" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold", }, }}>{t('Shop')}</Link>
                <Link component={NavLink} color="inherit" underline='none' to="/contact" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold", }, }}>{t('Contact_Us')}</Link>
                <Link component={NavLink} color="inherit" underline='none' to="/about" sx={{ pb: 1, borderBottom: "2px solid transparent", "&.active": { borderBottomColor: "secondary.main", color: "secondary.main", fontWeight: "bold", }, }}>{t('About')}</Link>
              </Grid>

              <Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: i18n.language === "ar" ? "left" : "right" }}>

                {token ?
                  <>
                    <Link component={NavLink} color="inherit" underline='none' to="/cart">
                      <IconButton aria-label={`View cart with ${cartCount} items`}
                        sx={navbarIconStyles}
                        color="inherit">
                        <ShoppingCartOutlinedIcon color="inherit" fontSize="medium" />
                        <CartBadge badgeContent={cartCount} color="primary" overlap="circular" />
                      </IconButton>
                    </Link>

                    <Button variant='text' color='inherit'
                      sx={navbarIconStyles}
                      onClick={toggleMode}>
                      {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </Button>

                    <IconButton color="inherit" sx={navbarIconStyles} onClick={handleOpenLangMenu}>
                      <LanguageIcon />
                    </IconButton>
                    <Menu anchorEl={anchorElLang} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu}
                      slotProps={{ paper: { sx: { mt: 1, borderRadius: 2, minWidth: 160 } } }}>
                      <MenuItem selected={i18n.language === "en"} onClick={() => handleChangeLanguage("en")}>
                        English
                      </MenuItem>
                      <MenuItem selected={i18n.language === "ar"} onClick={() => handleChangeLanguage("ar")} >
                        العربية
                      </MenuItem>
                    </Menu>

                    <Button color="inherit" underline='none' onClick={handleOpenUserMenu}>
                      <Avatar sx={{ width: 32, height: 32 }} />
                    </Button>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
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
                    <IconButton color="inherit" sx={navbarIconStyles} onClick={handleOpenLangMenu}>
                      <LanguageIcon />
                    </IconButton>
                    <Menu anchorEl={anchorElLang} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu}
                      slotProps={{ paper: { sx: { mt: 1, borderRadius: 2, minWidth: 160 } } }}>
                      <MenuItem selected={i18n.language === "en"} onClick={() => handleChangeLanguage("en")}>
                        English
                      </MenuItem>

                      <MenuItem selected={i18n.language === "ar"} onClick={() => handleChangeLanguage("ar")} >
                        العربية
                      </MenuItem>
                    </Menu>

                    <Link component={NavLink} color="inherit" underline='none' to="/login">{t('Login')}</Link>
                    <Link component={NavLink} color="inherit" underline='none' to="/register">{t('Register')}</Link>
                  </>
                }
              </Grid>

            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box >

  </>
}
