import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProductDetails() {
  const {id} = useParams();
  const { data, isLoading, isError, error } = useProduct(id);
  

  if (isLoading) { return <CircularProgress /> }
  if (isError) { return <div>Error: {error.message}</div> }

  return (
    <Box>
      <Typography variant="h4" component="h2">{data.response.name}</Typography>
      <Typography variant="body1" component="p">{data.response.description}</Typography>
    </Box>
  )
}
