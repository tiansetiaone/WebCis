'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

// Video Data
const mainArticleVideo = {
  title: "Factory Visit Team Alam Sutera Group to Cisangkan Purwakarta",
  youtubeId: "3aoOTnMFbhM", // Ganti dengan ID YouTube Anda
  description: "Kunjungan pabrik Cisangkan Purwakarta"
};

export default function DetailC() {
  const [data, setData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  useEffect(() => {
    const sampleData = {
      judul: mainArticleVideo.title,
      tanggal: "11 Juli 2025",
      gambar: "/images/thumbnail-visit.jpg",
      videoThumbnail: "/images/thumbnail-visit-dtl.jpg",
      deskripsi: ""
    };
    setData(sampleData);
  }, []);

  const handleVideoOpen = (videoId = 'main') => {
    setIsLoading(true);
    setSelectedVideoId(videoId);
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
    setIsLoading(false);
  };

  if (!data) return <div>Loading...</div>;

  const VideoPlayer = () => {
    const videoUrl = selectedVideoId === 'main' 
      ? `https://www.youtube.com/embed/${mainArticleVideo.youtubeId}?autoplay=1`
      : `https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`;
  
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={handleVideoClose}
      >
        <div 
          className="relative w-full max-w-4xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleVideoClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          >
            <FaTimes className="h-8 w-8" />
          </button>
          
          <iframe
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              alert('Gagal memuat video');
            }}
          ></iframe>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

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

        {/* Video Thumbnail Section */}
        <div className="w-full max-w-2xl mx-auto mb-8 rounded-2xl">
          <div className="relative w-full aspect-video cursor-pointer group rounded-2xl">
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={() => handleVideoOpen('main')}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 rounded-2xl">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                  <FaPlay className="w-8 h-8 text-[#0B1F3A] pl-1" />
                </div>
              </div>
              
              <Image 
                src={data.videoThumbnail}
                alt={data.judul}
                fill
                className="object-contain transition-transform duration-500 hover:scale-110 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Konten Deskripsi */}
        <div className="text-justify text-sm leading-relaxed text-[#333] space-y-4 pb-10 border-b mb-5">
          {data?.deskripsi ? (
            <p>{data.deskripsi}</p>
          ) : (
            <>
              <p>
                Pada hari Jumat 11 Juli 2025, Team Alam Sutera Group mengadakan kunjungan pabrik/factory visit ke pabrik Cisangkan Purwakarta untuk melihat proses pembuatan produk Cisangkan.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && <VideoPlayer />}
    </div>
  );
}