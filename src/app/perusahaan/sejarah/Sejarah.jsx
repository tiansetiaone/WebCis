'use client';;
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';

export default function Sejarah() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

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
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-25">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
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
  <nav className="flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
    <Link href="/perusahaan/tentang" className="text-[#333] hover:text-[#2D5DA6]">Tentang Kami</Link>
    <Link href="/perusahaan/sejarah" className="text-[#2D5DA6] font-bold">Sejarah</Link>
    {/* <Link href="/perusahaan/sertifikasi" className="text-[#333] hover:text-[#2D5DA6]">Sertifikasi</Link> */}
    {/* <Link href="/perusahaan/katalog" className="text-[#333] hover:text-[#2D5DA6]">Katalog</Link> */}
    {/* <Link href="/perusahaan/video" className="text-[#333] hover:text-[#2D5DA6]">Video</Link> */}
    <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">Inovasi</Link>
    <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">Karir</Link>
  </nav>
</div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
         <div className="max-w-5xl mx-auto">
    <div className="flex items-start mb-4">
      <div>
        <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4">
          SEJARAH & PERKEMBANGAN<br />
          PT. CISANGKAN
        </h2>
      </div>
    </div>
    <p className="text-sm text-justify mb-4">
PT Cisangkan didirikan pada tahun 1975 di Bandung, Jawa Barat, sebagai perusahaan yang memfokuskan diri pada produksi beton pracetak. PT Cisangkan memproduksi berbagai elemen beton pracetak untuk kebutuhan infrastruktur dan konstruksi dasar. Produk-produk seperti genteng beton, paving block, kanstin, dan saluran air menjadi andalan perusahaan dalam memenuhi kebutuhan pembangunan, baik di sektor swasta maupun pemerintah. Dengan komitmen terhadap mutu dan ketepatan produksi, Cisangkan perlahan-lahan membangun reputasi sebagai salah satu produsen beton pracetak yang terpercaya di Indonesia.
    </p>
    <p className="text-sm text-justify mb-4">
Seiring dengan meningkatnya permintaan dan standar kualitas yang semakin tinggi, PT Cisangkan melakukan berbagai investasi strategis, khususnya dalam bidang teknologi manufaktur. Sejak awal berdiri, cisangkan sudah menjalin kerja sama dengan produsen mesin beton asal Jerman, guna mengimplementasikan sistem produksi berteknologi tinggi. Memasuki tahun 2000, Penggunaan mesin otomatis HESS seperti RH 600 A hingga RH 1500-4 VA secara signifikan meningkatkan kapasitas produksi, konsistensi mutu, serta presisi produk—mendorong perusahaan untuk bersaing di tingkat nasional maupun internasional.
    </p>
    <p className="text-sm text-justify mb-4">
PT Cisangkan sekarang dikenal sebagai pemimpin industri beton pracetak di Indonesia. Dengan fasilitas produksi yang tersebar di Bandung, Purwakarta dan Pasuruan, perusahaan terus memperluas jangkauan pasar dan memperkuat jaringan distribusinya. Tidak hanya berfokus pada inovasi produk dan teknologi, PT Cisangkan juga menjunjung tinggi pengembangan sumber daya manusia, tanggung jawab sosial perusahaan, serta tata kelola perusahaan yang beretika dan berkelanjutan.
    </p>
    <p className="text-sm text-justify">
Transformasi PT Cisangkan dari sebuah perusahaan lokal di Bandung menjadi pemain nasional yang berpengaruh merupakan cerminan dari komitmen jangka panjang terhadap kualitas, integritas, dan inovasi. Dengan pengalaman lebih dari lima dekade, PT Cisangkan terus bergerak maju sebagai mitra terpercaya dalam menyediakan solusi beton pracetak untuk pembangunan Indonesia.
    </p>
  </div>
      </section>
    </div>
  );
}