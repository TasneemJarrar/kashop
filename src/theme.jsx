import { createTheme } from '@mui/material/styles';
import heroLight from "./assets/hero/heroLight.webp";
import heroDark from "./assets/hero/heroDark.webp";

const getTheme = (mode, language) => {
  const isLight = mode === "light";
  const isRTL = language === "ar";

  const displayFont = isRTL
    ? "'IBM Plex Sans Arabic', sans-serif"
    : "'Fraunces', serif";

  const bodyFont = isRTL
    ? "'IBM Plex Sans Arabic', sans-serif"
    : "'Plus Jakarta Sans', sans-serif";

  return createTheme({
    direction: isRTL ? 'rtl' : 'ltr',

    palette: {
      mode: mode,

      common: {
        black: "#000",
        white: "#fff",
      },

      custom: {
        navbar: {
          background: isLight ? "#FBF7EF" : "#211C15",
          text: isLight ? "#33301F" : "#E9E1D0"
        },

        hero: {
          image: isLight ? heroLight : heroDark,
          overlay: isLight
            ? "linear-gradient(90deg, rgba(246,241,231,0.82) 0%, rgba(246,241,231,0.4) 45%, rgba(246,241,231,0) 75%)"
            : "linear-gradient(90deg, rgba(20,17,12,0.85) 0%, rgba(20,17,12,0.45) 45%, rgba(20,17,12,0) 75%)",
        },
      },

      primary: {
        main: isLight ? "#4B5D3A" : "#9BB37F",
        light: isLight ? "#7C9467" : "#C3D6AE",
        dark: isLight ? "#333F27" : "#7C9467",
        contrastText: isLight ? "#FBF7EF" : "#14180F",
      },

      secondary: {
        main: isLight ? "#B87D22" : "#E3AE5D",
        light: isLight ? "#D6A652" : "#EFC685",
        dark: isLight ? "#8A5C15" : "#B87D22",
        contrastText: isLight ? "#FBF7EF" : "#1A1508",
      },

      error: {
        main: "#B3432B",
        light: "#D97A5F",
        dark: "#832C19",
        contrastText: "#FFFFFF",
      },

      warning: {
        main: "#C4791E",
        light: "#E3A24F",
        dark: "#8F5712",
        contrastText: "#1A1508",
      },

      info: {
        main: "#3C6E8F",
        light: "#6C9BB8",
        dark: "#274A61",
        contrastText: "#FFFFFF",
      },

      success: {
        main: isLight ? "#3F6B34" : "#8FBC74",
        light: isLight ? "#6E9459" : "#B3D699",
        dark: isLight ? "#294821" : "#6E9459",
        contrastText: isLight ? "#FBF7EF" : "#14180F",
      },

      grey: {
        50: "#FBF9F4",
        100: "#F3EEE3",
        200: "#E7DFCE",
        300: "#D6CAB0",
        400: "#B8A98A",
        500: "#93856A",
        600: "#71654E",
        700: "#544A38",
        800: "#3A3226",
        900: "#221E16",
      },

      background: {
        default: isLight ? "#F6F1E7" : "#17140F",
        paper: isLight ? "#FFFFFF" : "#221E16",
      },

      divider: isLight ? "#E5DCC8" : "#33301F",

      text: {
        primary: isLight ? "#231F16" : "#F3EEE3",
        secondary: isLight ? "#6B6250" : "#B8A98A",
        disabled: isLight ? "#A79A80" : "#5B5340",
      },

      action: {
        active: isLight ? "#4B5D3A" : "#9BB37F",

        hover: isLight
          ? "rgba(75,93,58,0.08)"
          : "rgba(155,179,127,0.10)",

        selected: isLight
          ? "rgba(75,93,58,0.14)"
          : "rgba(155,179,127,0.18)",

        disabled: isLight
          ? "rgba(35,31,22,0.26)"
          : "rgba(243,238,227,0.3)",

        disabledBackground: isLight
          ? "rgba(35,31,22,0.10)"
          : "rgba(243,238,227,0.10)",

        focus: isLight
          ? "rgba(75,93,58,0.14)"
          : "rgba(155,179,127,0.18)",
      },
    },

    typography: {
      fontFamily: bodyFont,

      h1: {
        fontFamily: displayFont,
        fontWeight: isRTL ? 700 : 600,
        letterSpacing: isRTL ? 0 : '-0.01em',
      },

      h2: {
        fontFamily: displayFont,
        fontWeight: isRTL ? 700 : 600,
        letterSpacing: isRTL ? 0 : '-0.01em',
      },

      h3: {
        fontFamily: displayFont,
        fontWeight: 600,
      },

      h4: {
        fontFamily: displayFont,
        fontWeight: 600,
      },

      h5: {
        fontFamily: displayFont,
        fontWeight: 600,
      },

      h6: {
        fontFamily: displayFont,
        fontWeight: 600,
      },

      button: {
        fontFamily: bodyFont,
        textTransform: 'none',
        fontWeight: 700,
      },

      overline: {
        fontFamily: bodyFont,
        letterSpacing: isRTL ? 0 : '0.14em',
        fontWeight: 700,
      },
    },

    shape: {
      borderRadius: 14,
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 22,
            paddingRight: 22,
          },

          sizeLarge: {
            paddingTop: 12,
            paddingBottom: 12,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 18,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 700,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};

export default getTheme;