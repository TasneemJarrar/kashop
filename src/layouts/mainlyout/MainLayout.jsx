import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router'
import RouteSeo from '../../components/shared/RouteSeo'

export default function MainLayout() {
  return (
    <>
    <RouteSeo />
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
