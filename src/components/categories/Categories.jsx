import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import UseCategories from '../../hooks/UseCategories';

export default function Categories() {
  const {data, isLoading, isError, error} = UseCategories();
  
  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography color="error">
      {error.message}
    </Typography> 
  }

  return (
    <div>
      {console.log(data.response.data)}
      {data.response.data.map((category) => {
        return(
          <Typography>
            {category.name}
          </Typography>
        )
      })}
    </div>
  )
}
