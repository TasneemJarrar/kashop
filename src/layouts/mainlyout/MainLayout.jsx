import { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import RouteSeo from '../../components/shared/RouteSeo';

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const transitionKey = location.pathname.startsWith('/profile')
    ? '/profile'
    : location.pathname;

  return (
    <>
      <RouteSeo />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={transitionKey}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}