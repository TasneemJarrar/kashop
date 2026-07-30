import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import useCheckout from "../../../hooks/useCheckout";

export default function PaymentForm({ onBack }) {

  const [paymentMethod, setPaymentMethod] = useState('');
  const { mutate: checkout, isPending } = useCheckout();



  return <>
    <Box sx={{ p: 4, border: "1px solid", borderColor: 'divider', borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        Payment
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentMethod}
          label="Payment"
          onChange={(e) => setPaymentMethod(e.target.value)}>
          <MenuItem value={'Visa'}>Visa</MenuItem>
          <MenuItem value={'Cash'}>Cash</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" disabled={isPending} onClick={() => checkout({ paymentMethod })}>
        Pay
      </Button>
      <Button variant="contained" onClick={() => onBack}>
        back to review
      </Button>

    </Box>
  </>

}
