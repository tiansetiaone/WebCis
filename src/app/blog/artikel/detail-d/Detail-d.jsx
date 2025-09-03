'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inovasiList = [
  {
    id: 1,
    judul: "Lorem ipsum",
    deskripsi:
      "Lorem ipsum sed in egestas eget amet tristique in integer convallis massa imperdiet enim enim id augue lorem pharetra lacus tincidunt quisque auctor adipiscing in cursus praesent scelerisque amet duis cras mauris orci feugiat diam in urna non vitae id semper ac ac cras senectus ut nam a cras nunc pharetra ac elit eget pharetra turpis a orci eu semper est arcu tempus ultrices lectus morbi id eu pretium urna sit ut donec sed tristique viverra sollicitudin et purus ut semper lobortis quisque posuere nulla aliquet in nunc mi tellus pellentesque amet tempus sit eu nibh ac amet dui lectus id nisi elit neque purus commodo faucibus et lacus neque amet faucibus purus aliquet elementum non lorem lobortis aliquam donec.",
    gambar: "/images/Cisangkan Run.png",
  }
];

// Data untuk daftar proyek (15 item sebagai contoh)
const projectList = [
  { id: 1, title: "Yogya Group", logo: "/images/sponsor-kbp/YOGYA-GROUP.png", url: "https://www.yogyagroup.com/" },
  { id: 2, title: "Grup BCA", logo: "/images/sponsor-kbp/BCA.webp", url: "https://www.bca.co.id/" },
  { id: 3, title: "Dekkson", logo: "/images/sponsor-kbp/Dekson.png", url: "https://www.dekkson.com/" },
  { id: 4, title: "PT. Harmoni Asriindo Semestajaya", logo: "/images/sponsor-kbp/PT. Harmoni Asriindo Semestajaya.png", url: "/proyek/pembangunan-pelabuhan" },
  { id: 5, title: "Nusa Raya Cipta", logo: "/images/sponsor-kbp/Nusa Raya Cipta.png", url: "https://nusarayacipta.com/id/" },
  { id: 6, title: "Mowilex", logo: "/images/sponsor-kbp/Mowilex.jpeg", url: "https://mowilex.com/" },
  { id: 7, title: "Daikin", logo: "/images/sponsor-kbp/Daikin.png", url: "https://www.daikin.co.id/" },
  { id: 8, title: "PT. Teksindo Serviguna", logo: "/images/sponsor-kbp/PT. Teksindo Serviguna.jpg", url: "/proyek/pusat-perbelanjaan" },
  { id: 9, title: "Bank BRI", logo: "/images/sponsor-kbp/Bank BRI.png", url: "https://bri.co.id/" },
  { id: 10, title: "Danamon", logo: "/images/sponsor-kbp/Danamon.jpg", url: "https://www.danamon.co.id/" },
  { id: 11, title: "YKK AP", logo: "/images/sponsor-kbp/YKK AP.png", url: "https://www.ykkap.com/" },
  { id: 12, title: "Pangkal Multikarya", logo: "/images/sponsor-kbp/Pangkal Multikarya.png", url: "https://pangkalmultikarya.com/" },
  { id: 13, title: "BTN", logo: "/images/sponsor-kbp/BTN.jpg", url: "https://www.btn.co.id/" },
  { id: 14, title: "Daya Unggul Perkasa", logo: "/images/sponsor-kbp/Daya Unggul Perkasa.png", url: "/proyek/revitalisasi-kota" },
  { id: 15, title: "PT.Dwijaya Putra", logo: "/images/sponsor-kbp/PT.Dwijaya Putra.jpg", url: "https://pt-dp.com/" },
  { id: 16, title: "Bank Mandiri", logo: "/images/sponsor-kbp/Bank Mandiri.webp", url: "https://www.bankmandiri.co.id/" },
  { id: 17, title: "Maybank", logo: "/images/sponsor-kbp/Maybank.png", url: "https://www.maybank.co.id/" },
  { id: 18, title: "Martha", logo: "/images/sponsor-kbp/Martha.jpg", url: "/proyek/proyek-strategis" },
  { id: 19, title: "Ghani Mandiri Sukses", logo: "/images/sponsor-kbp/Ghani Mandiri Sukses.jpg", url: "https://m.steelindonesia.com/company/index.php?index=about&id=CMP0099416" },
  { id: 20, title: "PT. Surya Galunggung Abadi", logo: "/images/sponsor-kbp/PT. Surya Galunggung Abadi.jpg", url: "/proyek/proyek-strategis" },
  { id: 21, title: "PT. Bambu Tirta Engineering", logo: "/images/sponsor-kbp/PT. Bambu Tirta Engineering.jpg", url: "/proyek/proyek-strategis" },
  { id: 22, title: "UJL", logo: "/images/sponsor-kbp/UJL.jpg", url: "/proyek/proyek-strategis" },
  { id: 23, title: "INDOCEMENT", logo: "/images/sponsor-kbp/INDOCEMENT.jpg", url: "https://www.indocement.co.id/" },
  { id: 24, title: "PT. San Jaya Teknik", logo: "/images/sponsor-kbp/PT. San Jaya Teknik.png", url: "https://www.sanjaya-teknik.com/" },
  { id: 25, title: "PT. Grha Adi Fortuna Indonesia", logo: "/images/sponsor-kbp/PT. Grha Adi Fortuna Indonesia.png", url: "https://gafjakarta.com/" },
  { id: 26, title: "Kraton Precast Concrete", logo: "/images/sponsor-kbp/Kraton Precast Concret.png", url: "https://betonpracetak.co.id/" },
  { id: 27, title: "Multibangun", logo: "/images/sponsor-kbp/Multibangun.jpg", url: "https://multibangunpatria.com/" },
  { id: 28, title: "PT. Gaya Makmur Mobil", logo: "/images/sponsor-kbp/GM Mobil.png", url: "https://gmmobil.com/" },
  { id: 29, title: "PT. Gaya Makmur Tractors", logo: "/images/sponsor-kbp/GM Tractors.png", url: "https://www.gmtractors.net/" },
  { id: 30, title: "Sinarmas Land", logo: "/images/sponsor-kbp/Sinarmas Land.jpg", url: "https://www.sinarmasland.com/" },
  { id: 31, title: "OCBC", logo: "/images/sponsor-kbp/OCBC.png", url: "https://www.ocbc.id/" },
  { id: 32, title: "Lembang Park & Zoo", logo: "/images/sponsor-kbp/Lembang Park-Zoo.png", url: "https://www.lembangparkzoo.co.id/" },
  { id: 33, title: "Djepati", logo: "/images/sponsor-kbp/djepati.png", url: "/proyek/proyek-strategis" },
  { id: 34, title: "AB Pluss", logo: "/images/sponsor-kbp/AB Pluss.png", url: "https://www.abpluss.co.id/" },
  { id: 36, title: "UOB", logo: "/images/sponsor-kbp/UOB.png", url: "https://www.uob.co.id/" },
  { id: 37, title: "Permata Bank", logo: "/images/sponsor-kbp/Permata Bank.png", url: "https://www.permatabank.com/id/home/" },
  { id: 38, title: "Istana Group", logo: "/images/sponsor-kbp/Istana Group.png", url: "https://www.istanagroup.com/" },
  { id: 39, title: "MILLS", logo: "/images/sponsor-kbp/MILLS.png", url: "https://mills.co.id/" },
  { id: 40, title: "Counterpain", logo: "/images/sponsor-kbp/Counterpain.webp", url: "/proyek/proyek-strategis" },
  { id: 41, title: "Ultrajaya", logo: "/images/sponsor-kbp/Ultrajaya.png", url: "https://www.ultrajaya.co.id/" },
  { id: 42, title: "IKEA", logo: "/images/sponsor-kbp/IKEA.png", url: "https://www.ikea.co.id/in?srsltid=AfmBOooKU3xaIkuXYCEx_GnvaAeDFSJ87C3E5LtAr5wpn7vMWGye7IP1" },
];

