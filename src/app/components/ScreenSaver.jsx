"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScreenSaver({ onComplete }) {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  const handleClose = () => {
    setIsExiting(true);
    videoRef.current?.pause();
    
    // Delay sebelum memanggil onComplete untuk memberi waktu animasi fade out
    setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 500); // Sesuaikan dengan durasi fade out
  };

  useEffect(() => {
    const video = videoRef.current;
    let fallbackTimer;

    const handleVideoEnd = () => {
      handleClose();
    };

    const cleanup = () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
        video.pause();
      }
      clearTimeout(fallbackTimer);
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video autoplay started");
          })
          .catch(error => {
            console.error("Autoplay prevented:", error);
            fallbackTimer = setTimeout(handleClose, 8000);
          });
      }
    }

    return cleanup;
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
          >
            {/* <Image
              src="/videos/50th Aniv-3.gif"
              alt="banner sertifikasi"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            /> */}

            {/* <video
          ref={videoRef}
          autoPlay
          muted
          loop={false}
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {
            setShow(false);
            if (onComplete) onComplete();
          }}
        >
          <source src="/videos/50th Aniv-2.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video> */}
          </motion.div>
          
          <motion.button 
            onClick={handleClose}
            className="absolute bottom-8 right-8 bg-white/30 text-white px-4 py-2 rounded-full hover:bg-white/40 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lewati
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center"
          onAnimationComplete={() => {
            setShow(false);
            onComplete?.();
          }}
        >
           {/* <Image
              src="/videos/50th Aniv-3.gif"
              alt="banner sertifikasi"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            /> */}

            {/* <video
          ref={videoRef}
          autoPlay
          muted
          loop={false}
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {
            setShow(false);
            if (onComplete) onComplete();
          }}
        >
          <source src="/videos/50th Aniv-2.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}