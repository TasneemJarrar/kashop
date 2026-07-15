import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/mainlyout/MainLayout";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ProtectedRouter from "./ProtectedRouter";

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
        path: "product/:id",
        element: <ProductDetails />  
      },
      {
        path: "cart",
        element: 
        <ProtectedRouter>
          <Cart />  
        </ProtectedRouter>
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