'use client';
import { Suspense } from 'react';
import Product from './Product'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '../components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function ProdukPage() {
  return (
    <>
    <main>
      <LoadingWrapper>
      <FloatingChatPanel/>
<Suspense fallback={<div>Loading...</div>}>
    <Product />
</Suspense>
    </LoadingWrapper>
    </main>
    </>
  );
}
