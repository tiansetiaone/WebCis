'use client';
import { Suspense } from 'react';
import DetailsPb from './Details-Pb'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailPbPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
            <Suspense fallback={<div>Loading...</div>}>
                <DetailsPb />
            </Suspense>
            </LoadingWrapperF>
    </main>
    </>
  );
}
