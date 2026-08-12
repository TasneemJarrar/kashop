import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './i18next'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import { CssBaseline } from '@mui/material'
import useThemeStore from './hooks/useThemeStore'
import { CacheProvider } from '@emotion/react';
import { cacheRtl, cacheLtr } from './rtlCache';



const queryClient = new QueryClient();

export default function App() {

  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";


  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;

  },
    [i18n.language]);

  const mode = useThemeStore((state) => state.mode);

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={getTheme(mode, i18n.language)}>
          <CssBaseline />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </ThemeProvider >
      </QueryClientProvider>
    </CacheProvider>

  )
}

