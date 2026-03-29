import { Box, InputBase, IconButton, Toolbar, Button, Typography } from '@mui/material'
import { ChevronDown, SearchIcon } from 'lucide-react'

export default function SearchBar() {
  return (
    <Toolbar sx={{display:'flex',backgroundColor:'#01A49E', color:'#fff', borderRadius:'10px'}}>
      <Box sx={{display:'flex', alignItems:'center', gap:5, width:'100%'}}>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:1, backgroundColor:'#fff', py:"4px", px:1, borderRadius:5}}>
          <Button variant="text" sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'4px',fontSize:".7rem", fontWeight:700, color:'#000', borderRadius:5, textTransform:'none'}}>All Categories <ChevronDown size={20} /></Button>
          <InputBase 
            placeholder="Search anything..." 
            sx={{ flex:1, color:"#000", fontSize:".7rem", width:'300px'}}
            />
          <Button variant="text" sx={{px:0, borderRadius:'50%', width:30, height:30}}>  <SearchIcon color='#000' size={18} /></Button>
        </Box>

        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',width:'100%', color:'#FFF', textTransform:'uppercase'}}>
          <Typography variant="body2" component="p" sx={{fontSize:'.7rem'}}>
            free shipping over $199
          </Typography>
          <Typography variant="body2" component="p" sx={{fontSize:'.7rem'}}>
            30 days money back
          </Typography>
          <Typography variant="body2" component="p" sx={{fontSize:'.7rem'}}>
            100% secure payment
          </Typography>
        </Box>
      </Box>
    </Toolbar>

  )
}