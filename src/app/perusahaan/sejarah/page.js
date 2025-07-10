'use client';
import Sejarah from './Sejarah';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function SejarahPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
    <Sejarah />
    </LoadingWrapperF>
    </main>
    </>
  );
}
