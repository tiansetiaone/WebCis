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

  const brosurList = [
    { id: 1, nama: "Brosur 1", file: "/images/icon photo.png" },
    { id: 2, nama: "Brosur 2", file: "/images/icon photo.png" },
    { id: 3, nama: "Brosur 3", file: "/images/icon photo.png" },
    { id: 4, nama: "Brosur 4", file: "/images/icon photo.png" },
    { id: 5, nama: "Brosur 5", file: "/images/icon photo.png" },
    { id: 6, nama: "Brosur 6", file: "/images/icon photo.png" },
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
    console.log(`Download katalog oleh ${name} (${email}) (${telpon})`);
    setName('');
    setEmail('');
    setTelpon('');
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
          src="/images/Banner Perusahaan.jpg"
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
    <Link href="/perusahaan/tentang" className="text-[#333] hover:text-[#2D5DA6]">Tentang Kami</Link>
    <Link href="/perusahaan/sejarah" className="text-[#333] hover:text-[#2D5DA6]">Sejarah</Link>
    {/* <Link href="/perusahaan/sertifikasi" className="text-[#333] hover:text-[#2D5DA6]">Sertifikasi</Link> */}
    {/* <Link href="/perusahaan/katalog" className="text-[#2D5DA6] font-bold">Katalog</Link> */}
    {/* <Link href="/perusahaan/video" className="text-[#333] hover:text-[#2D5DA6]">Video</Link> */}
    <Link href="/perusahaan/inovasi" className="text-[#333] hover:text-[#2D5DA6]">Inovasi</Link>
    <Link href="/perusahaan/karir" className="text-[#333] hover:text-[#2D5DA6]">Karir</Link>
  </nav>
</div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-10">
        {/* Heading Katalog */}
        <div className="gap-6 items-start mb-20">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            KATALOG
          </h2>
          <p className="text-sm text-justify">
            Lorem ipsum parturient tristique lobortis at metus libero vulputate morbi ullamcorper senectus tempus at orci et elementum cras tortor aliquet pretium nunc euismod massa nulla bibendum convallis in a egestas erat sed diam dictum orci sed augue enim facilisi placerat montes pretium congue rhoncus magnis bibendum diam maecenas aenean blandit.
          </p>
        </div>

        {/* Slider Katalog */}
        <div className="relative mb-20 border-b border-gray-300 pb-10">
          <Slider {...sliderSettings} ref={katalogSliderRef}>
            {katalogList.map((item) => (
              <div key={item.id} className="px-2">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-70 h-80 aspect-[3/4] overflow-hidden rounded shadow-md transition-transform duration-300 hover:scale-105 mb-8">
                    <Image
                      src={item.file}
                      alt={item.nama}
                      width={300}
                      height={419}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-semibold">{item.nama}</p>
                  <button 
                    onClick={() => setShowDownloadPanel(true)}
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
        <div className="gap-6 items-start mb-20">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">
            BROSUR
          </h2>
          <p className="text-sm text-justify">
            Lorem ipsum parturient tristique lobortis at metus libero vulputate morbi ullamcorper senectus tempus at orci et elementum cras tortor aliquet pretium nunc euismod massa nulla bibendum convallis in a egestas erat sed diam dictum orci sed augue enim facilisi placerat montes pretium congue rhoncus magnis bibendum diam maecenas aenean blandit.
          </p>
        </div>

        {/* Slider Brosur */}
        <div className="relative mb-20 border-b border-gray-300 pb-10">
          <Slider {...sliderSettings} ref={brosurSliderRef}>
            {brosurList.map((item) => (
              <div key={item.id} className="px-2">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-70 h-80 aspect-[3/4] overflow-hidden rounded shadow-md transition-transform duration-300 hover:scale-105 mb-8">
                    <Image
                      src={item.file}
                      alt={item.nama}
                      width={300}
                      height={419}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-semibold">{item.nama}</p>
                  <button 
                    onClick={() => setShowDownloadPanel(true)}
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
        {/* Download Panel Modal dengan Animasi */}
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