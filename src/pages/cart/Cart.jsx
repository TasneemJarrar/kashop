import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useDeleteFromCart from '../../hooks/useRemoveFromCart';


export default function Cart() {
  const {mutate:RemoveItem, isPending} = useDeleteFromCart();

  const { data, isLoading, isError, error } = useCart();
  const token = useAuthStore((state) => state.token);

  console.log('data', data);
  if (isLoading) { return <CircularProgress /> }
  if (isError) { return <Box color='red'>Error: {error.message}</Box> }

  return <>
    <Box component="section">

      <Typography component="h2" variant="h4">Cart</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {data.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.totalPrice}$</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" 
                  disabled={isPending}
                  onClick={()=> RemoveItem(item.productId )} >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  </>

}
