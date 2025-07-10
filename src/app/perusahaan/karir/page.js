'use client';
import Karir from './Karir';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function KarirPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <Karir/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
