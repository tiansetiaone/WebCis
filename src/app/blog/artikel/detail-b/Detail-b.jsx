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
    gambar: "/images/Cisangkan Run.png",
  }
];



export default function DetailB() {
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

  const [artikels, setArtikels] = useState([]);

  // useEffect(() => {
  //   // Ganti URL ini dengan endpoint backend kamu nanti
  //   axios.get("/api/artikel/terkait")
  //     .then((res) => setArtikels(res.data))
  //     .catch((err) => console.error("Gagal ambil artikel terkait:", err));
  // }, []);

  useEffect(() => {
    // Ganti ini dengan API call atau ambil dari context/router
    const sampleData = {
      judul: "PT. Cisangkan: 50 Tahun Berkarya untuk Indonesia",
      tanggal: "16 Juni 2025",
      gambar: "/images/3.jpg",
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
    {/* <Link href="/blog/kegiatan" className="text-[#333] hover:text-[#2D5DA6]">Kegiatan</Link>
    <Link href="/blog/galeri" className="text-[#333] hover:text-[#2D5DA6]">Galeri</Link> */}
    <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
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
  <div className="text-justify text-sm leading-relaxed text-[#333] space-y-4 pb-10 border-b mb-5">
    {data?.deskripsi ? (
      <p>{data.deskripsi}</p>
    ) : (
      <>
  <p>Bandung, 2025 – Tahun ini menjadi momen istimewa bagi PT. Cisangkan, yang merayakan 50 tahun perjalanannya membangun Indonesia melalui inovasi dan kualitas di industri beton pracetak. Dengan mengusung semangat "Bangga Berkarya, Bangga Indonesia", perusahaan ini menegaskan kembali komitmennya sebagai bagian dari kekuatan pembangunan nasional.</p>

  <p><strong>Dari Bandung untuk Nusantara</strong><br />
  Didirikan pada tahun 1975 di Bandung, PT. Cisangkan lahir dari semangat anak bangsa untuk menghadirkan produk beton yang kuat, fungsional, dan estetis. Dalam lima dekade terakhir, perusahaan telah menjadi mitra terpercaya berbagai proyek strategis nasional – dari jalan raya hingga kawasan pemukiman – membawa karya lokal ke berbagai pelosok negeri.</p>

  <p><strong>Bangga Berkarya: Inovasi dan Mutu Tanpa Kompromi</strong><br />
  Kebanggaan kami terletak pada kemampuan menghasilkan produk dalam negeri yang mampu bersaing secara global. PT. Cisangkan menghadirkan berbagai solusi beton seperti genteng beton, roster, paving block, kanstin, grass block, concrete pipe dan produk arsitektural lainnya, semuanya dirancang dan diproduksi dengan standar mutu tinggi dan proses yang ramah lingkungan.</p>

  <p>Laboratorium internal kami memastikan setiap produk memenuhi standar nasional (SNI), dan kami terus berinovasi agar kualitas lokal tidak hanya diakui, tetapi juga menjadi kebanggaan.</p>

  <p><strong>Bangga Indonesia: Berkontribusi Nyata bagi Negeri</strong><br />
  50 tahun bukan hanya tentang bisnis, tapi tentang kontribusi. PT. Cisangkan percaya bahwa kekuatan bangsa terletak pada karya nyata anak bangsa. Karena itu, kami tidak hanya berfokus pada pertumbuhan perusahaan, tapi juga pada pembangunan masyarakat dan lingkungan.</p>

  <p>Transformasi digital juga kami jalankan untuk menjawab tantangan zaman. Dengan memperkuat kehadiran online, memperluas jaringan pemasaran, serta menggandeng arsitek dan pengembang lokal, kami terus memajukan industri beton pracetak Indonesia.</p>

  <p><strong>Menuju Masa Depan: Semangat Berkarya Tiada Henti</strong></p>

  <p>Dengan semangat "Bangga Berkarya, Bangga Indonesia", PT. Cisangkan siap melangkah ke masa depan sebagai pemimpin industri yang adaptif, berkelanjutan, dan membanggakan. Kami percaya bahwa dengan kolaborasi, inovasi, dan semangat nasionalisme, kita bisa menciptakan Indonesia yang lebih kuat.</p>

  <p>"Kami bangga telah menjadi bagian dari pembangunan Indonesia selama 50 tahun terakhir. Namun yang lebih membanggakan adalah melihat karya anak bangsa berdiri kokoh di tanah sendiri. Mari terus berkarya dan banggakan Indonesia,"</p>

  <p><strong>PT. Cisangkan – 50 Tahun Bangga Berkarya, Bangga Indonesia.</strong></p>
</>
    )}
  </div>

{/* 
  <h2 className="text-xl font-semibold mb-6">ARTIKEL TERKAIT</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {[1, 2].map((id) => (
    <div key={id} className="flex gap-4">
      <div className="w-[100px] h-[100px] bg-gray-300 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V8a1 1 0 011-1zm3 5l2.586 2.586a1 1 0 001.414 0L13 10l5 5" />
        </svg>
      </div>

      <div className="flex-1">
        <h3 className="text-md font-semibold mb-1">
          Lorem ipsum auctor lacinia.
        </h3>
        <p className="text-xs text-[#1A56DB] mb-1">
          DD Month Years
        </p>
        <p className="text-xs text-[#333] leading-relaxed line-clamp-3">
          Lorem ipsum ornare viverra lorem mattis elementum sit viverra vitae est aliquet nisi tristique egestas lorem morbi varius neque magna adipiscing lobortis vivamus velit sed lacus purus sapien...
        </p>
        <a href="/blog/artikel/detail-a" className="text-xs text-[#1A56DB] font-semibold hover:underline">
          Baca Selengkapnya &gt;&gt;
        </a>
      </div>
    </div>
  ))}
</div> */}
</section>
    </div>
  );
}