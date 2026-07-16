import useAuthStore from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useDeleteFromCart from '../../hooks/useRemoveFromCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function Cart() {
  const {mutate:RemoveItem, isPending} = useDeleteFromCart();
  const {mutate:UpdateItem, isPending: updateItemPending} = useUpdateCartItem();

  const { data, isLoading, isError, error } = useCart();
  const token = useAuthStore((state) => state.token);

  const handleUpdate = (productId, action)=>{
    const item = data.items.find(i=>i.productId==productId);
    if(action == '+'){
    UpdateItem({productId, count: item.count+1})
    } else {
      if (item.count === 1) {
        RemoveItem(productId);
        return;
      }
      UpdateItem({productId, count: item.count-1})
    }
  }

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

            {data?.items?.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>
                  <Box sx={{display:'flex', gap:'1', alignItems:'center'}}>
                  <IconButton size='small'>
                    <RemoveIcon fontSize="small" onClick ={()=>handleUpdate (item.productId, '-')}/>
                  </IconButton>
                  <Typography>
                  {item.count}
                  </Typography>
                  <IconButton size='small'>
                    <AddIcon fontSize="small" onClick ={()=>handleUpdate (item.productId, '+')}/>
                  </IconButton>
                  </Box>
                  </TableCell>
                <TableCell>{item.totalPrice}$</TableCell>
                <TableCell>
                  <IconButton color="error" 
                  disabled={isPending}
                  onClick={()=> RemoveItem(item.productId )} >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  </>

}
