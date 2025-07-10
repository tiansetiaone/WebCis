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



export default function Details() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
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

  useEffect(() => {
    // Ganti ini dengan API call atau ambil dari context/router
    const sampleData = {
      judul: "Genteng Neo Solar: Inovasi Atap Beton Flat Premium dari PT Cisangkan",
      tanggal: "16 Mei 2025",
      gambar: "/images/gentengneo1.jpg",
      deskripsi: ""
    };

    setData(sampleData);
  }, []);

  if (!data) return <div>Loading...</div>;



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
    {/* <Link href="/perusahaan/sertifikasi" className="text-[#333] hover:text-[#2D5DA6]">Sertifikasi</Link> */}
    {/* <Link href="/perusahaan/katalog" className="text-[#333] hover:text-[#2D5DA6]">Katalog</Link> */}
    {/* <Link href="/perusahaan/video" className="text-[#333] hover:text-[#2D5DA6]">Video</Link> */}
    <Link href="/perusahaan/inovasi" className="text-[#2D5DA6] font-bold">Inovasi</Link>
    <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">Karir</Link>
  </nav>
</div>

    <section className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 text-sm sm:text-base mb-16">
  {/* Judul */}
      <h1 className="justify-center text-black font-semibold text-lg sm:text-lg uppercase mb-2">
        {data.judul}
      </h1>


  {/* Tanggal */}
  <p className="text-blue-600 text-sm mb-6">
    {data?.tanggal || 'DD Month Years'}
  </p>

  {/* Gambar */}
  <div className="w-full max-w-3xl h-[240px] sm:h-[320px] mx-auto bg-gray-200 flex items-center justify-center mb-8">
    {data?.gambar ? (
      <img src={data.gambar} alt={data.judul} className="w-full h-full object-cover" />
    ) : (
      <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm10 2a1 1 0 110 2 1 1 0 010-2zm-4 3a3 3 0 11-6 0 3 3 0 016 0zm-3 4a5 5 0 00-5 5h10a5 5 0 00-5-5z" />
      </svg>
    )}
  </div>

  {/* Konten Deskripsi */}
  <div className="text-justify text-sm leading-relaxed text-[#333] space-y-4 pb-10 border-b">
    {data?.deskripsi ? (
      <p>{data.deskripsi}</p>
    ) : (
      <>
<p>
  Dalam era arsitektur modern dan berkelanjutan, kebutuhan akan produk bangunan yang tidak hanya fungsional namun juga estetis semakin meningkat. PT Cisangkan, sebagai pionir produsen Genteng Beton di Indonesia, memperkenalkan Genteng Neo, sebuah inovasi genteng beton flat premium yang dirancang untuk masa depan.
</p>

<p>
  Salah satu keunggulan utama Genteng Neo adalah kemampuannya untuk dipasang secara bersamaan dengan solar tile atau genteng surya. Tidak seperti panel surya konvensional yang kerap terlihat menonjol dan merusak tampilan atap, sistem ini menghadirkan visual yang lebih menyatu dan seamless. Konsep ini sangat disukai oleh para arsitek dan perencana, karena memungkinkan pencapaian target efisiensi energi tanpa mengorbankan keindahan bangunan. Dengan begitu, penggunaan solar power bukan lagi sekadar tambahan teknis, melainkan bagian integral dari desain arsitektural itu sendiri.
</p>

<p>
  Dari segi teknis, Genteng Neo Solar dirancang dengan dimensi yang optimal yaitu:
</p>

<ul>
  <li>Nominal Area: 44 x 37,4 cm</li>
  <li>Effective Area: 36,6 x 34,4 cm</li>
  <li>Berat per Lembar: 5,5 – 5,7 kg</li>
  <li>Kebutuhan Genteng per m²: ±7,95 pcs</li>
  <li>Jarak Reng: 36 – 36,6 cm</li>
  <li>Kemiringan Minimum Atap: 25°</li>
</ul>

<p>
  Dengan ukuran efektif dan presisi tinggi, genteng ini dirancang untuk memaksimalkan perlindungan cuaca dan mengoptimalkan efisiensi penyerapan energi matahari saat dipadukan dengan solar tile.
</p>

<p>
  Genteng Neo hadir dengan tampilan flat yang minimalis dan elegan—sangat sesuai untuk gaya arsitektur modern, tropis, maupun industrial. Bagi para arsitek dan perencana, pilihan ini menjadi solusi ideal karena tidak mengorbankan keindahan desain hanya demi fungsi panel surya.
</p>

<p>
  PT Cisangkan juga menyediakan aksesori genteng yang lengkap, mulai dari nok atas, nok samping hingga nok siku yang dapat dipakai untuk berbagai jenis atap dari perisai hingga limas. Aksesori genteng Neo juga dirancang agar serasi dengan sistem Neo Solar. Ini memastikan integrasi yang menyeluruh dan kualitas instalasi terbaik di berbagai tipe bangunan.
</p>

<p>
  Genteng Neo Solar dari PT Cisangkan bukan hanya sekadar atap—ini adalah investasi jangka panjang untuk hunian atau bangunan masa depan. Dengan kombinasi antara desain mewah, kekuatan struktural, dan kemampuan integrasi solar system, genteng ini menawarkan solusi sempurna bagi mereka yang ingin membangun rumah berkelanjutan tanpa mengorbankan estetika.
</p>

<p>
  Untuk arsitek, developer, dan pemilik rumah yang peduli pada desain sekaligus ingin berkontribusi terhadap lingkungan, Genteng Neo adalah pilihan yang akan memuaskan dari segi visual, fungsionalitas, dan keberlanjutan energi.
</p>
      </>
    )}
  </div>

  {/* Tombol Kembali */}
  <div className="mt-10">
    <a href="/perusahaan/inovasi" className="text-sm text-blue-800 font-medium hover:underline">
      &lt;&lt; Kembali ke Halaman Inovasi
    </a>
  </div>
</section>
    </div>
  );
}