'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/app/style/Testimoni.css';

export default function Testimoni() {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);

  const testimonials = [
        {
      id: 1,
      title: 'Bapak Gatot Eko (Project Manager Residential SinarmasLand Housing-1)',
      text: 'Secara produk Cisangkan bisa diandalkan, terbukti sampai saat ini masih bisa eksis mensupport project-project kami.',
      imagePosition: 'left',
      imageUrl: '/images/testimoni/206.jpg'
    },
    {
      id: 2,
      title: 'Ibu Fathma Diansari Lubis (Landscape Design Section Head, ASG)',
      text: 'Cisangkan merupakan salah satu penyedia pavingblock dengan kualitas warna yang cukup baik dan banyak varian, sehingga mampu mengakomodir design yang kami buat.',
      imagePosition: 'right',
      imageUrl: '/images/testimoni/207.jpg'
    },
    {
      id: 3,
      title: 'Bapak Prana Ariantoraya (Senior Arsitek Prahasta Cakra Utama)',
      text: 'Kami memilih Cisangkan karena mutu beton yang bagus!',
      imagePosition: 'left',
      imageUrl: '/images/testimoni/208.jpg'
    },
    {
      id: 4,
      title: 'Ibu Ir. Puji Andriyani ,MM (Pimpro Astadasa Propertindo)',
      text: 'Konsep desain dapat dikoordinasikan dengan tim desain Cisangkan untuk mewujudkan bentuk dan pola yang diinginkan, didukung oleh mutu beton yang baik serta warna menarik yang dapat dibentuk secara dinamis.',
      imagePosition: 'right',
      imageUrl: '/images/testimoni/209.jpg'
    },
    {
      id: 5,
      title: 'Bapak Rubianto (Kontraktor Proyek Sarae Hills)',
      text: 'Selama 20 tahun kami menggunakan produk Cisangkan dan kami tidak pernah kecewa baik dari warna dan kekuatan beton.',
      imagePosition: 'left',
      imageUrl: '/images/testimoni/210.jpg'
    },
    {
      id: 6,
      title: 'Ibu Inawati (Direktur Gaya Makmur Mobil)',
      text: 'Produk Cisangkan memiliki berbagai macam tipe, selain itu tim jasa pemasangan dari cisangkan juga bagus dapat mengerjakan sesuai timeline yang di sepakati dan terorganisir dengan baik.',
      imagePosition: 'right',
      imageUrl: '/images/testimoni/211.jpg'
    },
  ];

  // Konfigurasi pagination
  const itemsPerPage = 5;
  const totalItems = testimonials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hitung item yang ditampilkan berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = testimonials.slice(startIndex, endIndex);

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
    <div className="body-container mt-[5.8rem] px-11 bg-white text-slate-800 mb-25">
      {/* Hero Section */}
      <div className="image-container relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/testimoni.jpg"
          alt="Banner Testimoni"
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
        <nav className="2xl:text-lg flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
          <Link href="/blog/artikel" className="text-[#333] hover:text-[#2D5DA6]">Artikel</Link>
          <Link href="/blog/testimoni" className="text-[#2D5DA6] font-bold">Testimoni</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="mx-auto mt-12 px-6 xl:px-26 sm:px-12 text-justify text-sm sm:text-base mb-5">
        <div className="gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5 2xl:text-2xl">
            TESTIMONI
          </h2>
        </div>

        {/* Daftar Testimoni dengan efek fade in */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col ${
                  item.imagePosition === 'left' ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } items-start sm:items-center justify-between gap-6 2xl:gap-1 sm:gap-0 mb-18 border-b border-gray-300`}
              >
                {/* Gambar */}
                <div className="w-full sm:w-1/5 2xl:w-2/8">
                  <div className="relative w-full aspect-video">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 20vw"
                      />
                    ) : (
                      <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 10l4.553 4.553a.75.75 0 01-1.06 1.06L13 11.06m0 0L8.447 15.613a.75.75 0 01-1.06-1.06L11 10.939m2 0L13 10.939"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Teks */}
                <div className="w-full xl:w-[-1/2]  text-sm text-justify">
                  <h3 className="font-semibold mb-2 2xl:text-lg">{item.title}</h3>
                  <p className="text-gray-700 2xl:text-base">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination - hanya muncul jika item lebih dari itemsPerPage */}
        {totalItems > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2 mt-8">
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