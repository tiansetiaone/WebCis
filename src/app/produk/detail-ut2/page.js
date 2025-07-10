'use client';
import { Suspense } from 'react';
import DetailsUt2 from './Details-Ut2'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailUt2Page() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
            <Suspense fallback={<div>Loading...</div>}>
                <DetailsUt2 />
            </Suspense>
            </LoadingWrapperF>
    </main>
    </>
  );
}
