// MUI
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Link, Button } from "@mui/material";
// router dom
import { Link as RouterLink} from "react-router-dom";
// icons
import { ShoppingCart, Heart, LogIn, Menu, ChevronDown  } from 'lucide-react';

export default function ToolBar() {
  return (
    <Toolbar sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Box sx={{ display:'flex', gap:5, alignItems:'center',justifyContent:'center' }}>
            <Box sx={{ display:'flex', gap:1, alignItems:'center',justifyContent:'center'}}>
            <Avatar src="/src/assets/logo.svg" alt="logo" sx={{ width: 40, height: 40}} />
            <Link variant="h6" component={RouterLink} to={'/'} color="inherit" underline='none' sx={{fontWeight:600}}>
              KASHOP
            </Link>
            </Box>

            <Box sx={{display:{xs:'none', md:'flex'}, gap:2, alignItems:'center', fontSize:".8rem", fontWeight:700}}>
              <Link component={RouterLink} to={'/'} color="inherit" underline='none'>HOME</Link>
              <Button variant="text" color="inherit" sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'4px',fontSize:".8rem", fontWeight:700}}>CATEGORIES <ChevronDown size={20} /></Button>
              <Button variant="text" color="inherit" sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'4px',fontSize:".8rem", fontWeight:700}}>PRODUCTS <ChevronDown size={20} /></Button>
              <Link component={RouterLink} to={'/'} color="inherit" underline='none'>CONTACT</Link>
            </Box>
          </Box>

          <Box sx={{display:{xs:'none', md:'flex'}, gap:2, alignItems:'center'}}>
            <Link component={RouterLink} to={'/auth/login'} color="inherit" underline='none'>
              <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:45, height:45, backgroundColor:'#ebeef6c8', borderRadius:'50%', padding:1 }}>
                  <LogIn  color="black" size={24} strokeWidth={1.5} />
                </Box>
                <Box sx={{}}>
                <Typography sx={{color:'#666666', fontSize:".7rem"}} variant="body2" component="p" >WELCOME</Typography>
                <Typography sx={{fontWeight:700, fontSize:".8rem"}} variant="body2" component="p">log in / Register</Typography>
                </Box>
              </Box>
            </Link>

            <Link component={RouterLink} to={'/cart'} color="inherit" underline='none'>
              <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:45, height:45, backgroundColor:'#ebeef6c8', borderRadius:'50%', padding:1 }}>
                  <Heart  color="black" size={24} strokeWidth={1.5} />
                </Box>
                <Box sx={{}}>
                <Typography sx={{color:'#666666', fontSize:".7rem"}} variant="body2" component="p" >Favourites</Typography>
                <Typography sx={{fontWeight:700, fontSize:".8rem"}} variant="body2" component="p">4 items</Typography>
                </Box>
              </Box>
            </Link>

            <Link component={RouterLink} to={'/cart'} color="inherit" underline='none'>
              <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:45, height:45, backgroundColor:'#ebeef6c8', borderRadius:'50%', padding:1 }}>
                  <ShoppingCart color="black" size={24} strokeWidth={1.5} />
                </Box>
                <Box sx={{}}>
                <Typography sx={{color:'#666666', fontSize:".7rem"}} variant="body2" component="p" >CART</Typography>
                <Typography sx={{fontWeight:700, fontSize:".8rem"}} variant="body2" component="span">$1,689.00</Typography>
                </Box>
              </Box>
            </Link>
          </Box>

          <IconButton color="inherit" sx={{display:{xs:'block', md:'none'}}}>
            <Menu />
          </IconButton>

        </Toolbar>
  )
}
