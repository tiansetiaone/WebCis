"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// URL video dari Vercel Blob Storage
const BLOB_VIDEO_URL = "https://1e6pmf63ntsaxxu5.public.blob.vercel-storage.com/50Th%20Aniv-2-XYndveJsKDruj2LwJJNSF0vzbb1iov.mp4";

export default function FullscreenScreenSaver({ onComplete }) {
  const videoRef = useRef(null);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete?.();
  };

  useEffect(() => {
    const video = videoRef.current;
    let fallbackTimer;

    const handleVideoEnd = () => {
      onComplete?.();
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      
      // Auto-play dengan error handling
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video autoplay started");
          })
          .catch(error => {
            console.error("Autoplay prevented:", error);
            // Fallback: lanjutkan setelah 15 detik jika autoplay diblokir
            fallbackTimer = setTimeout(onComplete, 15000);
          });
      }
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        className="w-full h-full object-cover"
        // Key untuk memastikan video reload saat URL berubah
        key={BLOB_VIDEO_URL}
      >
        <source 
          src={BLOB_VIDEO_URL} 
          type="video/mp4" 
        />
        Browser Anda tidak mendukung tag video.
      </video>
      
      <motion.button 
        onClick={handleSkip}
        className="absolute bottom-8 right-8 bg-white/30 text-white px-6 py-3 rounded-full hover:bg-white/40 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1 } }}
      >
        Lewati
      </motion.button>
    </div>
  );
}