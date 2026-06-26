import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
         index: true,
          element: <Home/>
      },
      {
        path: "products",
        element: <Products />  
      },
      {
        path: "cart",
        element: <Cart />  
      },
      {
        path: "login",
        element: <Login />  
      },
      {
        path: "register",
        element: <Register />  
      }
    ]
  },
]);

export default router;