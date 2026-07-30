import { Box, Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function Profile() {
  return (
    <div>
      <Typography>My profile</Typography>
      <Button component={Link} to=''>Info</Button>
      <Button component={Link} to='orders'>Orders</Button>

      <Box>
        <Outlet />
      </Box>
    </div>
  )
}
