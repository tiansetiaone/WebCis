'use client';
import DetailB from './Detail-b';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailBPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <DetailB/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
