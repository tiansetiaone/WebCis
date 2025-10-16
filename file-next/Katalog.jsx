'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Katalog() {
  // State untuk panel unduh
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telpon, setTelpon] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const modalRef = useRef(null);
  const [currentDownloadItem, setCurrentDownloadItem] = useState(null);
  

  const [emailError, setEmailError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  // Data katalog
  const katalogList = [
    { id: 1, nama: "Katalog Concrete Roof", image: "/images/katalog-concrete-roof.png", file: "/downloads/katalog/Katalog Concrete Roof Cisangkan.pdf" },
    { id: 2, nama: "Katalog Paving Block", image: "/images/katalog-paving-block.png", file: "/downloads/katalog/Katalog Paving Block Cisangkan.pdf" },
    { id: 3, nama: "Katalog Concrete Block", image: "/images/katalog-concrete-block.png", file: "/downloads/katalog/Katalog Concrete Block Cisangkan.pdf" },
    { id: 4, nama: "Katalog Concrete Pipe", image: "/images/Katalog cp.png", file: "/downloads/katalog/Katalog Concrete Pipe Baru.pdf" },
  ];

  const brosurList = [
    { id: 1, nama: "Flyer Roster R-21", image: "/images/Flyer Roster R-21.png", file: "/downloads/brosur/Flyer Roster R-21.pdf" },
    { id: 2, nama: "Flyer Sandstein (Grand Outlet, Karawang ALT 2)", image: "/images/Flyer Sandstein (Grand Outlet, Karawang ALT 2).png", file: "/downloads/brosur/Flyer Sandstein (Grand Outlet, Karawang ALT 2).pdf"},
    { id: 3, nama: "Flyer Truepave", image: "/images/Flyer Truepave.png", file: "/downloads/brosur/Flyer Truepave 3.pdf" },
    { id: 4, nama: "Flyer Victoria & Dual Slate", image: "/images/Flyer Victoria & Dual Slate.png", file: "/downloads/brosur/FLYER VICTORIA & DUAL SLATE.pdf" },
    { id: 5, nama: "Flyer Neo Solar System", image: "/images/Flyer Neo Solar System-1.png", file: "/downloads/brosur/Flyer Neo Solar System.pdf" },
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Hanya menerima angka
    if (/^\d*$/.test(value)) {
      setTelpon(value);
      if (value && !value.startsWith('62')) {
        setPhoneError('Nomor handphone harus diawali dengan 62');
      } else {
        setPhoneError('');
      }
    }
  };

 // Fungsi validasi email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Fungsi untuk mengirim kode verifikasi
  const sendVerificationCode = () => {
    if (!validateEmail(email)) {
      setEmailError('Format email tidak valid');
      return false;
    }
    
    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setShowVerification(true);
    
    // Simulasi pengiriman email (di production, gunakan email service)
    console.log(`Kode verifikasi dikirim ke ${email}: ${code}`);
    alert(`Kode verifikasi telah dikirim ke ${email}`);
    
    return true;
  };

  // Fungsi verifikasi kode
  const verifyCode = () => {
    if (verificationCode === generatedCode) {
      setIsEmailVerified(true);
      setShowVerification(false);
      return true;
    } else {
      alert('Kode verifikasi salah');
      return false;
    }
  };

  // Modifikasi handleDownload
  const handleDownload = async (e) => {
    e.preventDefault();
    
    // Validasi nomor handphone
    if (telpon && !telpon.startsWith('62')) {
      setPhoneError('Nomor handphone harus diawali dengan 62');
      return;
    } else {
      setPhoneError('');
    }

    if (!name || !email) {
      alert('Harap isi nama dan email terlebih dahulu');
      return;
    }

    // Validasi email
    if (!validateEmail(email)) {
      setEmailError('Format email tidak valid');
      return;
    }

    // Verifikasi email jika belum
    if (!isEmailVerified) {
      if (!showVerification) {
        const success = sendVerificationCode();
        if (!success) return;
      } else {
        const verified = verifyCode();
        if (!verified) return;
      }
      return;
    }

    setIsDownloading(true);

    try {
      // 1. Simpan data ke server
      const saveResponse = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document: currentDownloadItem.nama,
          name,
          email,
          phone: telpon,
          verified: true
        })
      });

      if (!saveResponse.ok) throw new Error('Gagal menyimpan data');

      // 2. Download file
      const pdfUrl = currentDownloadItem.file;
      window.open(pdfUrl, '_blank');

      // 3. Reset form
      setName('');
      setEmail('');
      setTelpon('');
      setIsEmailVerified(false);
      setShowVerification(false);
      setShowDownloadPanel(false);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const openDownloadPanel = (item) => {
    setCurrentDownloadItem(item);
    setShowDownloadPanel(true);
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

  // Settings untuk slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Ref untuk slider
  const katalogSliderRef = useRef(null);
  const brosurSliderRef = useRef(null);

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/Banner Informasi.jpg"
          alt="banner katalog"
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
          <Link href="/informasi/sertifikasi" className="text-[#333] hover:text-[#2D5DA6]">Sertifikasi</Link>
          <Link href="/informasi/katalog" className="text-[#2D5DA6] font-bold">Katalog</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        {/* Heading Katalog */}
        <div className="gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            KATALOG
          </h2>
        </div>

        {/* Slider Katalog */}
        <div className="relative mb-20 border-b border-gray-300 pb-10">
          <Slider {...sliderSettings} ref={katalogSliderRef}>
            {katalogList.map((item) => (
              <div key={item.id} className="px-2">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-70 h-80 aspect-[3/4] overflow-hidden rounded shadow-md transition-transform duration-300 hover:scale-105 mb-8">
                    <Image
                      src={item.image}
                      alt={item.nama}
                      width={300}
                      height={419}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-semibold">{item.nama}</p>
                  <button 
                    onClick={() => openDownloadPanel(item)}
                    className="text-sm text-blue-700 font-medium hover:underline mb-5"
                  >
                    Unduh &gt;&gt;
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Navigation buttons */}
          <button 
            onClick={() => katalogSliderRef.current.slickPrev()}
            className="absolute left-0 top-40 -translate-y-1/2 -translate-x-6 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => katalogSliderRef.current.slickNext()}
            className="absolute right-0 top-40 -translate-y-1/2 translate-x-6 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Heading Brosur */}
        <div id="brosur-section" className="gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            BROSUR
          </h2>
        </div>

        {/* Slider Brosur */}
        <div className="relative mb-20 border-b border-gray-300 pb-10">
          <Slider {...sliderSettings} ref={brosurSliderRef}>
            {brosurList.map((item) => (
              <div key={item.id} className="px-2">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-70 h-80 aspect-[3/4] overflow-hidden rounded shadow-md transition-transform duration-300 hover:scale-105 mb-8">
                    <Image
                      src={item.image}
                      alt={item.nama}
                      width={300}
                      height={419}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-semibold">{item.nama}</p>
                  <button 
                    onClick={() => openDownloadPanel(item)}
                    className="text-sm text-blue-700 font-medium hover:underline mb-5"
                  >
                    Unduh &gt;&gt;
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Navigation buttons */}
          <button 
            onClick={() => brosurSliderRef.current.slickPrev()}
            className="absolute left-0 top-40 -translate-y-1/2 -translate-x-6 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => brosurSliderRef.current.slickNext()}
            className="absolute right-0 top-40 -translate-y-1/2 translate-x-6 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
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
        {/* Close Button (X) */}
        <button
          onClick={() => {
            setShowDownloadPanel(false);
            setShowVerification(false);
            setIsEmailVerified(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold mb-4 border-b border-[#CCCCCC] pb-6 pr-6">
          {showVerification ? 'VERIFIKASI EMAIL' : 'MASUKKAN DATA ANDA'}
        </h3>
        
        <form onSubmit={handleDownload}>
          {!showVerification ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Alamat Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                    setIsEmailVerified(false);
                  }}
                  className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
                {isEmailVerified && (
                  <p className="mt-1 text-sm text-green-600">✓ Email telah diverifikasi</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={telpon}
                  onChange={handlePhoneChange}
                  className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="62xxxxxxxxxx"
                  required
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>
            </>
          ) : (
            <div className="mb-6">
              <p className="text-sm mb-4">Kode verifikasi telah dikirim ke <strong>{email}</strong>. Silakan masukkan kode tersebut di bawah ini:</p>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Kode Verifikasi (6 digit)</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    // Hanya menerima angka dan maksimal 6 digit
                    if (/^\d{0,6}$/.test(e.target.value)) {
                      setVerificationCode(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode('');
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Kirim ulang kode verifikasi
              </button>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowDownloadPanel(false);
                setShowVerification(false);
                setIsEmailVerified(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B203F] text-sm font-medium text-white hover:bg-blue-700 rounded transition-colors flex items-center justify-center min-w-[100px]"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : showVerification ? 'Verifikasi' : 'Lanjutkan'}
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