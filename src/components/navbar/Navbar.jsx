import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate, NavLink } from 'react-router';
import useCart from '../../hooks/useCart';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';
import i18n from '../../i18next';
import { AppBar, Avatar, Container, Divider, Grid, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useThemeStore from '../../hooks/useThemeStore';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useLocation } from 'react-router';


const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
    right: 0;
  }
`;

const ActionCluster = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  borderRadius: 999,
  padding: '4px',
  backgroundColor: alpha(theme.palette.text.primary, 0.04),
}));

const navbarIconStyles = {
  minWidth: 0,
  borderRadius: 999,
  transition: 'all 0.25s ease',
  '&:hover': {
    backgroundColor: 'transparent',
    '& svg': { transform: 'scale(1.12)' },
  },
  '& svg': { transition: 'transform .2s ease' },
};

const NavItem = styled(Link)({
  position: 'relative',
  fontWeight: 600,
  fontSize: '1rem',
  paddingBottom: 6,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    borderRadius: 2,
    backgroundColor: 'secondary.main',
    transform: 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.25s ease',
  },
  '&.active::after': { transform: 'scaleX(1)' },
  '&.active': { color: 'secondary.main' },
  '&:hover::after': { transform: 'scaleX(1)' },
});

export default function Navbar() {
  const { data } = useCart();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();
  const location = useLocation();
  const { mode, toggleMode } = useThemeStore();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenLangMenu = (e) => setAnchorElLang(e.currentTarget);
  const handleCloseLangMenu = () => setAnchorElLang(null);
  const handleChangeLanguage = (lang) => { i18n.changeLanguage(lang); handleCloseLangMenu(); };
  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleLogout = () => { logout(); navigate('/login'); };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cartCount = data?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        zIndex:99,
        backgroundColor: alpha(theme.palette.custom.navbar.background, scrolled ? 0.8 : 1),
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        color: theme.palette.custom.navbar.text,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid transparent' : `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
      })}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Grid container spacing={1} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>

            <Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton
                aria-label="open navigation menu"
                onClick={handleOpenNavMenu}
                sx={{ display: { xs: 'flex', md: 'none' }, ...navbarIconStyles }}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                slotProps={{ paper: { sx: { minWidth: 220, mt: 1, borderRadius: 2 } } }}>
                <MenuItem component={NavLink} to="/" onClick={handleCloseNavMenu}><ListItemText>{t('Home')}</ListItemText></MenuItem>
                <MenuItem component={NavLink} to="/shop" onClick={handleCloseNavMenu}><ListItemText>{t('Shop')}</ListItemText></MenuItem>
                <MenuItem component={NavLink} to="/contact" onClick={handleCloseNavMenu}><ListItemText>{t('Contact_Us')}</ListItemText></MenuItem>
                <MenuItem component={NavLink} to="/about" onClick={handleCloseNavMenu}><ListItemText>{t('About')}</ListItemText></MenuItem>

                <Divider sx={{ my: 1, display: { xs: 'block', md: 'none' } }} />

                <MenuItem onClick={() => { toggleMode(); handleCloseNavMenu(); }} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <ListItemIcon>{mode === 'light' ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}</ListItemIcon>
                  <ListItemText>{mode === 'light' ? t('Dark_Mode') : t('Light_Mode')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleChangeLanguage('en')} selected={i18n.language === 'en'} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <ListItemIcon>{i18n.language === 'en' ? <CheckIcon fontSize="small" /> : <LanguageIcon fontSize="small" />}</ListItemIcon>
                  <ListItemText>English</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleChangeLanguage('ar')} selected={i18n.language === 'ar'} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <ListItemIcon>{i18n.language === 'ar' ? <CheckIcon fontSize="small" /> : <LanguageIcon fontSize="small" />}</ListItemIcon>
                  <ListItemText>العربية</ListItemText>
                </MenuItem>
              </Menu>

              <Typography variant="h6" component="div" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
                KaShop
              </Typography>
            </Grid>

            <Grid size={{ md: 4 }} sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              <NavItem component={NavLink} color="inherit" underline="none" to="/">{t('Home')}</NavItem>
              <NavItem component={NavLink} color="inherit" underline="none" to="/shop">{t('Shop')}</NavItem>
              <NavItem component={NavLink} color="inherit" underline="none" to="/contact">{t('Contact')}</NavItem>
              <NavItem component={NavLink} color="inherit" underline="none" to="/about">{t('About')}</NavItem>
            </Grid>

            <Grid size={{ xs: 6, md: 4 }} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', justifyContent: 'flex-end' }}>

              {token ? (
                <>
                  <ActionCluster sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton sx={navbarIconStyles} onClick={toggleMode} color="inherit">
                      {mode === 'light' ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ my: 0.75 }} />
                    <IconButton sx={navbarIconStyles} onClick={handleOpenLangMenu} color="inherit">
                      <LanguageIcon fontSize="small" />
                    </IconButton>
                  </ActionCluster>

                  <Menu anchorEl={anchorElLang} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu}
                    slotProps={{ paper: { sx: { mt: 1, minWidth: 160, borderRadius: 2 } } }}>
                    <MenuItem selected={i18n.language === 'en'} onClick={() => handleChangeLanguage('en')}>English</MenuItem>
                    <MenuItem selected={i18n.language === 'ar'} onClick={() => handleChangeLanguage('ar')}>العربية</MenuItem>
                  </Menu>

                  <Link component={NavLink} to="/cart" underline="none">
                    <IconButton aria-label={`View cart with ${cartCount} items`} sx={navbarIconStyles} color="inherit">
                      <LocalMallOutlinedIcon fontSize="medium" />
                      <CartBadge badgeContent={cartCount} color="primary" overlap="circular" />
                    </IconButton>
                  </Link>

                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}/>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={NavLink} to="/profile" onClick={handleClose} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {t('My Account')} <Avatar />
                    </MenuItem>
                    <Divider />
                    <MenuItem component={NavLink} to="/profile" onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      {t('Add another account')}
                    </MenuItem>
                    <MenuItem component={NavLink} to="/profile" onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      {t('Settings')}
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleClose();
                      handleLogout();
                    }}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      {t('Logout')}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <ActionCluster sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton sx={navbarIconStyles} onClick={toggleMode} color="inherit">
                      {mode === 'light' ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ my: 0.75 }} />
                    <IconButton sx={navbarIconStyles} onClick={handleOpenLangMenu} color="inherit">
                      <LanguageIcon fontSize="small" />
                    </IconButton>
                  </ActionCluster>

                  <Menu anchorEl={anchorElLang} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu}
                    slotProps={{ paper: { sx: { mt: 1, minWidth: 160, borderRadius: 2 } } }}>
                    <MenuItem selected={i18n.language === 'en'} onClick={() => handleChangeLanguage('en')}>English</MenuItem>
                    <MenuItem selected={i18n.language === 'ar'} onClick={() => handleChangeLanguage('ar')}>العربية</MenuItem>
                  </Menu>

                  <Button color="inherit" underline="hover" onClick={() =>navigate('/login', { state: { from: location.pathname } })} sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {t('Login')}
                  </Button>
                  <Button component={NavLink} to="/register" variant="contained" color="secondary" size="small" sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: 4, px: 2.5, textTransform: 'none', fontWeight: 600 }}>
                    {t('Register')}
                  </Button>
                </>
              )}
            </Grid>

          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}