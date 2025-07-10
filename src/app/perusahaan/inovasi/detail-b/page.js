'use client';
import Detailsb from './Details-b';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailsbPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <Detailsb/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
