import React, { useEffect } from 'react'
import {RouterProvider } from 'react-router'
import router from './Router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  './i18next'
import i18n from './i18next'
import { useTranslation } from 'react-i18next'


export default function App() {

  const {i18n} = useTranslation();

  useEffect(()=>{
    const dir = i18n.language === "ar"? "rtl":"ltr";
    document.documentElement.dir = dir;

  },
  [i18n.language]);
  
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
