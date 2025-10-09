'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import { FaAddressBook } from 'react-icons/fa';


// Video Data
const mainArticleVideo = {
  title: "STRATEGIC PARTNERSHIP CISANGKAN & MAXXI",
  youtubeId: "", // kosongkan jika pakai GDrive
  gdriveId: "1LoP06VB6zq4dVgqHHNvqneL6YEuSCBI1", // isi File ID
  description: "STRATEGIC PARTNERSHIP CISANGKAN & MAXXI"
};


export default function DetailF() {
  const [data, setData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  useEffect(() => {
    const sampleData = {
      judul: mainArticleVideo.title,
      tanggal: "08 Oktober 2025",
      gambar: "/images/cis max.jpeg",
      videoThumbnail: "/images/cis max.jpeg",
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
  const videoUrl = mainArticleVideo.youtubeId
    ? `https://www.youtube.com/embed/${mainArticleVideo.youtubeId}?autoplay=1`
    : `https://drive.google.com/file/d/${mainArticleVideo.gdriveId}/preview`;

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
          allow="autoplay"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};


  return (
    <div className="body-container mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Banner */}
      <div className="image-container relative w-full aspect-[1764/460] overflow-hidden">
        <Image
          src="/images/artikel-4.jpg"
          alt="Banner Artikel"
          width={1764}
          height={460}
          className="w-full h-full object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Navigation */}
      <div className="bg-[#F2F2F2] py-4">
        <nav className="2xl:text-lg flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
          <Link href="/blog/artikel" className="text-[#2D5DA6] font-bold">Artikel</Link>
          <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
        </nav>
      </div>

      {/* Main Content */}
      <section className="mx-auto mt-12 px-6 xl:px-26 sm:px-12 text-justify text-sm sm:text-base mb-10 2xl:px-30">
        {/* Judul */}
        <h1 className="justify-center text-black font-semibold text-lg sm:text-lg 2xl:text-2xl uppercase mb-2 text-left">
          {data.judul}
        </h1>

        {/* Tanggal */}
        <p className="text-blue-600 text-sm 2xl:text-base mb-8 text-left">
          {data?.tanggal || 'DD Month Years'}
        </p>

        {/* Grid Kolase + Video */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start mb-10">
          {/* Kolase Gambar Kiri */}
          <div className="grid grid-cols-2 gap-3 flex-1 max-w-lg">
            <Image src="/images/cis max8.jpeg" alt="Kolase 1" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
            <Image src="/images/cis max3.jpeg" alt="Kolase 2" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
            <Image src="/images/cismaxx.jpg" alt="Kolase 3" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
            <Image src="/images/cis max4.jpeg" alt="Kolase 3" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
            <Image src="/images/cis max5.jpeg" alt="Kolase 4" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
            <Image src="/images/cis max6.jpeg" alt="Kolase 4" width={400} height={300} className="rounded-lg object-cover w-full h-40 sm:h-48" />
          </div>

          {/* Video Thumbnail Kanan */}
          <div className="flex-1 max-w-md mx-auto">
            <div 
              className="relative w-full aspect-[9/12] cursor-pointer group rounded-2xl overflow-hidden shadow-lg"
              onClick={() => handleVideoOpen('main')}
            >
              <Image 
                src={data.videoThumbnail}
                alt={data.judul}
                fill
                className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                  <FaPlay className="w-8 h-8 text-[#0B1F3A] pl-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="text-justify text-sm leading-relaxed text-[#333] space-y-4 pb-10 border-b mb-5 2xl:text-base">
          <p>
Selasa, 7 Oktober 2025 menjadi momen penting bagi kami, di mana secara resmi memulai kolaborasi dengan Maxxi melalui acara Kick Off Kerja Sama Strategis, bertempat di Pabrik Cisangkan, Purwakarta. 
            <br /><br />
Melalui kemitraan ini, Cisangkan dan Maxxi berkomitmen untuk menyediakan produk atap yang estetis, tahan lama, dan ramah lingkungan, sekaligus menjawab kebutuhan konsumen modern akan solusi atap yang andal dan bernilai tinggi.
<br /><br />
Klik link dibawah untuk mengunduh brosur Bitumen.
          </p>
                        <div className='pl-0 px-207'>
                          <a
                            href="/informasi/katalog#brosur-section"
                            className="bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] flex items-center gap-2 w-full justify-center"
                          >
                            <FaAddressBook className="text-lg 2xl:text-xl" />
                            Unduh Brosur
                          </a>
                        </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && <VideoPlayer />}
    </div>
  );
}