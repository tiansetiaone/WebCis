'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const artikelList = [
  {
    id: 1,
    judul: "CISANGKAN KBP CITY RUN 2025",
    tanggal: "16 Juni 2025",
    url: "/blog/artikel/detail-a",
    deskripsi: "Merayakan 50 Tahun PT Cisangkan dan 25 Tahun Kota Baru Parahyangan. Sebagai bagian dari perjalanan panjang kami, PT Cisangkan dengan bangga mengumumkan kolaborasi istimewa dengan Kota Baru Parahyangan dalam penyelenggaraan Cisangkan KBP City Run 2025. Acara ini bukan hanya sekadar lomba lari, tetapi juga merupakan perayaan dua tonggak sejarah penting",
    gambar: "/images/KBP CityRun.jpg",
  },
  {
    id: 2,
    judul: "PT. Cisangkan: 50 Tahun Berkarya untuk Indonesia",
    tanggal: "16 Juni 2025",
    url: "/blog/artikel/detail-b",
    deskripsi: "Bandung, 2025 – Tahun ini menjadi momen istimewa bagi PT. Cisangkan, yang merayakan 50 tahun perjalanannya membangun Indonesia melalui inovasi dan kualitas di industri beton pracetak. Dengan mengusung semangat 'Bangga Berkarya, Bangga Indonesia', perusahaan ini menegaskan kembali komitmennya sebagai bagian dari kekuatan pembangunan nasional.",
    gambar: "/images/ultah50.jpg",
  },
  // {
  //   id: 3,
  //   judul: "Inovasi Terbaru Produk Genteng Beton",
  //   tanggal: "10 Mei 2025",
  //   url: "/blog/artikel/detail-c",
  //   deskripsi: "PT Cisangkan meluncurkan produk genteng beton terbaru dengan teknologi anti bocor yang lebih baik. Produk ini dirancang khusus untuk iklim tropis Indonesia dengan daya tahan yang lebih kuat.",
  //   gambar: "/images/inovasi-genteng.jpg",
  // },
  // {
  //   id: 4,
  //   judul: "Penghargaan Green Industry 2025",
  //   tanggal: "5 April 2025",
  //   url: "/blog/artikel/detail-d",
  //   deskripsi: "PT Cisangkan meraih penghargaan Green Industry 2025 untuk kategori material bangunan berkelanjutan. Penghargaan ini diberikan atas komitmen perusahaan dalam mengurangi jejak karbon.",
  //   gambar: "/images/green-award.jpg",
  // },
  // {
  //   id: 5,
  //   judul: "Workshop Konstruksi Modern",
  //   tanggal: "20 Maret 2025",
  //   url: "/blog/artikel/detail-e",
  //   deskripsi: "PT Cisangkan menyelenggarakan workshop konstruksi modern untuk kontraktor dan developer. Acara ini bertujuan untuk berbagi pengetahuan tentang teknik konstruksi terbaru.",
  //   gambar: "/images/workshop.jpg",
  // },
  // {
  //   id: 6,
  //   judul: "Ekspansi Pabrik di Jawa Timur",
  //   tanggal: "15 Februari 2025",
  //   url: "/blog/artikel/detail-f",
  //   deskripsi: "Dalam rangka memenuhi permintaan pasar yang terus meningkat, PT Cisangkan melakukan ekspansi pabrik di Jawa Timur. Fasilitas baru ini akan mulai beroperasi pada kuartal kedua 2025.",
  //   gambar: "/images/pabrik.jpg",
  // },
];

export default function Artikel() {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Konfigurasi pagination
  const itemsPerPage = 5;
  const totalItems = artikelList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hitung item yang ditampilkan berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = artikelList.slice(startIndex, endIndex);

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
          src="/images/artikel-4.jpg"
          alt="Banner Artikel"
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
          <Link href="/blog/artikel" className="text-[#2D5DA6] font-bold">Artikel</Link>
          <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        <div className="gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            ARTIKEL
          </h2>
        </div>

        {/* Daftar Artikel dengan efek fade in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-10 mb-10"
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start border-b border-[#CCCCCC] pb-10 gap-6"
              >
                {/* Gambar */}
                <div className="w-full sm:w-[200px] h-[200px] bg-gray-200 flex justify-center items-center">
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V8a1 1 0 011-1zm3 5l2.586 2.586a1 1 0 001.414 0L13 10l5 5" />
                    </svg>
                  )}
                </div>

                {/* Konten */}
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-[#1E1E1E] mb-2">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-[#2957A4] mb-2">
                    {item.tanggal}
                  </p>
                  <p className="text-sm text-justify text-[#333333] mb-3">
                    {item.deskripsi}
                  </p>
                  <Link
                    href={item.url}
                    className="text-sm text-[#2957A4] font-semibold hover:underline"
                  >
                    Lihat Detail &gt;&gt;
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
    </div>
  );
}