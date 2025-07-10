'use client';
import Kiosk from './Kiosk';
import FloatingChatPanel from '@/app/components/FloatingChatPanel';
import LoadingWrapperF from '@/app/components/LoadingWrapperFade';

export default function KioskPage() {
  return (
    <>
    <main>
      <LoadingWrapperF>
    <FloatingChatPanel />
    <Kiosk/>
    </LoadingWrapperF>
    </main>
    </>
  );
}
