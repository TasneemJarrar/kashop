import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ?
        <>
          <Link to="/cart">Cart</Link>
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
