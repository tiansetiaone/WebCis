'use client';
import Store from './Store';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function StorePage() {
  return (
    <>
    <main>
    <LoadingWrapper>    
    <FloatingChatPanel />
    <Store/>
    </LoadingWrapper>
    </main>
    </>
  );
}
