'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@/app/style/Tentang.css';


const LocationMap = dynamic(() => import('@/app/components/LocationMap'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Memuat peta...</div>
});

export default function Tentang() {
  // Deklarasi semua state di awal komponen
  const [isClient, setIsClient] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [activeItem, setActiveItem] = useState('Concrete Roof');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slopeAngle, setSlopeAngle] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculationType, setCalculationType] = useState('Luas Atap');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(false);


  // Refs dan konstanta
  const sliderRef = useRef(null);
  const mainProducts = ['Concrete Roof', 'Paving Block', 'Concrete Block', 'Concrete Pipe'];
  const subProducts = ['Neo', 'Victoria', 'Dust Stone', 'Excelent', 'Majestic', 'Crown', 'New Royal'];
  const productTypes = [
    { name: 'Neo', image: '/images/icon photo.png' },
    { name: 'Victoria', image: '/images/icon photo.png' },
    { name: 'Victoria Multiline', image: '/images/icon photo.png' },
    { name: 'Victoria Slate', image: '/images/icon photo.png' },
    { name: 'Victoria Pine', image: '/images/Victoria Pine Clear.png' }
  ];
  const visibleSlides = 4;

  // Effects
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const product = urlParams.get('product');
      
      if (product) {
        setActiveSubItem(product);
        sessionStorage.setItem('autoExpand', 'true');
        sessionStorage.setItem('activeSubItem', product);
      }
    }
  }, []);

  // Handler functions
  const handleMainItemClick = (item) => {
    setActiveItem(item);
    setActiveSubItem(null);
    if (item === 'Concrete Roof') {
      setShowSubmenu(!showSubmenu);
    } else {
      setShowSubmenu(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
  };

  const nextSlide = () => {
    if (currentSlide < productTypes.length - visibleSlides) {
      setCurrentSlide(currentSlide + 1);
      scrollToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      scrollToSlide(currentSlide - 1);
    }
  };

  const scrollToSlide = (slideIndex) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth || 0;
      sliderRef.current.scrollTo({
        left: slideIndex * (slideWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const calculateRequirement = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      let calculatedResult;
      
      if (calculationType === 'Luas Atap') {
        calculatedResult = Math.ceil(value * 8);
      } else {
        let roofArea = value;
        
        if (slopeAngle) {
          const angle = parseFloat(slopeAngle);
          roofArea = value / Math.cos(angle * Math.PI / 180);
        } else {
          roofArea = value * 1.5;
        }
        
        calculatedResult = Math.ceil(roofArea * 8);
      }
      
      setResult(calculatedResult.toString());
    }
  };

  // Conditional rendering setelah semua Hook
  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Memuat halaman...</div>;
  }

  return (
    <div className="body-container mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="image-container relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/Banner Perusahaan.jpg"
          alt="Banner Perusahaan"
          width={1764}
          height={460}
          className="w-full h-full object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Header Section */}
      <div className="bg-[#F2F2F2] py-4">
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex 2xl:text-lg justify-center space-x-10 text-[1rem] font-light tracking-wide">
        <Link href="/perusahaan/tentang" className="text-[#2D5DA6] font-bold hover:underline">
          Tentang Kami
        </Link>
        <Link href="/perusahaan/sejarah" className="text-[#333] hover:text-[#2D5DA6]">
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
          <span>Tentang Kami</span>
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
            <Link href="/perusahaan/sejarah" className="text-[#333] hover:text-[#2D5DA6]">
              Sejarah
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

      {/* Tentang PT. Cisangkan */}
      <div className="px-6 xl:px-24 mx-auto mt-12 text-justify space-y-6 text-sm sm:text-base max-w-screen-3xl">
        <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] mb-4 pl-4 2xl:text-2xl">TENTANG PT. CISANGKAN</h2>
        <p className='xl:text-sm 2xl:text-lg'>
          PT Cisangkan, yang didirikan pada tahun 1975, telah berhasil mempelopori dan secara aktif menciptakan inovasi produk baru dalam produksi beton pra-cetak, yang menjadikan PT Cisangkan sebagai pelopor dalam bidang manufaktur berbasis beton. Sejak saat itu, PT Cisangkan berperan penting dalam pengembangan industri beton, tidak hanya di tingkat lokal, tapi juga di tingkat nasional dan internasional.
        </p>
        <p className='xl:text-sm 2xl:text-lg'>
          Dari empat kantor yang kini milik sekarang, PT Cisangkan mampu memberikan pelayanan yang baik kepada banyak klien, seperti badan pemerintah, arsitek, pengembang dan juga kontraktor baik di sektor swasta maupun publik. PT Cisangkan sebagai salah satu perusahaan dalam bidang manufaktur berbasis beton independen terkemuka di Indonesia, juga memberikan layanan internasional untuk memberikan nilai tambah bagi industri konstruksi dalam jenis produk beton pra-cetak apapun.
        </p>
        <p className='xl:text-sm 2xl:text-lg'>
          Reputasi kami untuk keunggulan kualitas dan manufaktur, telah menempatkan PT Cisangkan di jajaran teratas penyedia bahan bangunan rumah di Indonesia.
        </p>

        {/* Visi Misi */}
        <div className="mt-10 space-y-4">
          <h3 className="font-bold xl:text-sm 2xl:text-lg text-slate-700">Visi</h3>
          <p className='xl:text-sm 2xl:text-lg'>Menjadi perusahaan genteng beton dan paving pilihan utama dan terpercaya di Indonesia</p>

          <h3 className="font-bold xl:text-sm 2xl:text-lg text-slate-700">Misi</h3>
          <p className='xl:text-sm 2xl:text-lg'>
            Mendesain, memproduksi dan memasarkan produk dengan kualitas terbaik. Mengembangkan produk bahan bangunan beton yang berorientasikan kepuasan konsumen. Membangun sumber daya manusia yang tangguh, unggul dan bermartabat.
          </p>
        </div>

        {/* Makna CISANGKAN */}
        <div className="mt-10">
          <h3 className="font-bold xl:text-sm 2xl:text-lg text-slate-700 mb-4">MAKNA CISANGKAN</h3>
          <ul className="grid gap-3 grid-cols-[auto_1fr] items-baseline text-slate-700">
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>C</li>
            <li className='xl:text-sm 2xl:text-lg'>ustomer Focus</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>I</li>
            <li className='xl:text-sm 2xl:text-lg'>nnovative</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>S</li>
            <li className='xl:text-sm 2xl:text-lg'>ervice Excellence</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>A</li>
            <li className='xl:text-sm 2xl:text-lg'>ttractive Design</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1'>'N</li>
            <li className='xl:text-sm 2xl:text-lg'>durance</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>G</li>
            <li className='xl:text-sm 2xl:text-lg'>reat Performance</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>K</li>
            <li className='xl:text-sm 2xl:text-lg'>ey Partner</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>A</li>
            <li className='xl:text-sm 2xl:text-lg'>daptive</li>
            <li className='xl:text-xl 2xl:text-2xl font-bold text-[#2D5DA6] col-span-1 text-center'>N</li>
            <li className='xl:text-sm 2xl:text-lg'>etworking</li>
          </ul>
        </div>

        {/* Lokasi Map */}
        <div className="mt-15">
          <h3 className="font-bold xl:text-sm 2xl:text-lg text-slate-700">LOKASI PT. CISANGKAN</h3>
          <LocationMap />
        </div>

        {/* Lokasi Fisik */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mt-10 text-center px-2 2xl:items-baseline 2xl:justify-items-center">
          <div className="group 2xl:w-80">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/bandung.jpg" 
                alt="Head Office" 
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8 2xl:text-lg">HEAD OFFICE & FACTORY</p>
            <p className="text-xs/5 2xl:text-sm">Jl. Haji Alpi No 107, Cijerah, <br/>Bandung 40221</p>
            <p className="text-xs/5 2xl:text-sm">Telp. (022) 6031588 (hunting)</p>
            <p className="text-xs/5 2xl:text-sm">Fax. (022) 6030467</p>
          </div>

          <div className="group 2xl:w-80">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/jakarta.jpg" 
                alt="House of Cisangkan"  
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8 2xl:text-lg">HOUSE OF CISANGKAN</p>
            <p className="text-xs/5 2xl:text-sm">Kompleks Perkantoran<br/>Intercon Plaza E-16,</p>
            <p className="text-xs/5 2xl:text-sm">Jl. Meruya Ilir - Jakarta Barat 11630</p>
            <p className="text-xs/5 2xl:text-sm">Telp. (021) 5853305 (hunting)</p>
            <p className="text-xs/5 2xl:text-sm">Fax. (021) 5307452</p>
          </div>

          <div className="group 2xl:w-80">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/purwakarta.jpg" 
                alt="Purwakarta Factory" 
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8 2xl:text-lg">PURWAKARTA FACTORY</p>
            <p className="text-xs/5 2xl:text-sm">JL. Raya Cibatu Km.14,2 <br/>Campaka - Purwakarta 41115</p>
            <p className="text-xs/5 2xl:text-sm">Telp. (0264) 208143, 2018146, 209630</p>
            <p className="text-xs/5 2xl:text-sm">Fax. (0264) 209654</p>
          </div>

          <div className="group 2xl:w-80">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/pasuruan.jpeg" 
                alt="Pasuruan Factory"   
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8 2xl:text-lg">PASURUAN FACTORY</p>
            <p className="text-xs/5 2xl:text-sm">Jl. Raya Sedarum KM 19, No 8A<br/> Nguling, Kab. Pasuruan<br/>Jawa Timur 67185</p>
            <p className="text-xs/5 2xl:text-sm">Telp. (0343) 4507786, 4508802, 4507778</p>
          </div>
        </div>
      </div>
    </div>
  );
}