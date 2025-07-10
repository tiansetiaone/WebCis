'use client';;
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

export default function Galeri() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

  // Data katalog
  const katalogList = [
    { id: 1, nama: "Galeri 1", file: "/images/icon photo.png" },
    { id: 2, nama: "Galeri 2", file: "/images/icon photo.png" },
    { id: 3, nama: "Galeri 3", file: "/images/icon photo.png" },
    { id: 4, nama: "Galeri 4", file: "/images/icon photo.png" },
    { id: 5, nama: "Galeri 5", file: "/images/icon photo.png" },
    { id: 6, nama: "Galeri 6", file: "/images/icon photo.png" },
  ];


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

  // Variants untuk animasi
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };


  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/produk.png"
          alt="Banner Galeri"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/20 flex items-end pb-6 sm:pb-8 md:pb-12 lg:items-center lg:justify-center lg:pb-0 px-4 sm:px-6">
        </div>
      </div>

      {/* Header Section */}
<div className="bg-[#F2F2F2] py-4">
  <nav className="flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
    <Link href="/blog/artikel" className="text-[#333] hover:text-[#2D5DA6]">Artikel</Link>
    <Link href="/blog/kegiatan" className="text-[#333] hover:text-[#2D5DA6]">Kegiatan</Link>
    <Link href="/blog/galeri" className="text-[#2D5DA6] font-bold">Galeri</Link>
    <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
  </nav>
</div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        {/* Heading */}
        <div className="gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            GALERI
          </h2>
        </div>

        {/* Grid Katalog */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-black mb-20">
  {katalogList.map((item) => (
    <div
      key={item.id}
      className="flex flex-col items-center"
    >
      <div className="bg-gray-300 w-[280px] h-[280px] flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 mb-2">
        <img
          src={item.file}
          alt={item.nama}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-3 text-sm font-normal">
        {item.nama || "Lorem ipsum volutpat mauris libero."}
      </p>
          <a href="/blog/galeri/detail-a" className="text-[#2957A4] text-sm font-semibold mt-1 hover:underline">
      Lihat Detail &gt;&gt;
    </a>
    </div>
  ))}
</div>

{/* Pagination */}
        <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2">
            <button
    className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
  >
    Sebelumnya
  </button>
          <button className="px-3 py-1 border border-gray-300 rounded-none bg-[#0B203F] text-white text-xs">
            1
          </button>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs">
            2
          </button>
                      <button
    className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
  >
    Berikutnya
  </button>
        </div>
      </section>
    </div>
  );
}