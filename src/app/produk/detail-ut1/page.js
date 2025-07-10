'use client';
import { Suspense } from 'react';
import DetailsUt1 from './Details-Ut1'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailUtPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
      <Suspense fallback={<div>Loading...</div>}>
          <DetailsUt1 />
      </Suspense>
      </LoadingWrapperF>
    </main>
    </>
  );
}
