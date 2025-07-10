'use client';
import Proyek from './Proyek';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function ProyekPage() {
  return (
    <>
    <main>
    <LoadingWrapper>
    <FloatingChatPanel />
    <Proyek/>
    </LoadingWrapper>
    </main>
    </>
  );
}
