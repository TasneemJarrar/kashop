import React from "react";
// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Link } from "@mui/material";
// router dom
import { Link as RouterLink} from "react-router-dom";
// icons
import { ShoppingCart, Heart, LogIn, Menu  } from 'lucide-react';
// Components
import ToolBar from "../toolbar/ToolBar";
import TopBar from "../topbar/TopBar";
import SearchBar from "../searchbar/SearchBar";


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:'#fff',color:'#000', boxShadow:'none'}}>
        <TopBar />
        <ToolBar />
        <SearchBar />
      </AppBar>
    </Box>
  );
}
