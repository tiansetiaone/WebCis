'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const inovasiList = [
  {
    id: 1,
    judul: "Genteng Neo Solar: Inovasi Atap Beton Flat Premium dari PT Cisangkan",
    url: "/perusahaan/inovasi/detail",
    deskripsi:
      "Dalam era arsitektur modern dan berkelanjutan, kebutuhan akan produk bangunan yang tidak hanya fungsional namun juga estetis semakin meningkat. PT Cisangkan, sebagai pionir produsen Genteng Beton di Indonesia, memperkenalkan Genteng Neo, sebuah inovasi genteng beton flat premium yang dirancang untuk masa depan.",
    gambar: "/images/gentengneo.jpg",
  },
  {
    id: 2,
    judul: "CIS Flashing: Solusi Flashing Modern, Anti Bocor, dan Tanpa Semen untuk Atap Rumah Anda",
    url: "/perusahaan/inovasi/detail-b",
    deskripsi:
      "Dalam dunia konstruksi atap, salah satu tantangan paling umum adalah memastikan tidak ada kebocoran air di area sambungan antara atap dan dinding vertikal. Di sinilah peran sistem flashing sangat penting. Namun, metode konvensional yang menggunakan semen sering kali tidak memberikan hasil yang rapi dan mudah mengalami keretakan seiring waktu.",
    gambar: "/images/cis flashing.png",
  },
  // {
  //   id: 3,
  //   judul: "Inovasi Ketiga: Solusi Terbaru untuk Konstruksi Modern",
  //   url: "/perusahaan/inovasi/detail-c",
  //   deskripsi:
  //     "Inovasi terbaru kami menghadirkan solusi konstruksi yang lebih efisien dan ramah lingkungan. Dengan teknologi mutakhir, produk ini dirancang untuk memenuhi kebutuhan pasar yang terus berkembang.",
  //   gambar: "/images/inovasi3.jpg",
  // },
  // {
  //   id: 4,
  //   judul: "Inovasi Keempat: Material Bangunan Masa Depan",
  //   url: "/perusahaan/inovasi/detail-d",
  //   deskripsi:
  //     "Material bangunan inovatif kami menawarkan kekuatan dan daya tahan yang unggul, sekaligus mengurangi dampak lingkungan. Solusi tepat untuk proyek konstruksi berkelanjutan.",
  //   gambar: "/images/inovasi4.jpg",
  // },
  // {
  //   id: 5,
  //   judul: "Inovasi Kelima: Sistem Instalasi Revolusioner",
  //   url: "/perusahaan/inovasi/detail-e",
  //   deskripsi:
  //     "Sistem instalasi baru kami memungkinkan pemasangan yang lebih cepat dan presisi. Mengurangi waktu pengerjaan tanpa mengorbankan kualitas hasil akhir.",
  //   gambar: "/images/inovasi5.jpg",
  // },
  // {
  //   id: 6,
  //   judul: "Inovasi Keenam: Teknologi Anti Bocor Generasi Terbaru",
  //   url: "/perusahaan/inovasi/detail-f",
  //   deskripsi:
  //     "Dengan teknologi anti bocor generasi terbaru, produk ini memberikan perlindungan maksimal terhadap cuaca ekstrim. Solusi ideal untuk iklim tropis Indonesia.",
  //   gambar: "/images/inovasi6.jpg",
  // },
];

export default function Inovasi() {
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

  // Konfigurasi pagination
  const itemsPerPage = 5;
  const totalItems = inovasiList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Hitung item yang ditampilkan berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = inovasiList.slice(startIndex, endIndex);

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

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDownloadPanel(false);
      }
    };

    if (showDownloadPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDownloadPanel]);

  const handleDownload = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Harap isi nama dan email terlebih dahulu');
      return;
    }
    console.log(`Download katalog oleh ${name} (${email})`);
    setName('');
    setEmail('');
    setShowDownloadPanel(false);
  };

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/inovasi.jpg"
          alt="Banner Inovasi"
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
          <Link href="/perusahaan/inovasi" className="text-[#2D5DA6] font-bold">Inovasi</Link>
          <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">Karir</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        <div className="gap-6 items-start mb-5">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase">
            INOVASI
          </h2>
        </div>

        {/* Daftar Inovasi dengan efek fade in */}
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
                <div className="w-full sm:w-[300px] h-[180px] bg-gray-300 flex justify-center items-center">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Konten */}
                <div className="flex-1">
                  <h3 className="text-lg font-normal mb-2">{item.judul}</h3>
                  <p className="text-sm text-justify mb-4">{item.deskripsi}</p>
                  <Link
                    href={item.url}
                    className="text-sm text-blue-700 font-medium hover:underline"
                  >
                    Baca lebih banyak &gt;&gt;
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