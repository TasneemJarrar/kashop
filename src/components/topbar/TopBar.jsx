// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, Link } from "@mui/material";
// router dom
import { Link as RouterLink} from "react-router-dom";
import { ChevronDown } from "lucide-react";
// icons

export default function TopBar() {
  return (
    <Toolbar sx={{display:'flex'}}>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}}>
          <Typography component="p" variant="body2" sx={{display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:'#ebeef6c8', borderRadius:1, padding:1 }}> Hotline 24/7</Typography>
          <Typography component="p" variant="body2" sx={{fontWeight:600, fontSize:'.8rem'}}> (025) 3886 25 16</Typography>
        </Box>

        <Box  sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}}>
          <Link component={RouterLink} to={'/'} color="inherit" underline='none'>Sell on Swoo</Link>
          <Link component={RouterLink} to={'/'} color="inherit" underline='none'>Order Tracki</Link>
          <Button variant="text" color="inherit" sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'4px'}}>USA <ChevronDown size={20} /></Button>
          <Button variant="text" color="inherit" sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'4px'}}>
            <Avatar src="/src/assets/usa.svg" alt="flag" sx={{ width: 20, height: 20 }} />
           ENG <ChevronDown size={20} /></Button>
        </Box>
      </Box>
    </Toolbar>
  )
}
