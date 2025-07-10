'use client';
import { Suspense } from 'react';
import DetailsClassic from './DetailsClassic'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '@/app/components/FloatingChatPanel';

export default function DetailClassicPage() {
  return (
    <>
    <main>
      <FloatingChatPanel />
        <Suspense fallback={<div>Loading...</div>}>
            <DetailsClassic />
        </Suspense>
    </main>
    </>
  );
}
