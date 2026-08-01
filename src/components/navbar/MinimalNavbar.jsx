import { Button, Container, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useThemeStore from "../../hooks/useThemeStore";
import i18n from "../../i18next";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageIcon from '@mui/icons-material/Language';


export default function MinimalNavbar({ titleKey, closeTo = "/" }) {

  const { t } = useTranslation();
  const navigate = useNavigate();


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

  const navbarIconStyles = {
    minWidth: 0,
    transition: "all 0.25s ease",
    borderRadius: 1,

    "&:hover": {
      "& svg": {
        transform: "scale(1.1)",
      },
    },
    "& svg": {
      transition: "transform .2s ease",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  };


  return <Container maxWidth="lg">
    <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
      <Typography component="h2" variant="h4" sx={{ fontWeight: 700 }}>
        {t(titleKey)}
      </Typography>

      <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>

        <Button variant='text' color='inherit'
          sx={navbarIconStyles}
          onClick={toggleMode}>
          {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </Button>

        <IconButton color="inherit" sx={navbarIconStyles} onClick={handleOpenLangMenu}>
          <LanguageIcon />
        </IconButton>
        <Menu anchorEl={anchorElLang} open={Boolean(anchorElLang)} onClose={handleCloseLangMenu}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 160 } } }}>
          <MenuItem selected={i18n.language === "en"} onClick={() => handleChangeLanguage("en")}>
            English
          </MenuItem>
          <MenuItem selected={i18n.language === "ar"} onClick={() => handleChangeLanguage("ar")} >
            العربية
          </MenuItem>
        </Menu>

        <Button variant="text" color="dark" sx={{
          "&:hover": {
            transform: "scale(1.5)",
            color: "error.main",
          },
          transition: "all 0.3s ease",
          p: 0, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0,
        }} onClick={() => navigate(closeTo)}>
          <CloseIcon />
        </Button>
      </Stack>
    </Stack>
  </Container>
}
