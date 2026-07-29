import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => {
  return createTheme({
    palette:
    {
      mode: mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      custom: {
        navbar: mode === "light" ? "#F2ECF4" : "#494551",
        navcolor: mode === "light" ? "#494551" : "#CBC4D2",
      },
      primary: {
        main: "#FF6B2C",
        contrastText:"#F7F5F3"
      },
      secondary: {
        main: mode === "light" ? "#4F378A" : "#CFBCFF",
      },
      error: {
        main: "#BA1A1A",
      },
      success: {
        main: "#C9A74D",
      },
      background: {
        default: mode === "light" ? "#F2ECF4" : "#1A1A1A",
        paper: mode === "light" ? "#FFFFFF" : "#242424",
      },
      divider: mode === "light" ? "#E0E0E0" : "#333333",
      text: {
        primary: mode === "light" ? "#1A1A1A" : "#F7F5F3",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  })
}

export default getTheme;