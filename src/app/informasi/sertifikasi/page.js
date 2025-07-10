'use client';
import Sertifikasi from './Sertifikasi';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function SertifikasiPage() {
  return (
    <>
    <main>
    <LoadingWrapper>
    <FloatingChatPanel />
    <Sertifikasi />
    </LoadingWrapper>
    </main>
    </>
  );
}
