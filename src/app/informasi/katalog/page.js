'use client';
import Katalog from './Katalog';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function KatalogPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <Katalog/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
