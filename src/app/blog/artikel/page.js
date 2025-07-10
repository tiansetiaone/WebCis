'use client';
import Artikel from './Artikel';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function ArtikelPage() {
  return (
    <>
    <main>
    <LoadingWrapper>
    <FloatingChatPanel />
    <Artikel/>
    </LoadingWrapper>
    </main>
    </>
  );
}
