'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DetailA() {

  const [data, setData] = useState(null);

  // Data katalog
  const proyekList = [
    { id: 1, nama: "Paving Block", file: "/images/Gedung Sate.jpg", tempat:"Proyek 1 - Gedung Sate Bandung" },
    { id: 2, nama: "Proyek 2", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 3, nama: "Proyek 3", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 4, nama: "Proyek 4", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 5, nama: "Proyek 5", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 6, nama: "Proyek 6", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
  ];


    useEffect(() => {
      // Ganti ini dengan API call atau ambil dari context/router
      const sampleData = {
        judul: "Lorem ipsum amet nulla in sit pellentesque imperdiet eu purus a ullamcorper amet sit lectus integer faucibus consequat odio quis.",
        tanggal: "16 Mei 2025"
      };
  
      setData(sampleData);
    }, []);
  
    if (!data) return <div>Loading...</div>;


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

<div className='max-w-5xl mx-auto mt-10 text-sm sm:text-base mb-4'>
            {/* Judul */}
      <h1 className="justify-center text-black font-semibold text-lg sm:text-lg uppercase mb-2">
        {data.judul}
      </h1>

  {/* Tanggal */}
  <p className="text-blue-600 text-sm mb-6">
    {data?.tanggal || 'DD Month Years'}
  </p>
</div>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto ps-6 pe-1 py-8">
      {/* Main Content */}
      <main className="w-full lg:w-5/5 space-y-8">
      <section className="max-w-6xl mx-auto px-6 sm:px-12 text-sm sm:text-base mb-10">
{/* Grid Proyek (sesuai UI) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-black mb-20">
  {proyekList.map((item) => (
    <div
      key={item.id}
      className="border border-[#2957A4] rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-gray-300 w-full aspect-[4/3] flex items-center justify-center">
        <img
          src={item.file}
          alt={item.nama}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ))}
</div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 text-sm border-t border-[#E0E0E0] py-2">
        </div>
          {/* Tombol Kembali */}
  <div className="mt-10">
    <a href="/blog/galeri" className="text-sm text-blue-800 font-medium hover:underline">
      &lt;&lt; Kembali ke Halaman List Galeri
    </a>
  </div>
      </section>
</main>
    </div>
    </div>
  );
}