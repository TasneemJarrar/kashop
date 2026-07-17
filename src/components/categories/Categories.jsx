import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import useCategories from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories();
  const {t} = useTranslation();
  

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography color="error">
      {error.message}
    </Typography>
  }

  return (
    <Container sx={{paddingTop:5}}>
      <Box>
        <Typography variant='h2' sx={{ mb: 2 }}>{t('Categories')}</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {data?.response?.data?.map((category) => {
            return (
              <Button key={category.id} variant="text" sx={{ padding: 4, display: "flex", justifyContent: "center", alignItems: "center",boxShadow:3 }}>
                {category.name}
              </Button>
            )
          })}
        </Box>
      </Box>
    </Container>
  )
}
