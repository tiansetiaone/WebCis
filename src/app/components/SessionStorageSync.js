'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function SessionStorageSync() {
  const pathname = usePathname();

  useEffect(() => {
    // Cek expiry sessionStorage
    const expiry = sessionStorage.getItem('expiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      sessionStorage.removeItem('autoExpand');
      sessionStorage.removeItem('activeSubItem');
      sessionStorage.removeItem('expiry');
    }

    // Jika navigasi ke halaman produk (bukan detail), pertahankan state
    if (pathname === '/produk' && !sessionStorage.getItem('autoExpand')) {
      const fromDetail = sessionStorage.getItem('fromDetail');
      if (fromDetail === 'true') {
        sessionStorage.setItem('autoExpand', 'true');
        sessionStorage.removeItem('fromDetail');
      }
    }

    // Jika navigasi ke halaman detail, set flag
    if (pathname.includes('/produk/detail')) {
      sessionStorage.setItem('fromDetail', 'true');
    }
  }, [pathname]);

  return null;
}