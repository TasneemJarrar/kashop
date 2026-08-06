import { createTheme } from '@mui/material/styles';
import heroLight from "./assets/heroLight.png";
import heroDark from "./assets/heroDark.png";

const getTheme = (mode, language) => {
  const isLight = mode === "light";
  const isArabic = language === "ar";

  return createTheme({
    direction: isArabic ? 'rtl' : 'ltr',
    palette:
    {
      mode: mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      custom: {
        navbar:
        {
          background: isLight ? "#F2ECF4" : "#494551",
          text: isLight ? "#494551" : "#CBC4D2"
        },
        hero: {
          image: isLight ? heroLight : heroDark,
          overlay: isLight
            ? "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 75%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%)",
        },
      },
      primary: {
        main: "#FF6B2C",
        light: "#FF8E5E",
        dark: "#D9551E",
        contrastText: "#F7F5F3",
      },
      secondary: {
        main: isLight ? "#4F378A" : "#CFBCFF",
        light: isLight ? "#7B61B8" : "#E3D8FF",
        dark: isLight ? "#382461" : "#B69EFF",
        contrastText: isLight ? "#FFFFFF" : "#1A1A1A",
      },
      error: {
        main: "#BA1A1A",
        light: "#E57373",
        dark: "#8C1515",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#ED6C02",
        light: "#FFB74D",
        dark: "#E65100",
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#0288D1",
        light: "#4FC3F7",
        dark: "#01579B",
        contrastText: "#FFFFFF",
      },
      success: {
        main: isLight ? "#4A7C3C" : "#8BC34A",
        light: isLight ? "#7CAE6C" : "#A5D66C",
        dark: isLight ? "#2E5522" : "#6B9A3A",
        contrastText: isLight ? "#FFFFFF" : "#1A1A1A",
      },
      grey: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
      background: {
        default: isLight ? "#F2ECF4" : "#1A1A1A",
        paper: isLight ? "#FFFFFF" : "#242424",
      },
      divider: isLight ? "#E0E0E0" : "#333333",
      text: {
        primary: isLight ? "#1A1A1A" : "#F7F5F3",
        secondary: isLight ? "#5F6368" : "#B0B0B0",
        disabled: isLight ? "#9E9E9E" : "#6B6B6B",
      },
      action: {
        active: isLight ? "#4F378A" : "#CFBCFF",
        hover: isLight
          ? "rgba(79,55,138,0.08)"
          : "rgba(207,188,255,0.08)",
        selected: isLight
          ? "rgba(79,55,138,0.12)"
          : "rgba(207,188,255,0.16)",
        disabled: isLight
          ? "rgba(0,0,0,0.26)"
          : "rgba(255,255,255,0.3)",
        disabledBackground: isLight
          ? "rgba(0,0,0,0.12)"
          : "rgba(255,255,255,0.12)",
        focus: isLight
          ? "rgba(79,55,138,0.12)"
          : "rgba(207,188,255,0.16)",
      },
    },
    typography: {
      fontFamily: isArabic
        ? "'Almarai', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  })
}

export default getTheme;