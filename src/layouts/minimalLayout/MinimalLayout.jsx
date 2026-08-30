import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import MinimalNavbar from '../../components/navbar/MinimalNavbar';

const TITLE_KEYS = {
  '/checkout': {
    titleKey: 'Checkout',
    closeTo: '/cart',
  },
};

export default function MinimalLayout() {
  const { pathname } = useLocation();
  const { titleKey, closeTo } =
    TITLE_KEYS[pathname] ?? TITLE_KEYS['/checkout'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MinimalNavbar titleKey={titleKey} closeTo={closeTo} />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
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
    </>
  );
}