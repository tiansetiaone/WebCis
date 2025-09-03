'use client';
import DetailD from './Detail-d';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailDPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <DetailD/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
