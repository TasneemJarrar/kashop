import React, { useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance';
import useProducts from '../../hooks/useProducts';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
 
  return <Box className="products" components="section">
    <Typography variant="h4" component="h2">Products</Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ textAlign: 'center', justifyContent: 'center' }}>
      {data.response.data.map((product) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Link to={`/product/${product.id}`}>
            <Card className='product'>
              <CardMedia
                component="img"
              image={product.image}
                title={product.name}
                sx={{ height: 200, objectFit: 'contain' }}
              />

              <CardContent>
                <Typography variant="h6" component="h3">{product.name}</Typography>
              </CardContent>


            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
}
