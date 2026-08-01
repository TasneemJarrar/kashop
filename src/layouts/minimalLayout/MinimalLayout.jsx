import { Outlet, useLocation } from "react-router";
import MinimalNavbar from "../../components/navbar/MinimalNavbar";

const TITLE_KEYS = {
  "/checkout": { titleKey: "Checkout",     closeTo: "/cart" },
};

export default function MinimalLayout() {
  const { pathname } = useLocation();
  const { titleKey, closeTo } = TITLE_KEYS[pathname] ?? TITLE_KEYS["/cart"];
  return <>
    <MinimalNavbar titleKey={titleKey} closeTo={closeTo} />
    <Outlet />
  </>
}
