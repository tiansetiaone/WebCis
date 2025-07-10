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



export default function DetailA() {
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
      judul: "CISANGKAN KBP CITY RUN 2025",
      tanggal: "16 Juni 2025",
      gambar: "/images/Cisangkan Run.png",
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
        <p><strong>"Run the Celebration!" </strong><br/> Merayakan 50 Tahun PT Cisangkan dan 25 Tahun Kota Baru Parahyangan.</p>
  <p>Sebagai bagian dari perjalanan panjang kami, PT Cisangkan dengan bangga mengumumkan kolaborasi istimewa dengan Kota Baru Parahyangan dalam penyelenggaraan Cisangkan KBP City Run 2025. Acara ini bukan hanya sekadar lomba lari, tetapi juga merupakan perayaan dua tonggak sejarah penting:</p>

  <p>50 Tahun PT Cisangkan: Merayakan setengah abad dedikasi dalam industri paving dan genteng.</p>

  <p>25 Tahun Kota Baru Parahyangan: Mengenang seperempat abad perjalanan sebagai kota mandiri yang modern dan berkelanjutan.</p>

  <p>Dengan semangat kebersamaan, kami mengajak seluruh masyarakat untuk bergabung dalam perayaan ini melalui tema "Run the Celebration!". Mari bersama-sama merayakan pencapaian dan semangat sehat bersama dalam Cisangkan KBP City Run 2025.</p>

  <p>📅 <strong>Informasi Acara</strong><br />
  Tanggal: Sabtu, 6 September 2025<br />
  Waktu Mulai: Pukul 15:00 – 21.00 WIB<br />
  Lokasi: Bumi Hejo, Kota Baru Parahyangan, Kabupaten Bandung Barat</p>

  <p>🏅 <strong>Kategori Lomba</strong><br />
  Untuk memenuhi berbagai kelompok usia dan tingkat kemampuan, KBP City Run 2025 menawarkan beberapa kategori lomba:</p>

  <p><strong>Speedy Run (Anak-anak):</strong><br />
  Kategori khusus untuk anak-anak usia 3–13 tahun,<br />
  dibagi dalam kelompok usia 3–5 tahun, 6–8 tahun, dan 9–13 tahun.</p>
  
  <p><strong>5K Pelajar:</strong> Lomba lari sejauh 5 kilometer khusus untuk pelajar.</p>
  <p><strong>5K Umum:</strong> Lomba lari sejauh 5 kilometer terbuka untuk umum.</p>
  <p><strong>10K Umum:</strong> Lomba lari sejauh 10 kilometer terbuka untuk umum.</p>

  <p>🎉 <strong>Aktivitas Pasca Lomba</strong><br />
  Setelah lomba, peserta dapat menikmati berbagai aktivitas menarik di area race village, seperti:<br />
  <strong>Live Music & Hiburan:</strong> Menikmati penampilan musik dan hiburan lainnya.<br />
  <strong>Kuliner Lokal:</strong> Mencicipi berbagai makanan dan minuman dari berbagai tenant yang hadir.</p>

  <p>📌 <strong>Pendaftaran & Tiket</strong><br />
  Pendaftaran dapat dilakukan melalui situs resmi kbpcityrun.com.<br />
  Pastikan untuk mendaftar segera karena tiket terbatas.</p>

  <p>🔔 <strong>Ayo Bergabung!</strong><br />
  Jangan lewatkan kesempatan untuk menjadi bagian dari Cisangkan KBP City Run 2025. Ajak keluarga, teman, dan komunitas Anda untuk bersama-sama merayakan olahraga, kesehatan, dan kebersamaan di Kota Baru Parahyangan. Segera daftarkan diri Anda dan raih pengalaman lari yang tak terlupakan!</p>

  <p>Mari lari bersama, sehat bersama, dan jadikan Cisangkan KBP City Run 2025 sebagai bagian dari perjalanan hidup sehat Anda!</p>
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