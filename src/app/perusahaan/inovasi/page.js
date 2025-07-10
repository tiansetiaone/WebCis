'use client';
import Inovasi from './Inovasi';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function InovasiPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
<Inovasi/>
</LoadingWrapperF>
    </main>
    </>
  );
}
