'use client';
import { Suspense } from 'react';
import Details from './Details'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function DetailPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
      <FloatingChatPanel />
      <Suspense fallback={<div>Loading...</div>}>
    <Details />
    </Suspense>
    </LoadingWrapperF>
    </main>
    </>
  );
}
