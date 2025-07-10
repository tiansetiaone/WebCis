"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Durasi lebih singkat

    // Reset loading state saat route berubah
    setIsLoading(true);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}