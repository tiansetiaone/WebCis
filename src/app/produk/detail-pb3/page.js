'use client';
import { Suspense } from 'react';
import DetailsPb2 from './Details-Pb3'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailPb2Page() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
            <Suspense fallback={<div>Loading...</div>}>
                <DetailsPb2 />
            </Suspense>
            </LoadingWrapperF>
    </main>
    </>
  );
}
