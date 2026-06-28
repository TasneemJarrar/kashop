import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Categories from '../../components/categories/Categories';

export default function Home() {
  return (
    <div>
      <Typography variant="h1" component="h2">
        Home
      </Typography>
      <Button variant="outlined">Contained</Button>
      <Categories />
    </div>
  )
}
