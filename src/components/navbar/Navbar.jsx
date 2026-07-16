import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router';
import useCart from '../../hooks/useCart';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Navbar() {
  const { data } = useCart();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const cartCount = data?.items?.length || 0;
  const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -2px;
  }
`;

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ?
        <>
          <Link to="/cart">
            <IconButton aria-label="view cart with 2 items">
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={cartCount} color="secondary" overlap="circular" />
            </IconButton>
          </Link>
          <Link to="/login" component="button" onClick={handleLogout}>
            Logout
          </Link>
        </> :
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      }
    </nav>
  )
}
