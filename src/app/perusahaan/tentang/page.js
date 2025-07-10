'use client';
import dynamic from 'next/dynamic';
import LoadingWrapper from "@/app/components/LoadingWrapper";

// Gunakan dynamic import untuk semua komponen yang mungkin menggunakan browser APIs
const Tentang = dynamic(() => import('./Tentang'), {
  ssr: false, // Nonaktifkan SSR untuk komponen ini
  loading: () => <LoadingWrapper /> // Tampilkan loading state
});

const FloatingChatPanel = dynamic(() => import('@/app/components/FloatingChatPanel'), {
  ssr: false, // Biasanya komponen chat menggunakan window/document
  loading: () => null // Tidak tampilkan apa-apa saat loading
});

export default function TentangPage() {
  return (
    <main>
      <LoadingWrapper>
      <Tentang />
      <FloatingChatPanel />
      </LoadingWrapper>
    </main>
  );
}