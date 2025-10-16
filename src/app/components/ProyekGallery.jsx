'use client';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProyekGallery({ proyekList }) {
  const [selectedProyek, setSelectedProyek] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [displayedProyek, setDisplayedProyek] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Inisialisasi modal dan handle perubahan proyekList
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactModal.setAppElement('body');
    }

    // Handle fade transition when proyekList changes
    if (proyekList.length > 0) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayedProyek(proyekList);
        setIsTransitioning(false);
      }, 100); // Match this with animation duration

      return () => clearTimeout(timer);
    }
  }, [proyekList]);

  // Hitung ukuran gambar saat dipilih
  useEffect(() => {
    if (!selectedProyek) return;

    const img = new window.Image();
    img.src = selectedProyek.file;
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      let width = img.width;
      let height = img.height;

      // Adjust ukuran untuk gambar landscape
      if (width > height) {
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }
      } else {
        // Untuk gambar portrait
        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
      }

      setImageSize({ width, height });
    };
  }, [selectedProyek]);

  const handleImageClick = (proyek) => {
    setSelectedProyek(proyek);
  };

  return (
    <>
      {/* Grid Gallery dengan AnimatePresence untuk fade effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(displayedProyek.map(p => p.id))} // Unique key based on current items
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-black mb-20"
        >
          {displayedProyek.map((item) => (
            <motion.div 
              key={item.id}
              className="block border border-[#2957A4] rounded-md overflow-hidden transition-transform duration-300 hover:scale-105 no-underline cursor-pointer"
              onClick={() => handleImageClick(item)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout // Add layout animation for smooth repositioning
            >
              <div className="bg-gray-300 w-full aspect-[6/3] flex items-center justify-center">
                <Image
                  src={item.file}
                  alt={item.nama}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={600}
                  height={300}
                  unoptimized={true}
                />
              </div>
              <div className="bg-white px-4 py-3 text-left">
                <p className="text-sm font-semibold text-black mb-2 2xl:text-base">{item.nama}</p>
                <p className="text-xs 2xl:text-sm text-blue-700 font-medium">{item.lokasi}</p>
                <p className="text-xs 2xl:text-sm text-blue-700 font-medium">{item.tempat}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Image Modal dengan Animasi (tetap sama) */}
      <ReactModal
        isOpen={!!selectedProyek}
        onRequestClose={() => setSelectedProyek(null)}
        contentLabel="Image Modal"
        closeTimeoutMS={300}
        className="modal"
        overlayClassName="modal-overlay"
        style={{
          content: {
            padding: '0',
            border: 'none',
            background: 'transparent',
            inset: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            opacity: 0,
            transition: 'opacity 300ms ease-in-out'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: 'background-color 300ms ease-in-out',
            zIndex: 1000
          }
        }}
        overlayElement={(props, contentElement) => (
          <AnimatePresence>
            {selectedProyek && (
              <motion.div
                {...props}
                initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                animate={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                transition={{ duration: 0.3 }}
              >
                {contentElement}
              </motion.div>
            )}
          </AnimatePresence>
        )}
        contentElement={(props, children) => (
          <motion.div
            {...props}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      >
        {selectedProyek && (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProyek(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 bg-black bg-opacity-50 rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <div 
              className="relative bg-black flex items-center justify-center"
              style={{
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
                maxWidth: '90vw',
                maxHeight: '90vh'
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <Image
                  src={selectedProyek.file}
                  alt={selectedProyek.nama}
                  className="object-contain"
                  fill
                  unoptimized={true}
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold">{selectedProyek.nama}</h3>
              <p className="text-sm">{selectedProyek.lokasi} • {selectedProyek.tempat}</p>
            </motion.div>
          </div>
        )}
      </ReactModal>

      <style jsx global>{`
        .ReactModal__Overlay {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }
        
        .ReactModal__Overlay--after-open {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.9) !important;
        }
        
        .ReactModal__Overlay--before-close {
          opacity: 0;
        }
        
        .modal {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
        }
        
        .modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 1000 !important;
        }
      `}</style>
    </>
  );
}