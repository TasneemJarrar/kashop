import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/mainlayout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import AuthLayout from "./layouts/authlayout/AuthLayout";
import LogIn from "./pages/auth/login/LogIn";
import Register from "./pages/auth/register/Register";

const router = createBrowserRouter([
  {path: '/',
  element: <MainLayout />,
  children: [
    {path: '/',
      index: true,
      element: <Home />
    },
    {
      path: '/cart',
      element: <Cart />
    }
  ]
   },
   {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {path: 'login',
      element: <LogIn />
    },
    {
      path: 'register',
      element: <Register />
    }
    ]
   }
])

export default router