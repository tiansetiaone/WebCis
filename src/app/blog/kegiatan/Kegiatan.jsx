'use client';;
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
const inovasiList = [
  {
    id: 1,
    judul: "Lorem ipsum",
    deskripsi:
      "Lorem ipsum sed in egestas eget amet tristique in integer convallis massa imperdiet enim enim id augue lorem pharetra lacus tincidunt quisque auctor adipiscing in cursus praesent scelerisque amet duis cras mauris orci feugiat diam in urna non vitae id semper ac ac cras senectus ut nam a cras nunc pharetra ac elit eget pharetra turpis a orci eu semper est arcu tempus ultrices lectus morbi id eu pretium urna sit ut donec sed tristique viverra sollicitudin et purus ut semper lobortis quisque posuere nulla aliquet in nunc mi tellus pellentesque amet tempus sit eu nibh ac amet dui lectus id nisi elit neque purus commodo faucibus et lacus neque amet faucibus purus aliquet elementum non lorem lobortis aliquam donec.",
    gambar: "/images/inovasi1.jpg",
  },
  {
    id: 2,
    judul: "Lorem ipsum",
    deskripsi:
      "Lorem ipsum sed in egestas eget amet tristique in integer convallis massa imperdiet enim enim id augue lorem pharetra lacus tincidunt quisque auctor adipiscing in cursus praesent scelerisque amet duis cras mauris orci feugiat diam in urna non vitae id semper ac ac cras senectus ut nam a cras nunc pharetra ac elit eget pharetra turpis a orci eu semper est arcu tempus ultrices lectus morbi id eu pretium urna sit ut donec sed tristique viverra sollicitudin et purus ut semper lobortis quisque posuere nulla aliquet in nunc mi tellus pellentesque amet tempus sit eu nibh ac amet dui lectus id nisi elit neque purus commodo faucibus et lacus neque amet faucibus purus aliquet elementum non lorem lobortis aliquam donec.",
    gambar: "/images/inovasi2.jpg",
  },
  {
    id: 3,
    judul: "Lorem ipsum",
    deskripsi:
      "Lorem ipsum sed in egestas eget amet tristique in integer convallis massa imperdiet enim enim id augue lorem pharetra lacus tincidunt quisque auctor adipiscing in cursus praesent scelerisque amet duis cras mauris orci feugiat diam in urna non vitae id semper ac ac cras senectus ut nam a cras nunc pharetra ac elit eget pharetra turpis a orci eu semper est arcu tempus ultrices lectus morbi id eu pretium urna sit ut donec sed tristique viverra sollicitudin et purus ut semper lobortis quisque posuere nulla aliquet in nunc mi tellus pellentesque amet tempus sit eu nibh ac amet dui lectus id nisi elit neque purus commodo faucibus et lacus neque amet faucibus purus aliquet elementum non lorem lobortis aliquam donec.",
    gambar: "/images/inovasi3.jpg",
  },
];

export default function Kegiatan() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

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
          alt="Banner Kegiatan"
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
    <Link href="/blog/kegiatan" className="text-[#2D5DA6] font-bold">Kegiatan</Link>
    <Link href="/blog/galeri" className="text-[#333] hover:text-[#2D5DA6]">Galeri</Link>
    <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
  </nav>
</div>

      {/* Main Content */}
    <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
      <div className="gap-6 items-start mb-10">
        <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
          KEGIATAN
        </h2>
        <p className="text-sm text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s.
        </p>
      </div>

{/* Daftar Artikel */}
<div className="flex flex-col gap-10 mb-10">
  {inovasiList.map((item) => (
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
          {item.judul || "Lorem ipsum auctor lacinia varius magna arcu a id varius."}
        </h3>
        <p className="text-sm text-[#2957A4] mb-2">
          {item.tanggal || "22 Mei 2025"}
        </p>
        <p className="text-sm text-justify text-[#333333] mb-3">
          {item.deskripsi || "Lorem ipsum ornare viverra lorem mattis elementum sit viverra vitae est aliquet nisi tristique egestas lorem morbi varius neque magna adipiscing lobortis vivamus velit sed lacus purus sapien amet turpis viverra ipsum aliquam dignissim morbi lacus turpis lacus ornare maecenas in leo blandit libero mauris at posuere mattis porttitor in volutpat tincidunt dignissim in consectetur ac vitae turpis massa suspendisse gravida ac vitae tortor sit eget tristique fermentum consequat cursus diam morbi habitasse id ut molestie sed laoreet placerat scelerisque."}
        </p>
        <a
          href="/blog/kegiatan/detail-a"
          className="text-sm text-[#2957A4] font-semibold hover:underline"
        >
          Lihat Detail &gt;&gt;
        </a>
      </div>
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