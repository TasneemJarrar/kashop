import { createBrowserRouter } from "react-router";
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
import Home from "./pages/Home/Home";
import ProfileInfo from "./components/profile/ProfileInfo";
import ProfileOrders from "./components/profile/ProfileOrders";
import UpdatePassword from "./components/profile/UpdatePassword";
import MinimalLayout from "./layouts/minimalLayout/MinimalLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home />, handle: { seoKey: "home" } },
      { path: "product/:id", element: <ProductDetails />, handle: { seoKey: "product" } },
      { path: "shop", element: <Shop />, handle: { seoKey: "shop" } },
      { path: "about", element: <About />, handle: { seoKey: "about" } },
      { path: "contact", element: <Contact />, handle: { seoKey: "contact" } },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
        handle: { seoKey: "cart" },
      },
      { path: "login", element: <Login />, handle: { seoKey: "login" } },
      { path: "register", element: <Register />, handle: { seoKey: "register" } },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
        handle: { seoKey: "profile" },
        children: [
          { index: true, element: <ProfileInfo />, handle: { seoKey: "profileInfo" } },
          { path: "orders", element: <ProfileOrders />, handle: { seoKey: "profileOrders" } },
          { path: "update-password", element: <UpdatePassword />, handle: { seoKey: "updatePassword" } },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        ),
        handle: { seoKey: "checkout" },
      },
    ],
  },
]);

export default router;