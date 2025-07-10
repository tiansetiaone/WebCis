'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

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
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
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
        <nav className="flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
          <Link href="/perusahaan/tentang" className="text-[#2D5DA6] font-bold hover:underline">
            Tentang Kami
          </Link>
          <Link href="/perusahaan/sejarah" className="text-[#333] hover:text-[#2D5DA6]">
            Sejarah
          </Link>
          {/* <Link href="/perusahaan/sertifikasi" className="text-[#333] hover:text-[#2D5DA6]">
            Sertifikasi
          </Link> */}
          {/* <Link href="/perusahaan/katalog" className="text-[#333] hover:text-[#2D5DA6]">
            Katalog
          </Link> */}
          {/* <Link href="/perusahaan/video" className="text-[#333] hover:text-[#2D5DA6]">
            Video
          </Link> */}
          <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">
            Inovasi
          </Link>
          <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">
            Karir
          </Link>
        </nav>
      </div>

      {/* Tentang PT. Cisangkan */}
      <div className="max-w-6xl px-6 sm:px-12 mx-auto mt-12 text-justify space-y-6 text-sm sm:text-base">
        <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] mb-4 pl-4">TENTANG PT. CISANGKAN</h2>
        <p className='text-sm'>
          PT Cisangkan, yang didirikan pada tahun 1975, telah berhasil mempelopori dan secara aktif menciptakan inovasi produk baru dalam produksi beton pra-cetak, yang menjadikan PT Cisangkan sebagai pelopor dalam bidang manufaktur berbasis beton. Sejak saat itu, PT Cisangkan berperan penting dalam pengembangan industri beton, tidak hanya di tingkat lokal, tapi juga di tingkat nasional dan internasional.
        </p>
        <p className='text-sm'>
          Dari empat kantor yang kini milik sekarang, PT Cisangkan mampu memberikan pelayanan yang baik kepada banyak klien, seperti badan pemerintah, arsitek, pengembang dan juga kontraktor baik di sektor swasta maupun publik. PT Cisangkan sebagai salah satu perusahaan dalam bidang manufaktur berbasis beton independen terkemuka di Indonesia, juga memberikan layanan internasional untuk memberikan nilai tambah bagi industri konstruksi dalam jenis produk beton pra-cetak apapun.
        </p>
        <p className='text-sm'>
          Reputasi kami untuk keunggulan kualitas dan manufaktur, telah menempatkan PT Cisangkan di jajaran teratas penyedia bahan bangunan rumah di Indonesia.
        </p>

        {/* Visi Misi */}
        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-sm text-slate-700">Visi</h3>
          <p className='text-sm'>Menjadi perusahaan genteng beton dan paving pilihan utama dan terpercaya di Indonesia</p>

          <h3 className="font-bold text-sm text-slate-700">Misi</h3>
          <p className='text-sm'>
            Mendesain, memproduksi dan memasarkan produk dengan kualitas terbaik. Mengembangkan produk bahan bangunan beton yang berorientasikan kepuasan konsumen. Membangun sumber daya manusia yang tangguh, unggul dan bermartabat.
          </p>
        </div>

        {/* Makna CISANGKAN */}
        <div className="mt-10">
          <h3 className="font-bold text-sm text-slate-700 mb-4">MAKNA CISANGKAN</h3>
          <ul className="grid gap-3 grid-cols-[auto_1fr] items-baseline text-slate-700">
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>C</li>
            <li className='text-sm'>ustomer Focus</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>I</li>
            <li className='text-sm'>nnovative</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>S</li>
            <li className='text-sm'>ervice Excellence</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>A</li>
            <li className='text-sm'>ttractive Design</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1'>'N</li>
            <li className='text-sm'>durance</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>G</li>
            <li className='text-sm'>reat Performance</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>K</li>
            <li className='text-sm'>ey Partner</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>A</li>
            <li className='text-sm'>daptive</li>
            <li className='text-xl font-bold text-[#2D5DA6] col-span-1 text-center'>N</li>
            <li className='text-sm'>etworking</li>
          </ul>
        </div>

        {/* Lokasi Map */}
        <div className="mt-15">
          <h3 className="font-bold text-sm text-slate-700">LOKASI PT. CISANGKAN</h3>
          <LocationMap />
        </div>

        {/* Lokasi Fisik */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mt-10 text-center px-2">
          <div className="group">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/bandung.jpg" 
                alt="Head Office" 
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8">HEAD OFFICE & FACTORY</p>
            <p className="text-xs/5">Jl. Haji Alpi No 107, Cijerah, <br/>Bandung 40221</p>
            <p className="text-xs/5">Telp. (022) 6031588 (hunting)</p>
            <p className="text-xs/5">Fax. (022) 6030467</p>
          </div>

          <div className="group">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/jakarta.jpg" 
                alt="House of Cisangkan"  
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8">HOUSE OF CISANGKAN</p>
            <p className="text-xs/5">Kompleks Perkantoran<br/>Intercon Plaza E-16,</p>
            <p className="text-xs/5">Jl. Meruya Ilir - Jakarta Barat 11630</p>
            <p className="text-xs">Telp. (021) 5853305 (hunting)</p>
            <p className="text-xs">Fax. (021) 5307452</p>
          </div>

          <div className="group">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/purwakarta.jpg" 
                alt="Purwakarta Factory" 
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8">PURWAKARTA FACTORY</p>
            <p className="text-xs/5">JL. Raya Cibatu Km.14,2 <br/>Campaka - Purwakarta 41115</p>
            <p className="text-xs/5">Telp. (0264) 208143, 2018146, 209630</p>
            <p className="text-xs">Fax. (0264) 209654</p>
          </div>

          <div className="group">
            <div className="overflow-hidden rounded-md relative w-full pb-[100%]">
              <Image 
                src="/images/pasuruan.jpeg" 
                alt="Pasuruan Factory"   
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <p className="mt-2 font-bold text-sm/8">PASURUAN FACTORY</p>
            <p className="text-xs/5">Jl. Raya Sedarum KM 19, No 8A<br/> Nguling, Kab. Pasuruan<br/>Jawa Timur 67185</p>
            <p className="text-xs">Telp. (0343) 4507786, 4508802, 4507778</p>
          </div>
        </div>
      </div>
    </div>
  );
}