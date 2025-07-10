'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import SidebarProyek from '../components/SidebarProyek';
import ProyekGallery from '../components/ProyekGallery';
import { proyekByKategori, semuaProyek, proyekNeo } from '../data/proyekData';

export default function Proyek() {
  const [activeItem, setActiveItem] = useState('Semua Produk');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [activeView, setActiveView] = useState('default');
  
  // Filter proyek berdasarkan kategori yang aktif
const getFilteredProyek = () => {
  if (activeView === 'neo') return proyekNeo; // Gunakan data dari proyekData.js
  if (activeItem === 'Semua Produk') return semuaProyek;
  if (activeSubItem) {
    return proyekByKategori[activeItem]?.filter(
      proyek => proyek.subkategori === activeSubItem
    ) || [];
  }
  return proyekByKategori[activeItem] || [];
};

  const filteredProyek = getFilteredProyek();

  // Fungsi untuk mendapatkan judul dinamis berdasarkan view
  const getGalleryTitle = () => {
    if (activeView === 'neo') {
      return `GALERI PROYEK KAMI - Concrete Roof (Neo)`;
    }
    return `GALERI PROYEK KAMI - ${activeItem} ${activeSubItem ? `(${activeSubItem})` : ''}`;
  };

  // --- PAGINATION ---
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProyek.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProyek.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset pagination saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [activeItem, activeSubItem, activeView]);

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/proyek.jpg"
          alt="Banner Proyek"
          width={1764}
          height={460}
          className="w-full h-full object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto ps-6 pe-1 py-8">
        <SidebarProyek
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          activeSubItem={activeSubItem}
          setActiveSubItem={setActiveSubItem}
          setActiveView={setActiveView}
        />

        <main className="w-full lg:w-5/5 space-y-8">
          <section className="max-w-6xl mx-auto px-6 sm:px-12 text-sm sm:text-base mb-10">
            <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
              {getGalleryTitle()}
            </h2>
            
            <ProyekGallery proyekList={currentItems} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
                >
                  Sebelumnya
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-xs ${
                      currentPage === page
                        ? 'border border-gray-300 rounded-none bg-[#0B203F] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
                >
                  Berikutnya
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}