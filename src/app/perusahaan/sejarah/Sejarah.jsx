'use client';;
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import '@/app/style/Sejarah.css';

export default function Sejarah() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Data katalog
  const katalogList = [
    { id: 1, nama: "Katalog 1", file: "/images/icon photo.png" },
    { id: 2, nama: "Katalog 2", file: "/images/icon photo.png" },
    { id: 3, nama: "Katalog 3", file: "/images/icon photo.png" },
    { id: 4, nama: "Katalog 4", file: "/images/icon photo.png" },
    { id: 5, nama: "Katalog 5", file: "/images/icon photo.png" },
    { id: 6, nama: "Katalog 6", file: "/images/icon photo.png" },
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
    <div className="body-container mt-[5.8rem] px-11 bg-white text-slate-800 mb-25">
      {/* Hero Section */}
      <div className="image-container relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/sejarah.jpg"
          alt="Sejarah Cisangkan"
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
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex 2xl:text-lg justify-center space-x-10 text-[1rem] font-light tracking-wide">
        <Link href="/perusahaan/tentang" className="text-[#333] hover:text-[#2D5DA6]">
          Tentang Kami
        </Link>
        <Link href="/perusahaan/sejarah" className="text-[#2D5DA6] font-bold hover:underline">
          Sejarah
        </Link>
        <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">
          Inovasi
        </Link>
        <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">
          Karir
        </Link>
      </nav>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex flex-col text-[1rem] font-light tracking-wide">
        {/* Judul utama menu */}
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center px-4 py-3 bg-[#F2F2F2] text-[#2D5DA6] font-bold hover:underline border-b"
        >
          <span>Sejarah</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transform transition-transform ${
              open ? "rotate-180 text-[#2D5DA6]" : "rotate-0 text-[#2D5DA6]"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown list */}
        {open && (
          <div className="flex flex-col bg-[#F2F2F2] px-6 py-2 space-y-2">
            <Link href="/perusahaan/tentang" className="text-[#333] hover:text-[#2D5DA6]">
              Tentang Kami
            </Link>
            <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">
              Inovasi
            </Link>
            <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">
              Karir
            </Link>
          </div>
        )}
      </div>
    </div>

      {/* Main Content */}
      <section className="xl:px-24 mx-auto mt-12 sm:px-12 text-justify text-sm sm:text-base mb-10 ">
         <div className="mx-auto px-6">
    <div className="flex items-start mb-4">
      <div>
        <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 2xl:text-2xl">
          SEJARAH & PERKEMBANGAN<br />
PT. CISANGKAN
        </h2>
      </div>
    </div>
    <p className="xl:text-sm 2xl:text-lg text-justify mb-4">
PT Cisangkan didirikan pada tahun 1975 di Bandung, Jawa Barat, sebagai perusahaan yang memfokuskan diri pada produksi beton pracetak. PT Cisangkan memproduksi berbagai elemen beton pracetak untuk kebutuhan infrastruktur dan konstruksi dasar. Produk-produk seperti genteng beton, paving block, kanstin, dan saluran air menjadi andalan perusahaan dalam memenuhi kebutuhan pembangunan, baik di sektor swasta maupun pemerintah. Dengan komitmen terhadap mutu dan ketepatan produksi, Cisangkan perlahan-lahan membangun reputasi sebagai salah satu produsen beton pracetak yang terpercaya di Indonesia.
    </p>
    <p className="xl:text-sm 2xl:text-lg text-justify mb-4">
Seiring dengan meningkatnya permintaan dan standar kualitas yang semakin tinggi, PT Cisangkan melakukan berbagai investasi strategis, khususnya dalam bidang teknologi manufaktur. Sejak awal berdiri, cisangkan sudah menjalin kerja sama dengan produsen mesin beton asal Jerman, guna mengimplementasikan sistem produksi berteknologi tinggi. Memasuki tahun 2000, Penggunaan mesin otomatis HESS seperti RH 600 A hingga RH 1500-4 VA secara signifikan meningkatkan kapasitas produksi, konsistensi mutu, serta presisi produk—mendorong perusahaan untuk bersaing di tingkat nasional maupun internasional.
    </p>
    <p className="xl:text-sm 2xl:text-lg text-justify mb-4">
PT Cisangkan sekarang dikenal sebagai pemimpin industri beton pracetak di Indonesia. Dengan fasilitas produksi yang tersebar di Bandung, Purwakarta dan Pasuruan, perusahaan terus memperluas jangkauan pasar dan memperkuat jaringan distribusinya. Tidak hanya berfokus pada inovasi produk dan teknologi, PT Cisangkan juga menjunjung tinggi pengembangan sumber daya manusia, tanggung jawab sosial perusahaan, serta tata kelola perusahaan yang beretika dan berkelanjutan.
    </p>
    <p className="xl:text-sm 2xl:text-lg text-justify">
Transformasi PT Cisangkan dari sebuah perusahaan lokal di Bandung menjadi pemain nasional yang berpengaruh merupakan cerminan dari komitmen jangka panjang terhadap kualitas, integritas, dan inovasi. Dengan pengalaman lebih dari lima dekade, PT Cisangkan terus bergerak maju sebagai mitra terpercaya dalam menyediakan solusi beton pracetak untuk pembangunan Indonesia.
    </p>
  </div>
      </section>
    </div>
  );
}