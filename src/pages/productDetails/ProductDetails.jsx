import React from 'react'
import useProduct from '../../hooks/useProduct'
import { useParams } from 'react-router';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductDetails() {
  const {mutate: addToCart} = useAddToCart();
  const {id} = useParams();
  const { data, isLoading, isError, error } = useProduct(id);

  if (isLoading) { return <CircularProgress /> }
  if (isError) { return <div>Error: {error.message}</div> }

  return (
    <Box>
      <Typography variant="h4" component="h2">{data.response.name}</Typography>
      <Typography variant="body1" component="p">{data.response.description}</Typography>
      <Button onClick={() => {addToCart({ productId: data.response.id, count: 1 })}}>
        Add to Cart
      </Button>
    </Box> 
  )
}
