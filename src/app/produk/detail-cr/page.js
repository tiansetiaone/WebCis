'use client';
import { Suspense } from 'react';
import DetailsCr from './Details-cr'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailCrPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
 <Suspense fallback={<div>Loading...</div>}>
     <DetailsCr />
 </Suspense>
 </LoadingWrapperF>
    </main>
    </>
  );
}
