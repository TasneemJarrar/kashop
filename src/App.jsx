import { useEffect, useRef, useState } from 'react'
import { RouterProvider } from 'react-router'
import router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './i18next'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import { Box, CssBaseline } from '@mui/material'
import useThemeStore from './hooks/useThemeStore'
import { CacheProvider } from '@emotion/react';
import { cacheRtl, cacheLtr } from './rtlCache';
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

const VIEW_SELECTOR = '[data-cursor="view"]';

const getCursorEnabled = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(pointer: coarse)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const mode = useThemeStore((state) => state.mode);

  const theme = getTheme(mode, i18n.language);

  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  const [cursorEnabled] = useState(getCursorEnabled);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (!cursorEnabled) return;

    document.body.classList.add('kashop-custom-cursor');

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      setIsView(!!e.target.closest(VIEW_SELECTOR));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    let frameId;
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.15;
      position.current.y += (mouse.current.y - position.current.y) * 0.15;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('kashop-custom-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, [cursorEnabled]);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return <>
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '14px',
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />

          {cursorEnabled && (
            <>
              <Box ref={outlineRef}
                sx={{
                  position: 'fixed', top: 0, left: 0,
                  width: isView ? 64 : 40, height: isView ? 64 : 40,
                  borderRadius: '50%', border: isView ? 0 : 1.5, borderStyle: 'solid', borderColor: 'secondary.main',
                  bgcolor: isView ? 'secondary.main' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 9999, transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border 0.25s ease',
                }}>
                {isView && (
                  <Box component="span"
                    sx={{ color: 'secondary.contrastText', fontFamily: theme.typography.button.fontFamily, fontWeight: 700, fontSize: 12, letterSpacing: '0.02em' }}>
                    View
                  </Box>
                )}
              </Box>

              <Box ref={dotRef}
                sx={{ position: 'fixed', top: 0, left: 0, width: 12, height: 12, borderRadius: '50%', bgcolor: 'secondary.main', opacity: isView ? 0 : 1, pointerEvents: 'none', zIndex: 9999, transition: 'opacity 0.15s ease' }} />
            </>
          )}
        </ThemeProvider >
      </QueryClientProvider>
    </CacheProvider>
  </>
}