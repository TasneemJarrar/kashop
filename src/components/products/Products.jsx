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
  console.log(data.response.data);

  return <Box className="products" components="section">
    <Typography variant="h4" component="h2">Products</Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{textAlign: 'center', justifyContent: 'center'}}>
      {data.response.data.map((product) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Card className='product'>
            <CardMedia
              component="img"
              image={product.image}
              title={product.name}
            />

            <CardContent>
              <Typography variant="h6" component="h3">{product.name}</Typography>
            </CardContent>

            <Link to={`/product/${product.id}`}>
              <Button size="small">Details</Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
}
