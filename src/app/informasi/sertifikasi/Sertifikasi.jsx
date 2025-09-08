'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/app/style/Sertifikasi.css';

export default function Sertifikasi() {
  const [showDownloadPanel, setShowDownloadPanel] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telpon, setTelpon] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDownloadItem, setCurrentDownloadItem] = useState(null);
  const modalRef = useRef(null);
  
  // State for document list
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  
  // Document map
  const fileMap = {
    'SNI': [
      { name: 'Sertifikat SNI Genteng No.CPCB-0433', path: '/downloads/13. Sertifikat SNI Genteng No.CPCB-0433.pdf' },
      { name: 'Dokumen SNI-0096-2007-GENTENG BETON', path: '/downloads/SNI-0096-2007-GENTENG BETON.pdf' },
      { name: 'Sertifikat SPPT-SNI PT. CISANGKAN', path: '/downloads/12. Sertifikat SPPT-SNI, PT. CISANGKAN No.6008 2 Paving.pdf' }
    ],
    'TKDN': [
      { name: 'Sertifikat TKDN', path: 'https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=nHTdkkt3VN7_Y1M_OfKwyLOys7-lTTfsQ6VteJmphdA' }
    ],
    'IAPMO': [
      { name: 'SERT ISO 9001 - PT. Cisangkan', path: '/downloads/40. SERT ISO 9001 - PT. Cisangkan.pdf' }
    ],
    'KAN': [
      { name: 'Sertifikat KAN', path: '/downloads/kan-certificate.pdf' }
    ],
    'GREEN_LABEL': [
      { name: 'Sertifikat Green Label', path: '/downloads/48. Sertifikat Green Label.pdf' }
    ]
  };

  // Handle certification click
  const handleCertificationClick = (certId) => {
    setSelectedCertification(certId);
    
    if (!fileMap[certId] || fileMap[certId].length === 0) {
      console.error('No documents found for this certification');
      return;
    }

    if (fileMap[certId].length === 1) {
      if (certId === 'TKDN') {
        window.open(fileMap[certId][0].path, '_blank');
      } else {
        setCurrentDownloadItem({
          certId,
          docName: fileMap[certId][0].name,
          docPath: fileMap[certId][0].path
        });
        setShowDownloadPanel(true);
      }
    } else {
      setShowDocumentList(true);
    }
  };

  // Handle document selection from list
  const handleDocumentSelect = (doc) => {
    setShowDocumentList(false);
    setCurrentDownloadItem({
      certId: selectedCertification,
      docName: doc.name,
      docPath: doc.path
    });
    setShowDownloadPanel(true);
  };

  // Handle download submission
  const handleDownload = async (e) => {
    e.preventDefault();
    
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

    setIsDownloading(true);

    try {
      const saveResponse = await fetch('/api/downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: `${currentDownloadItem.certId} - ${currentDownloadItem.docName}`,
          name,
          email,
          phone: telpon
        })
      });

      if (!saveResponse.ok) throw new Error('Gagal menyimpan data');

      window.open(currentDownloadItem.docPath, '_blank');

      setName('');
      setEmail('');
      setTelpon('');
      setShowDownloadPanel(false);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTelpon(value);
      if (value && !value.startsWith('62')) {
        setPhoneError('Nomor handphone harus diawali dengan 62');
      } else {
        setPhoneError('');
      }
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDownloadPanel(false);
        setShowDocumentList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
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
          src="/images/Banner Informasi.jpg"
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
        <nav className="flex justify-center space-x-10 text-[1rem] font-light tracking-wide 2xl:text-lg">
          <Link href="/informasi/sertifikasi" className="text-[#2D5DA6] font-bold">Sertifikasi</Link>
          <Link href="/informasi/katalog" className="text-[#333] hover:text-[#2D5DA6]">Katalog</Link>
        </nav>
      </div>

      <section className="mx-auto mt-12 px-6 xl:px-26 sm:px-12 text-sm sm:text-base mb-20">
        {/* Heading */}
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-start mb-10">
          <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase 2xl:text-2xl">
            SERTIFIKASI<br />
            PT CISANGKAN
          </h2>
        </div>

        {/* Grid Sertifikasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black 2xl:gap-14">
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
              id: 'GREEN_LABEL',
              src: '/images/GREEN LABEL.png',
              alt: 'Green Label',
              description: 'Green Label adalah tanda pengakuan bahwa produk kami ramah lingkungan dan berkelanjutan.',
            },
          ].map((item, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className="border border-gray-300 bg-[#E4EEFF] shadow-sm rounded overflow-hidden mb-4">
                <div className="bg-white p-6 flex items-center justify-center h-40 2xl:h-60 transition-transform duration-300 hover:scale-105">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-4 2xl:h-24">
                  <p className="font-semibold text-justify text-xs 2xl:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleCertificationClick(item.id)}
                className="text-sm 2xl:text-lg text-blue-700 font-medium hover:underline"
              >
                Unduh &gt;&gt;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Document List Modal */}
      <AnimatePresence>
        {showDocumentList && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setShowDocumentList(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-md font-semibold mb-4 border-b border-[#CCCCCC] pb-2">
                Pilih Dokumen {selectedCertification}
              </h3>
              
              <div className="space-y-2">
                {fileMap[selectedCertification]?.map((doc, index) => (
                  <button
                    key={index}
                    onClick={() => handleDocumentSelect(doc)}
                    className="w-full text-left px-4 py-2 text-sm border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    {doc.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

              <h3 className="text-lg font-semibold mb-4 border-b border-[#CCCCCC] pb-6 pr-6">
                DOWNLOAD: {currentDownloadItem?.docName}
              </h3>
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
                <div className="mb-4">
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
                    onChange={handlePhoneChange}
                    className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="62xxxxxxxxxx"
                    required
                  />
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                  )}
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
                    ) : (
                      'Download'
                    )}
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