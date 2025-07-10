'use client';
import Testimoni from './Testimoni';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function TestimoniPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <Testimoni/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
