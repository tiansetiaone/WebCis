'use client';
import DetailA from './Detail-a';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailAPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <DetailA/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
