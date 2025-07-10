'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sertifikasi() {
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telpon, setTelpon] = useState('');
  const [currentDownloadItem, setCurrentDownloadItem] = useState(null);
  const modalRef = useRef(null);
  const [activeItem, setActiveItem] = useState('Concrete Roof');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const mainProducts = ['Concrete Roof', 'Paving Block', 'Concrete Block', 'Concrete Pipe'];
  const subProducts = ['Neo', 'Victoria', 'Dust Stone', 'Excelent', 'Majestic', 'Crown', 'New Royal'];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
      setActiveSubItem(product);
      sessionStorage.setItem('autoExpand', 'true');
      sessionStorage.setItem('activeSubItem', product);
    }
  }, []);

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
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const productTypes = [
    { name: 'Neo', image: '/images/icon photo.png' },
    { name: 'Victoria', image: '/images/icon photo.png' },
    { name: 'Victoria Multiline', image: '/images/icon photo.png' }, 
    { name: 'Victoria Slate', image: '/images/icon photo.png' }, 
    { name: 'Victoria Pine', image: '/images/Victoria Pine Clear.png' }
  ];
  const visibleSlides = 4;

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

  const [slopeAngle, setSlopeAngle] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculationType, setCalculationType] = useState('Luas Atap');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

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
    console.log(`Download katalog ${currentDownloadItem} oleh ${name} (${email}) (${telpon})`);
    setName('');
    setEmail('');
    setTelpon('');
    setShowDownloadPanel(false);
  };

  const handleTKDNDownload = () => {
    // Direct to TKDN official website
    window.open('https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=nHTdkkt3VN7_Y1M_OfKwyLOys7-lTTfsQ6VteJmphdA', '_blank');
  };

  const openDownloadPanel = (item) => {
    if (item === 'TKDN') {
      handleTKDNDownload();
    } else {
      setCurrentDownloadItem(item);
      setShowDownloadPanel(true);
    }
  };

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
          src="/images/Banner Perusahaan.jpg"
          alt="banner sertifikasi"
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
          <Link href="/perusahaan/sertifikasi" className="text-[#2D5DA6] font-bold">Sertifikasi</Link>
          <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">Inovasi</Link>
          <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">Karir</Link>
        </nav>
      </div>

      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-20">
        {/* Heading */}
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase">
            SERTIFIKASI<br />
            PT CISANGKAN
          </h2>
        </div>

        {/* Grid Sertifikasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {[
            {
              id: 'SNI',
              src: '/images/SNI.png',
              alt: 'SNI',
              description: 'SNI adalah standar yang ditetapkan oleh Badan Standardisasi Nasional (BSN) untuk menjamin kualitas, keamanan, dan keandalan produk.',
            },
            {
              id: 'TKDN',
              src: '/images/TKDN.png',
              alt: 'TKDN',
              description: 'TKDN menunjukkan seberapa besar komponen lokal yang digunakan dalam suatu produk atau jasa.',
            },
            {
              id: 'IAPMO',
              src: '/images/IAPMO.png',
              alt: 'APM',
              description: 'Sertifikasi IAPMO merupakan pengakuan internasional terhadap kualitas dan keamanan produk plumbing dan mekanikal.',
            },
            {
              id: 'KAN',
              src: '/images/KAN.png',
              alt: 'KAN',
              description: 'KAN memberikan akreditasi terhadap lembaga sertifikasi dan laboratorium pengujian yang kredibel.',
            },
            {
              id: 'GREEN_LABEL',
              src: '/images/GREEN LABEL.png',
              alt: 'Green Label',
              description: 'Green Label adalah tanda pengakuan bahwa produk kami ramah lingkungan dan berkelanjutan.',
            },
          ].map((item, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className="border border-gray-300 bg-[#E4EEFF] shadow-sm rounded overflow-hidden mb-4">
                <div className="bg-white p-6 flex items-center justify-center h-40 transition-transform duration-300 hover:scale-105">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-justify text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => openDownloadPanel(item.id)}
                className="text-sm text-blue-700 font-medium hover:underline"
              >
                Unduh &gt;&gt;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Download Panel Modal */}
      <AnimatePresence>
        {showDownloadPanel && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-lg p-6 w-full max-w-md relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setShowDownloadPanel(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-lg font-semibold mb-4 border-b border-[#CCCCCC] pb-6 pr-6">MASUKKAN NAMA DAN EMAIL</h3>
              <form onSubmit={handleDownload}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Masukkan Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Masukkan Alamat Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Masukkan No Telp./Hp</label>
                  <input
                    type="text"
                    value={telpon}
                    onChange={(e) => setTelpon(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDownloadPanel(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B203F] text-sm font-medium text-white hover:bg-blue-700 rounded transition-colors"
                  >
                    Download
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}