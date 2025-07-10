"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingWrapperF({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset state saat route berubah
    setIsMounted(false);
    
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100); // Small delay untuk trigger animation

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isMounted ? 1 : 0,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}