export default function DetailD() {
  const router = useRouter();
  
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);

  // Fungsi untuk menangani klik pada gambar proyek
  const handleProjectClick = (url) => {
    router.push(url);
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

  useEffect(() => {
    // Ganti ini dengan API call atau ambil dari context/router
    const sampleData = {
      judul: "CISANGKAN KBP CITY RUN 2025 - SPONSORSHIP",
      tanggal: "03 September 2025",
      gambar: "/images/6.jpg",
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
        <div className="w-full max-w-2xl h-[240px] sm:h-[320px] mx-auto bg-gray-200 flex items-center justify-center mb-8">
          {data?.gambar ? (
            <img src={data.gambar} alt={data.judul} className="w-full h-full object-fit" />
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
              <p>Sebagai bagian dari perjalanan panjang kami, PT Cisangkan dengan bangga mengumumkan kolaborasi istimewa dengan Kota Baru Parahyangan dalam penyelenggaraan Cisangkan KBP City Run 2025 pada hari sabtu 6 september 2025 di Bumi Hejo Kota Parahyangan. Acara ini bukan hanya sekadar lomba lari, tetapi juga merupakan perayaan dua tonggak sejarah penting:</p>
              
              <p>50 Tahun PT Cisangkan: Merayakan setengah abad dedikasi dalam industri paving dan genteng.</p>

              <p>25 Tahun Kota Baru Parahyangan: Mengenang seperempat abad perjalanan sebagai kota mandiri yang modern dan berkelanjutan.</p>
            </>
          )}
        </div>

        {/* Daftar Proyek dalam 4 Kolom */}
        <div className="mb-10">
          <h3 className="text-md font-semibold mb-6 text-center">Ucapan Terima Kasih kepada para Sponsor</h3>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {projectList.map((project) => (
    <div key={project.id} className="border-b-black shadow-blue-300 rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-full h-16 mb-2 flex items-center justify-center overflow-hidden">
        {project.logo ? (
          <img 
            src={project.logo} 
            alt={project.title} 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => handleProjectClick(project.url)}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => handleProjectClick(project.url)}
          >
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <h4 className="text-xs font-medium text-gray-800 line-clamp-2">{project.title}</h4>
      {/* <button 
        className="mt-2 text-xs text-blue-600 hover:underline"
        onClick={() => handleProjectClick(project.url)}
      >
        Lihat Detail
      </button> */}
    </div>
  ))}
</div>
          
          {/* <p className="text-center text-sm text-gray-600 mt-6">
            - membawa karya lokal ke berbagai pelosok negeri.
          </p> */}
        </div>
      </section>
    </div>
  );
}