'use client';
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import '@/app/style/Blog.css';


// Video Data
const mainArticleVideo = {
  title: "KUNJUNGAN PABRIK TOPWERK ASIA GATHERING 2025 KE PABRIK PT CISANGKAN – PURWAKARTA",
  youtubeId: "gCicPleRDaw", // Ganti dengan ID YouTube Anda
  description: "KUNJUNGAN PABRIK TOPWERK ASIA GATHERING 2025 KE PABRIK PT CISANGKAN – PURWAKARTA"
};

export default function DetailE() {
  const [data, setData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  useEffect(() => {
    const sampleData = {
      judul: mainArticleVideo.title,
      tanggal: "16 September 2025",
      gambar: "/images/top-werk.jpg",
      videoThumbnail: "/images/top-werk.jpg",
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
    <div className="body-container mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="image-container relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
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
        <nav className="2xl:text-lg flex justify-center space-x-10 text-[1rem] font-light tracking-wide">
          <Link href="/blog/artikel" className="text-[#2D5DA6] font-bold">Artikel</Link>
          <Link href="/blog/testimoni" className="text-[#333] hover:text-[#2D5DA6]">Testimoni</Link>
        </nav>
      </div>

 <section className="mx-auto mt-12 px-6 xl:px-26 sm:px-12 text-justify text-sm sm:text-base mb-10 2xl:px-30">
  {/* Judul */}
      <h1 className="justify-center text-black font-semibold text-lg sm:text-lg 2xl:text-2xl uppercase mb-2">
        {data.judul}
      </h1>

  {/* Tanggal */}
  <p className="text-blue-600 text-sm 2xl:text-base mb-6">
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
                className="thumb-blog object-contain transition-transform duration-500 hover:scale-110 rounded-2xl"
              />
            </div>
          </div>
        </div>

       {/* Konten Deskripsi */}
  <div className="text-justify text-sm leading-relaxed text-[#333] space-y-4 pb-10 border-b mb-5 2xl:text-base">
    {data?.deskripsi ? (
      <p>{data.deskripsi}</p>
    ) : (
      <>
              <p>
                Sebagai bagian dari perayaan HUT ke-50 kami, PT Cisangkan mendapat kehormatan untuk menyambut mitra setia kami, HESS GROUP, dalam Seminar Agen Topwerk Asia yang diselenggarakan minggu lalu. <br/>
Kunjungan ini tidak hanya menjadi sorotan utama seminar, tetapi juga momen berharga untuk memperkuat kemitraan yang telah terjalin selama puluhan tahun.
Acara ini menunjukkan bagaimana PT Cisangkan terus mendefinisikan ulang standar industri, dengan kapasitas produksi yang mengesankan hingga 1 hektar paving block per hari, menjadikan kami yang terbesar di Asia Tenggara.
Kami mengucapkan terima kasih yang sebesar-besarnya kepada HESS Group atas kunjungan ke fasilitas kami. <br />
Kami berharap kunjungan ini akan semakin mempererat kemitraan kami dan membuka jalan bagi kolaborasi serta inovasi yang lebih kuat antara kedua perusahaan kami di tahun-tahun mendatang.
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