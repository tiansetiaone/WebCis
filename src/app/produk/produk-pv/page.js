'use client';
import { Suspense } from 'react';
import ProductPv from './Product-pv'; // pastikan ini cocok dengan nama file & export
import FloatingChatPanel from '../../components/FloatingChatPanel';
import LoadingWrapper from "@/app/components/LoadingWrapper";

export default function ProdukPvPage() {
  return (
    <>
    <main>
      <LoadingWrapper>
      <FloatingChatPanel/>
<Suspense fallback={<div>Loading...</div>}>
    <ProductPv />
</Suspense>
    </LoadingWrapper>
    </main>
    </>
  );
}
