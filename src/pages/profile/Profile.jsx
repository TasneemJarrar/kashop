import { Avatar, Box, Card, Container, Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import useAuthStore from "../../store/useAuthStore";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const navItems = [
  { to: '', end: true, icon: PersonOutlineRoundedIcon, labelKey: 'Info' },
  { to: 'orders', end: false, icon: ReceiptLongOutlinedIcon, labelKey: 'Orders' },
  { to: 'update-password', end: false, icon: LockResetRoundedIcon, labelKey: 'Update_Password' },
];

const getInitials = (fullName, userName) => {
  if (fullName?.trim()) {
    const parts = fullName.trim().split(/\s+/);
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return userName ? userName.slice(0, 2).toUpperCase() : "?";
}

function NavItem({ to, end, icon: Icon, label, color = 'text.secondary', onClick }) {
  const sharedSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 2,
    py: 1.25,
    borderRadius: 2,
    textDecoration: 'none',
    color,
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      bgcolor: 'action.hover'
    }
  };

  if (onClick) {
    return (
      <Box component="button" type="button" onClick={onClick} sx={{ ...sharedSx, border: 0, bgcolor: 'transparent', width: '100%', textAlign: 'inherit', font: 'inherit' }}>
        <Icon fontSize="small" />
        {label}
      </Box>
    );
  }

  return (
    <Box component={NavLink}
      to={to}
      end={end}
      sx={{
        ...sharedSx,
        '&.active': {
          bgcolor: 'action.selected',
          color: 'primary.main',
        },
      }}
    >
      <Icon fontSize="small" />
      {label}
    </Box>
  );
}

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile, isLoading } = useProfile();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = getInitials(profile?.fullName);

  return (
    <Box component="section" sx={{ py: 4, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: 3, py: 3 }}>
                {isLoading ? (
                  <>
                    <Skeleton variant="circular" width={72} height={72} />
                    <Skeleton variant="text" width={120} height={28} sx={{ mt: 1.5 }} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Avatar sx={{ width: 72, height: 72, bgcolor: 'secondary.main', color: 'secondary.contrastText', fontFamily: (theme) => theme.typography.h5.fontFamily, fontSize: 26, fontWeight: 700 }}>
                      {initials}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1.5 }}>
                      {profile?.fullName || profile?.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                      {profile?.email}
                    </Typography>
                  </>
                )}
              </Box>

              <Divider />

              <Stack component="nav" spacing={0.5} sx={{ p: 1 }}>
                {navItems.map(({ to, end, icon, labelKey }) => (
                  <NavItem key={labelKey} to={to} end={end} icon={icon} label={t(labelKey)} />
                ))}
              </Stack>

              <Divider />

              <Stack sx={{ p: 1 }}>
                <NavItem
                  icon={LogoutRoundedIcon}
                  label={t('Logout')}
                  color="error.main"
                  onClick={handleLogout}
                />
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}