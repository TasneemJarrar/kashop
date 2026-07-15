import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Categories from '../../components/categories/Categories';
import Products from '../../components/products/Products';

export default function Home() {
  return (
    <div>
      <Typography variant="h1" component="h2">
        Home
      </Typography>
      <Categories />
      <Products />
    </div>
  )
}
