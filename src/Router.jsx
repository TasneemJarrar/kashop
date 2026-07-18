import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/mainlyout/MainLayout";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ProtectedRouter from "./ProtectedRouter";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";

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
        path: "profile",
        element: 
        <ProtectedRouter>
          <Profile />  
        </ProtectedRouter>
      },
      {
        path: "checkout",
        element: 
        <ProtectedRouter>
          <Checkout />  
        </ProtectedRouter>
      },
      {
        path: "login",
        element: <Login />  
      },
      {
        path: "register",
        element: <Register />  
      },
      {
        path: "shop",
        element: <Shop />  
      },,
      {
        path: "about",
        element: <About />  
      },,
      {
        path: "contact",
        element: <Contact />  
      },

    ]
  },
]);

export default router;