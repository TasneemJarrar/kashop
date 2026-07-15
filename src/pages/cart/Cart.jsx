import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';


export default function Cart() {

  const { data, isLoading, isError, error} = useCart();
  const token = useAuthStore((state) => state.token);

  console.log('data', data);
  if(isLoading) { return <CircularProgress /> }
  if(isError) { return <Box color='red'>Error: {error.message}</Box> }

  return <>
  <Box component="section">

  <Typography component="h2" variant="h4">Cart</Typography>
  <TableContainer>
    <Table>
      <TableHead>
        <TableCell>Product</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>

    <TableBody>

    {data.items.map((item) => (
    <TableRow key={item.productId}>
      <TableCell>{item.productName}</TableCell>
      <TableCell>{item.price}$</TableCell>
      <TableCell>{item.count}</TableCell>
      <TableCell>{item.totalPrice}$</TableCell>
    </TableRow>
    ))}

    </TableBody>
    
    </Table>

  </TableContainer>
    
  </Box>
  </>
  
}
