import { Button } from "@mui/material";

export default function ReviewOrder({onContinue}) {
  return (
    <div>
      <Button onClick={onContinue}>
        payment
      </Button>
    </div>
  )
}
