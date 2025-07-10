'use client';
import { Suspense } from 'react';
import DetailsVS from './Details-Victoria'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailVSPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
<Suspense fallback={<div>Loading...</div>}>
    <DetailsVS />
</Suspense>
</LoadingWrapperF>
    </main>
    </>
  );
}
