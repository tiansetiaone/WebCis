'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Karir() {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef(null);

  // Data katalog
  const karirList = [
    // {
    //   id: 1,
    //   nama: "Lead Regional Representative",
    //   penempatan: "Medan",
    //   bidang: "Sales & Marketing",
    //   kebutuhan: "1 Orang",
    //   url: "/perusahaan/karir/lead-regional-representative" // URL detail
    // },
    {
      id: 2,
      nama: "Marketing Specifier",
      penempatan: "Jakarta",
      bidang: "Sales & Marketing",
      kebutuhan: "1 Orang",
      url: "https://id.jobstreet.com/id/job/85266843?type=standard&ref=search-standalone&origin=cardTitle#sol=687d691d14dc9a2077f8f58ba848889f917130c9"
    },
    {
      id: 3,
      nama: "Corporate Secretary",
      penempatan: "Bandung",
      bidang: "Asisten Pribadi, Asisten Eksekutif & Sekretarial (Administrasi & Dukungan Perkantoran)",
      kebutuhan: "1 Orang",
      url: "https://id.jobstreet.com/id/job/85417012?type=standard&ref=search-standalone&origin=cardTitle#sol=0e5be54b40d1233246861ea9aa16ca9c815f0335"
    },
    // {
    //   id: 4,
    //   nama: "Production Supervisor",
    //   penempatan: "Bandung",
    //   bidang: "Production",
    //   kebutuhan: "1 Orang",
    //   url: "/perusahaan/karir/production-supervisor"
    // },
    // {
    //   id: 5,
    //   nama: "Quality Control",
    //   penempatan: "Bandung",
    //   bidang: "Quality Assurance",
    //   kebutuhan: "2 Orang",
    //   url: "/perusahaan/karir/quality-control"
    // },
    // {
    //   id: 6,
    //   nama: "IT Support",
    //   penempatan: "Bandung",
    //   bidang: "Information Technology",
    //   kebutuhan: "1 Orang",
    //   url: "/perusahaan/karir/it-support"
    // },
  ];

  // Konfigurasi pagination
  const itemsPerPage = 5;
  const totalItems = karirList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hitung item yang ditampilkan berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = karirList.slice(startIndex, endIndex);

  // Handle page change with scroll to top and fade effect
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll ke atas dengan smooth
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/karir.jpg"
          alt="Banner Karir"
          width={1764}
          height={460}
          className="w-full h-full object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Header Section */}
      <div className="bg-[#F2F2F2] py-4">
        <nav className="flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
          <Link href="/perusahaan/tentang" className="text-[#333] hover:text-[#2D5DA6]">Tentang Kami</Link>
          <Link href="/perusahaan/sejarah" className="text-[#333] hover:text-[#2D5DA6]">Sejarah</Link>
          <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">Inovasi</Link>
          <Link href="/perusahaan/karir" className="text-[#2D5DA6] font-bold">Karir</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        {/* Heading */}
        <div className="gap-6 items-start mb-5">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            KARIR
          </h2>
        </div>

        {/* Daftar Karir dengan efek fade in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 mb-20"
          >
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="border border-gray-200 shadow-sm p-6 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold uppercase mb-4">{item.nama}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex">
                      <span className="w-40">Penempatan</span>
                      <span>: {item.penempatan}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40">Bidang Pekerjaan</span>
                      <span>: {item.bidang}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40">Kebutuhan</span>
                      <span>: {item.kebutuhan}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    href={item.url}
                    className="bg-[#0B203F] hover:bg-[#14325f] text-white px-4 py-2 text-sm rounded inline-block"
                  >
                    Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination - hanya muncul jika item lebih dari itemsPerPage */}
        {totalItems > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border border-gray-300 rounded-none text-xs ${
                  currentPage === page 
                    ? 'bg-[#0B203F] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Berikutnya
            </button>
          </div>
        )}
      </section>

      {/* Download Panel Modal - Commented Out */}
      {/* {showDownloadPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Unduh Informasi Lowongan</h3>
            <form onSubmit={handleDownload}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDownloadPanel(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B203F] text-white rounded hover:bg-[#14325f]"
                >
                  Unduh
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}