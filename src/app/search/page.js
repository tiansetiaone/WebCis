// app/search/page.js
"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Komponen utama yang dipisah untuk Suspense
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        // Ganti dengan API call sebenarnya
        const mockData = [
          { id: 1, title: 'Concrete Roof', type: 'product', description: 'Produk atap beton berkualitas tinggi' },
          { id: 2, title: 'Paving Block', type: 'product', description: 'Berbagai model paving block untuk taman' },
          { id: 3, title: 'Artikel Terbaru', type: 'article', description: 'Informasi terbaru tentang konstruksi' },
          { id: 4, title: 'Inovasi Terbaru', type: 'article', description: 'Informasi terbaru tentang konstruksi' }
        ];
        
        const filtered = query ? mockData.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        ) : [];
        
        setResults(filtered);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  if (!query) {
    return <p className="text-gray-500">Silakan masukkan kata kunci pencarian</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{`Hasil pencarian untuk "${query}"`}</h1>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                item.type === 'product' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {item.type === 'product' ? 'Produk' : 'Artikel'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ditemukan hasil untuk pencarian Anda.</p>
      )}
    </>
  );
}

// Page wrapper dengan Suspense
export default function SearchPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}