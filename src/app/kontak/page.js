'use client';
import Kontak from './Kontak';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";


export default function KontakPage() {
  return (
    <>
    <main>
    <LoadingWrapper>
    <FloatingChatPanel />
    <Kontak/>
    </LoadingWrapper>
    </main>
    </>
  );
}
