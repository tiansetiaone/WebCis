"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingScreenSaver from './FloatingScreenSaver';

export default function LoadingWrapper({ children }) {
  const [screensaverState, setScreensaverState] = useState({
    show: false,
    isExiting: false
  });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setScreensaverState({ show: true, isExiting: false });
      }, 0); // Muncul setelah 1 detik

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleComplete = () => {
    setScreensaverState(prev => ({ ...prev, isExiting: true }));
    setTimeout(() => {
      setScreensaverState({ show: false, isExiting: false });
    }, 500);
  };

  return (
    <>
      {children}
      
      <AnimatePresence>
        {screensaverState.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: screensaverState.isExiting ? 0 : 1,
              transition: { duration: 0.5 }
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999]"
          >
            <FloatingScreenSaver onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}