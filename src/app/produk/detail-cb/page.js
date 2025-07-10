'use client';
import { Suspense } from 'react';
import DetailsCb from './Details-Cb';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailCbPage() {
  return (
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
      <Suspense fallback={<div>Loading...</div>}>
        <DetailsCb />
      </Suspense>
      </LoadingWrapperF>
    </main>
  );
}