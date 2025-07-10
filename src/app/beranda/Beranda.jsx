'use client';
import { useState, useEffect, useRef } from 'react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeroSection from './HeroSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/style/Beranda.css';

// Hero Slides Data with URLs
const heroSlides = [
  {
    image: '/images/4.jpg',
    url: '/blog/artikel/detail-b',
  },
  {
    image: '/images/2.jpg',
    url: '/blog/artikel/detail-a',
  },
  {
    image: '/images/1.jpg',
    url: '/produk?category=Concrete Roof',
  },
  {
    image: '/images/5.jpg',
    url: '/produk?category=Paving Block',
  },
];


// Category Data
const defaultCategories = [
  { 
    name: 'Concrete Roof', 
    icon: '/icons/cr-trace.png',
    link: '/produk?category=Concrete Roof' // Tambahkan properti link
  },
  { name: 'Paving Block', icon: '/icons/pv-trace.png',  link: '/produk/produk-pv?category=Paving Block' },
  { name: 'Concrete Block', icon: '/icons/cb-trace.png',  link: '/produk/produk-pv?category=Concrete Block' },
  { name: 'Utility', icon: '/icons/cp-trace.png',  link: '/produk/produk-pv?category=Utility' }
];


// Project data
const proyekData = [
  {
    id: 1,
    namaProduk: 'Fullpave, Truepave, Kanstein K.02 & K.11, Car Stopper, Tactile',
    namaProyek: 'Alun Alun Kota Depok',
    tempatProyek: 'Depok',
    gambar: '/images/proyek/Paving Block/Alun-Alun Depok.jpg'
  },
  {
    id: 2,
    namaProduk: 'Concrete Tile Sandstein',
    namaProyek: 'Pelataran Candi Borobudur',
    tempatProyek: 'Magelang',
    gambar: '/images/proyek/Paving Block/Candi Borobudur.jpg'
  },
  {
    id: 3,
    namaProduk: 'Concrete Tile Sandstein, Tactile',
    namaProyek: 'Gedung Sate',
    tempatProyek: 'Bandung',
    gambar: '/images/proyek/Paving Block/Gedung Sate.jpg'
  },
  {
    id: 4,
    namaProduk: 'Truepave',
    namaProyek: 'Alun-alun Wado',
    tempatProyek: 'Jawa Barat',
    gambar: '/images/proyek/Paving Block/Alun-Alun Wado.jpg'
  },
  {
    id: 5,
    namaProduk: 'Concrete Tile Sandstein, Tactile',
    namaProyek: 'Candi Gedong Songo',
    tempatProyek: 'Semarang',
    gambar: '/images/proyek/Paving Block/Candi Gedong Songo.jpg'
  },
  {
    id: 6,
    namaProduk: 'Kanstein K.03',
    namaProyek: 'Kawasan Embung KIPP',
    tempatProyek: 'IKN',
    gambar: '/images/proyek/Paving Block/Embung Kipp IKN.jpg'
  },
  {
    id: 7,
    namaProduk: 'Roster R-20',
    namaProyek: 'Roster Sportclub PIK',
    tempatProyek: 'Jakarta',
    gambar: '/images/proyek/Concrete Block/roster sportclub PIK-2 R-20.jpg'
  },
  {
    id: 8,
    namaProduk: 'Roster R-20',
    namaProyek: 'Roster Istana Presiden',
    tempatProyek: 'IKN',
    gambar: '/images/proyek/Concrete Block/roster istana presiden R-20.jpg'
  },
  {
    id: 9,
    namaProduk: 'Concrete Tile Sandstein, Kanstein K.03, Tactile',
    namaProyek: 'Trotoar SPAM Sepaku',
    tempatProyek: 'IKN',
    gambar: '/images/proyek/Paving Block/Trotoar SPAM.jpg'
  },
  {
    id: 10,
    namaProduk: 'Truepave',
    namaProyek: 'Pelindo Tower',
    tempatProyek: 'Jakarta',
    gambar: '/images/proyek/Paving Block/Pelindo Tower.jpg'
  },
  {
    id: 11,
    namaProduk: 'Truepave, Clssic, Kanstein K.02, Tactile',
    namaProyek: 'Universitas Jenderal Achmad Yani',
    tempatProyek: 'Cimahi',
    gambar: '/images/proyek/Paving Block/Unjani.jpg'
  },
  {
    id: 12,
    namaProduk: 'Victoria Multiline',
    namaProyek: 'Kahatex Gempol',
    tempatProyek: 'Cimahi',
    gambar: '/images/proyek/Concrete Roof/VS Kahatex Gempol.jpg'
  }
];

// Video Testimonial Data
const mainTestimonialVideo = {
  title: "Testimonial Utama",
  youtubeId: "ee86Me6eOx4",
  description: "Testimonial pelanggan utama kami"
};

// Video Testimonial Data
const videoTestimonials = [
  {
    id: 1,
    title: 'Cisangkan Menurut Bapak Tony Susianto',
    youtubeId: 'EiLY8P_Lf8o',
    watchText: '',
    watchLink: '/testimonial/1' // Tambahkan link tujuan
  },
  {
    id: 2,
    title: 'Cisangkan Menurut Bapak Dedi Haryanto',
    youtubeId: 'XrAfg8RlA6o',
    watchText: '',
    watchLink: '/testimonial/2' // Tambahkan link 
  },
  {
    id: 3,
    title: 'Testimoni Customer di Pameran Building Technology EXPO',
    youtubeId: '725AGp2ou1Y',
    watchText: '',
    watchLink: '/testimonial/3'
  },
  {
    id: 4,
    title: 'Testimoni Customer di Pameran Building Technology EXPO',
    youtubeId: 'KfRpNP59QmU',
    watchText: '',
    watchLink: '/testimonial/4'
  },
  {
    id: 5,
    title: 'Testimoni Customer di Pameran Building Technology EXPO',
    youtubeId: '725AGp2ou1Y',
    watchText: '',
    watchLink: '/testimonial/5'
  },
  // {
  //   id: 6,
  //   title: 'Testimoni Customer di Pameran Building Technology EXPO',
  //   youtubeId: '725AGp2ou1Y',
  //   watchText: '',
  //   watchLink: '/testimonial/5'
  // },
  // {
  //   id: 7,
  //   title: 'Video Testimonial 7',
  //   youtubeId: '725AGp2ou1Y',
  //   watchText: '',
  //   watchLink: '/testimonial/7'
  // }
];

const getYoutubeThumbnail = (youtubeId, quality = 'hqdefault') => {
  const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  const selectedIndex = qualities.indexOf(quality);
  
  // Coba dari kualitas tertinggi ke terendah
  for (let i = selectedIndex; i < qualities.length; i++) {
    const url = `https://img.youtube.com/vi/${youtubeId}/${qualities[i]}.jpg`;
    // Di production, Anda mungkin perlu implementasi pengecekan yang lebih baik
    return url;
  }
  
  return `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
};

// Handler untuk video
  const handleVideoSelect = (videoId) => {
    setIsLoading(true);
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const VideoPlayerModal = ({ youtubeId, onClose, isLoading, setIsLoading }) => {
  const videoUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          aria-label="Tutup video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <iframe
          src={videoUrl}
          className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            alert('Gagal memuat video');
          }}
        />
      </div>
    </div>
  );
};

const terbaruList = [
  {
    id: 1,
    image: "/images/KBP CityRun.jpg",
    title: "CISANGKAN KBP CITY RUN 2025",
    desc: "Merayakan 50 Tahun PT Cisangkan dan 25 Tahun Kota Baru Parahyangan..",
    link: "/blog/artikel/detail-a"
  },
  {
    id: 2,
    image: "/images/ultah50.jpg",
    title: "PT. Cisangkan: 50 Tahun Berkarya untuk Indonesia",
    desc: "Bandung, 2025 – Tahun ini menjadi momen istimewa bagi PT. Cisangkan, yang merayakan 50 tahun..",
    link: "/blog/artikel/detail-b"
  },
  {
    id: 3,
    image: "/images/cisflashing.jpg",
    title: "CIS Flashing: Solusi Flashing Moder",
    desc: "Dalam dunia konstruksi atap, salah satu tantangan paling umum adalah memastikan tidak ada kebocoran..",
    link: "/perusahaan/inovasi/detail-b"
  }
];



export default function Beranda() {
    const router = useRouter();
    // State tambahan untuk animasi
    const [isChangingSlide, setIsChangingSlide] = useState(false);
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Project Slider State
  const [currentProyekSlide, setCurrentProyekSlide] = useState(0);
  const proyekSliderRef = useRef(null); // Tambahkan ini
  const [isMobile, setIsMobile] = useState(false);
  const [isSliderReady, setIsSliderReady] = useState(false);

  // Video Slider State
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const videoSliderRef = useRef(null);
  const totalVideoSlides = videoTestimonials.length;
  const visibleVideoSlides = 5;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle hero slide click
  const handleHeroSlideClick = (url) => {
    router.push(url);
  };


// Handler untuk video
  const handleVideoSelect = (videoId) => {
    setIsLoading(true);
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };


  // Fungsi untuk slider navigation
const nextVideoSlide = () => {
  if (currentVideoSlide < totalVideoSlides - visibleVideoSlides) {
    setCurrentVideoSlide(currentVideoSlide + 1);
    const scrollAmount = videoSliderRef.current.offsetWidth / visibleVideoSlides;
    videoSliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
};

const prevVideoSlide = () => {
  if (currentVideoSlide > 0) {
    setCurrentVideoSlide(currentVideoSlide - 1);
    const scrollAmount = videoSliderRef.current.offsetWidth / visibleVideoSlides;
    videoSliderRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }
};

// Fungsi untuk handle scroll event (opsional)
const handleScroll = () => {
  if (videoSliderRef.current) {
    const scrollPosition = videoSliderRef.current.scrollLeft;
    const itemWidth = videoSliderRef.current.offsetWidth / visibleVideoSlides;
    const currentSlide = Math.round(scrollPosition / itemWidth);
    setCurrentVideoSlide(currentSlide);
  }
};

// Tambahkan event listener saat komponen mount
useEffect(() => {
  const slider = videoSliderRef.current;
  if (slider) {
    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }
}, []);

  const VideoPlayer = ({ youtubeId, onClose }) => {
    const videoUrl = youtubeId === 'main' 
      ? `https://www.youtube.com/embed/${mainTestimonialVideo.youtubeId}?autoplay=1`
      : `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={onClose} // Tutup modal saat klik di luar
      >
        <div 
          className="relative w-full max-w-4xl aspect-video"
          onClick={(e) => e.stopPropagation()} // Prevent close saat klik di dalam player
        >
          <button 
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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

  // Responsive settings
  const itemsPerSlideDesktop = 6;
  const columnsPerSlideDesktop = 6;
  const itemsPerSlideMobile = 3;
  const columnsPerSlideMobile = 3;

   // Check mobile device
   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 // Hero Slider Functions dengan animasi
 const goToSlide = (index) => {
  setCurrentSlide(index);
};

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  resetAutoPlay();
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  resetAutoPlay();
};

const resetAutoPlay = () => {
  setIsAutoPlaying(false);
  setTimeout(() => setIsAutoPlaying(true), 5000);
};

const handleSlideChange = (index) => {
  setCurrentSlide(index);
};


  // Project Slider Navigation
 // Fungsi-fungsi slider yang sudah ada...
const goToProyekSlide = (slideIndex) => {
  if (!proyekSliderRef.current) return;
  
  const itemsPerSlide = isMobile ? itemsPerSlideMobile : itemsPerSlideDesktop;
  const maxSlide = Math.ceil(proyekData.length / itemsPerSlide) - 1;
  const clampedIndex = Math.max(0, Math.min(slideIndex, maxSlide));
  
  setCurrentProyekSlide(clampedIndex);
  
  const scrollAmount = isMobile 
    ? proyekSliderRef.current.offsetWidth * clampedIndex
    : proyekSliderRef.current.offsetWidth * Math.floor(clampedIndex / columnsPerSlideDesktop);
  
  proyekSliderRef.current.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
};


// Perbaiki juga useEffect untuk handle resize:
useEffect(() => {
  if (isSliderReady) {
    goToProyekSlide(currentProyekSlide);
  }
}, [isMobile, isSliderReady]);



// Komponen ProjectCard
const ProjectCard = ({ proyek }) => (
  <div className="bg-white shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden group h-full">
    <div className="relative w-full aspect-[4/3] bg-gray-300 overflow-hidden">
      <Image
        src={proyek.gambar}
        alt={proyek.namaProduk}
        width={800}
        height={600}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
        <h3 className="text-base sm:text-md font-semibold text-white">
          {proyek.namaProduk}
        </h3>
        <p className="text-sm text-white/90 mt-1 italic">
          {proyek.namaProyek} – {proyek.tempatProyek}
        </p>
      </div>
    </div>
  </div>
);


// Slick Carousel settings for Proyek Cisangkan
const ProyekSliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  rows: 2,
  arrows: !isMobile,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 2
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 2,
        arrows: false
      }
    }
  ]
};

// Custom arrow components for Proyek Cisangkan
const ProyekNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${isMobile ? 'right-2' : 'right-[-4.5rem] 2xl:right-[-7rem]'} 2xl:top-100 top-1/2 -translate-y-1/2 z-10 bg-[#0B1F3A] hover:bg-[#0B203F] text-white p-2 sm:p-3 2xl:p-5 rounded-none shadow-lg transition-all duration-300`}
    aria-label="Next projects"
  >
    <FaChevronRight className="text-sm sm:text-base 2xl:text-2xl" />
  </button>
);

const ProyekPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${isMobile ? 'left-2' : 'left-[-4.5rem] 2xl:left-[-7rem]'} 2xl:top-100 top-1/2 -translate-y-1/2 z-10 bg-[#0B1F3A] hover:bg-[#0B203F] text-white p-2 sm:p-3 2xl:p-5 rounded-none shadow-lg transition-all duration-300`}
    aria-label="Previous projects"
  >
    <FaChevronLeft className="text-sm sm:text-base 2xl:text-2xl" />
  </button>
);


// AutoPlay Effect
useEffect(() => {
  let interval;
  if (isAutoPlaying && heroSlides.length > 1) {
    interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }
  return () => clearInterval(interval);
}, [isAutoPlaying, currentSlide]);



  

return (
<main className="px-4 md:px-11 2xl:px-16">
  {/* Hero Section */}
  <div className="relative w-full">
    {/* Navigation buttons - hidden on mobile */}
    <div className="hidden md:flex absolute top-1/2 left-[-2em] right-[-2em] z-20 justify-between px-4 mt-[-10rem] 2xl:mt-[-2rem] 2xl:left-[-3em] 2xl:right-[-3em]">
      <button
        onClick={prevSlide}
        className="btn-hero-lf bg-[#0B1F3A] p-2 sm:p-3 text-white hover:bg-[#404b6b] transition-colors duration-200 rounded-none 2xl:p-5"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm sm:text-base 2xl:text-xl" />
      </button>
      <button
        onClick={nextSlide}
        className="btn-hero-rg bg-[#0B1F3A] p-2 sm:p-3 text-white hover:bg-[#404b6b] transition-colors duration-200 rounded-none 2xl:p-5"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm sm:text-base 2xl:text-xl" />
      </button>
    </div>

<HeroSection 
  slides={heroSlides.map(slide => ({
    ...slide,
  }))}
  currentSlide={currentSlide}
  autoPlayDelay={5000}
  onSlideChange={handleSlideChange}
  onSlideClick={handleHeroSlideClick} // Tambahkan ini
/>

  {/* Slide Indicators */}
  <div className="hero-slide-indicators absolute bottom-[17.5rem] left-1/2 -translate-x-1/2 flex gap-2 z-10 2xl:bottom-[3rem] 2xl:gap-3">
    {heroSlides.map((_, idx) => (
      <button
        key={idx}
        onClick={() => {
          goToSlide(idx);
          resetAutoPlay();
        }}
        className={`h-[5px] rounded-full transition-all duration-300 relative ${
        idx === currentSlide
          ? 'w-20 2xl:w-30 bg-[#0B203F] shadow-[0_3px_3px_rgba(11,32,63,0.2),0_2px_6px_rgba(11,32,63,0.1)]'
          : 'w-8 2xl:18 bg-[#FFFFFF] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)]'
      } hover:shadow-[0_3px_4px_rgba(11,32,63,0.15),0_3px_6px_rgba(11,32,63,0.1)]`}
      aria-label={`Go to slide ${idx + 1}`}
    >
      {idx === currentSlide && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-[#0B203F] to-[#0B203F]/90 shadow-[0_4px_4px_rgba(11,32,63,0.15)]" />
      )}
    </button>
  ))}
</div>
      </div>

    {/* Product Categories Section */}
<section className="product-categories-section py-20 text-center 2xl:mt-55">
  <h2 className="text-2xl font-medium mb-10 2xl:mb-15 2xl:text-[2rem]">TELUSURI PRODUK KAMI</h2>
  <div className="category-container flex flex-wrap justify-center gap-8 sm:gap-16 md:gap-24 lg:gap-40">
    {defaultCategories.map((category, index) => (
      <Link 
        href={category.link || '/produk'} 
        key={index}
        onClick={() => {
          if (category.name === 'Concrete Roof') {
            sessionStorage.setItem('autoExpand', 'true');
            sessionStorage.setItem('activeSubItem', 'Neo'); // Set default subitem
          }
        }}
      >
        <div className="flex flex-col items-center group text-[#333333] cursor-pointer">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 2xl:w-45 2xl:h-45 border border-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-[#0B203F] hover:border-white hover:border-2">
            <Image
              src={category.icon}
              alt={category.name}
              width={90}
              height={90}
              className="icon-categories max-h-12 sm:max-h-14 md:max-h-16 2xl:max-h-[15rem] transition-all duration-300 group-hover:brightness-0 group-hover:invert"
            />
          </div>
          <span className="mt-3 text-xs sm:text-xs 2xl:text-xl font-medium">{category.name}</span>
        </div>
      </Link>
    ))}
  </div>
</section>

    {/* Proyek Cisangkan Section */}
    <section className="py-6 sm:py-10 bg-[#ECEEF0] relative">
        <h2 className="text-center text-xl sm:text-2xl font-medium 2xl:text-[2rem]">PROYEK CISANGKAN</h2>
              <p className="text-center text-blue-500 text-sm sm:text-base cursor-pointer hover:underline mb-4 sm:mb-5"><a href='/proyek'>Lihat Semua</a></p>
        
<div className="mx-auto px-4 sm:px-1 xl:px-14 max-w-screen-2xl">
  <div className="mx-auto relative 2xl:w-[100rem] w-full 2xl:right-22">
    <Slider 
      {...ProyekSliderSettings}
      nextArrow={<ProyekNextArrow />}
      prevArrow={<ProyekPrevArrow />}
    >
      {proyekData.map((proyek) => (
        <div key={proyek.id} className="px-2 mb-4 h-full">
          <ProjectCard proyek={proyek} />
        </div>
      ))}
    </Slider>
  </div>
</div>

      </section>

        {/* Video Testimonial Produk */}
    <section className="py-6 sm:py-10 relative mt-10 mb-6">
  <div className="w-full">
    {/* Video Utama */}
    <div className="max-w-6xl flex flex-col sm:flex-col sm:items-left gap-3">
    
    {/* Kiri: Judul */}
    <div className="pl-4 border-l-4 border-[#0B203F]">
      <h2 className="text-left text-xl sm:text-2xl 2xl:text-[2rem] font-medium leading-tight uppercase">
        VIDEO TESTIMONIAL PRODUK
      </h2>
    </div>

    {/* Kanan: Deskripsi dan Link */}
    <div className="text-gray-700 text-sm sm:text-base">
      <p className="text-left mb-8 2xl:text-xl">
        Simak ulasan dari costumer kami setelah menggunakan produk dari Cisangkan
      </p>
      {/* <div className="flex gap-3 text-sm font-medium">
        <a href="/tentang-kami" className="text-blue-700 hover:underline">Tentang Kami</a>
        <span className="text-gray-400">•</span>
        <a href="/video-lainnya" className="text-blue-700 hover:underline">Video lainnya</a>
      </div> */}
    </div>

  </div>
    <div className="flex justify-center bg-[#ECEEF0] p-6 py-7 mb-5 rounded-none">
      <div className="relative w-full max-w-4xl aspect-video bg-gray-200 rounded-none overflow-hidden">
      <div 
  className="absolute inset-0 cursor-pointer"
  onClick={() => handleVideoSelect(mainTestimonialVideo.youtubeId)}
>
  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-md">
      <svg className="w-8 h-8 text-[#0B1F3A]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
      </svg>
    </div>
  </div>
<Image 
  src="/images/factory Visit.png"
  alt={mainTestimonialVideo.title}
  fill
  className="object-cover shadow-lg rounded-md"
/>
</div>
      </div>
    </div>
    
    {/* Tombol Lihat Semua */}
    <div className="link-allvideo flex justify-between text-sm mb-4">
      <h3 className="text-left text-md sm:text-1xl font-semibold">Video Lainnya</h3> 
      <a href="https://www.youtube.com/@pt_cisangkan" className="text-[#0B1F3A] no-underline">
        Lihat Semua
      </a>
    </div>

   {/* Daftar Video Lainnya dengan Slider */}
<div className="container-slider-vd relative">
  {/* Navigation buttons */}
  <button 
    onClick={prevVideoSlide}
    disabled={currentVideoSlide === 0}
    className="prevVideoSlide absolute left-0 top-22 -translate-y-1/2 -translate-x-6 z-10 w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <FaChevronLeft className="w-5 h-5" />
  </button>

  <div 
    ref={videoSliderRef}
    className="grid-vd grid grid-flow-col auto-cols-[calc(100%/2)] sm:auto-cols-[calc(100%/3)] md:auto-cols-[calc(100%/5)] gap-21 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4"
  >
    {videoTestimonials.map((video) => (
      <div key={video.id} className="cover-video group cursor-pointer snap-start">
        <div 
          className="cover-video2 relative aspect-video bg-gray-200 overflow-hidden w-full h-[150px]"
          onClick={() => handleVideoSelect(video.youtubeId)}
        >
            <Image 
    key={video.id}
    src={getYoutubeThumbnail(video.youtubeId)}
    alt={video.title}
    fill
    className="object-cover shadow-lg rounded-md"
  />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0B1F3A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="video-title mt-3 text-left">
          <p className="text-sm font-medium text-gray-800 line-clamp-2">{video.title}</p>
          <a 
            href={video.watchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            {video.watchText}
          </a>
        </div>
      </div>
    ))}
  </div>

  <button 
    onClick={nextVideoSlide}
    disabled={currentVideoSlide >= totalVideoSlides - visibleVideoSlides}
    className="nextVideoSlide absolute right-0 top-22 -translate-y-1/2 translate-x-6 z-10 w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <FaChevronRight className="w-5 h-5" />
  </button>
</div>

    
    {/* Video Player Modal */}
    {isModalOpen && (
      <VideoPlayerModal 
        youtubeId={selectedVideo}
        onClose={handleCloseVideo}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    )}
  </div>
</section>
  
         {/* Terbaru Section */}
         <section className="py-10 px-4 sm:px-10 bg-[#ECEEF0]">
  <div className="max-w-6xl mx-auto">
    <div className="flex justify-center gap-2 items-center mb-8 px-2">
      <h2 className="text-xl sm:text-2xl font-medium">TERBARU</h2>
      <p className="text-blue-500 text-sm sm:text-base cursor-pointer hover:underline"><a href='/blog/artikel'>Lihat Semua</a></p>
    </div>
    
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {terbaruList.map((item) => (
    <Link key={item.id} href={item.link} className="flex after:w-[1px] after:bg-[#D7D7D7] hover:bg-white transition rounded-md">
      <div className="flex p-4 cursor-pointer">
        <div className="relative w-20 h-20 mr-4 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="object-cover"
            style={{ width: '80px', height: '80px' }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">{item.title}</h3>
          <p className="text-xs text-gray-600">{item.desc}</p>
        </div>
      </div>
    </Link>
  ))}
</div>
  </div>
</section>
  
       {/* E-Commerce Section */}
        <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">CISANGKAN OFFICIAL E-COMMERCE</h2>
        <div className="flex justify-center mb-20">
  <a 
    href="https://www.tokopedia.com/cisangkan" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity"
  >
    <img 
      src="/tokopedia-logo.png" 
      alt="Tokopedia" 
      className="h-15" 
    />
  </a>
</div>
<div className="container-shortcut text-left grid grid-cols-1 md:grid-cols-3 gap-55 px-[5rem]">
  {[
    {
      title: "Tentang Kami",
      image: "/images/icon-short1.png",
      desc: "Kenali lebih dekat PT. Cisangkan dan produk-produknya",
      link: "/perusahaan/tentang" // Tambahkan link untuk Tentang Kami
    },
    {
      title: "Store",
      image: "/images/icon-short2.png",
      desc: "Kunjungi Store dan Kiosk Cisangkan di sekitar anda",
      link: "/kontak/store" // Tambahkan link untuk Store
    },
    {
      title: "Inovasi", 
      image: "/images/icon-short3.png",
      desc: "Kami menciptakan inovasi untuk lebih memudahkan anda",
      link: "/perusahaan/inovasi" // Tambahkan link untuk Inovasi
    }
  ].map((item, i) => (
  <Link
    href={item.link}
    key={i}
    passHref
    className='w-60 block transition-shadow duration-300'
  >
       <div className="section-container relative w-full h-60 mb-6 rounded-none overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
      />
    </div>
        <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
        <p className="text-base text-gray-600 leading-6">{item.desc}</p>
        <div className="text-blue-500 text-xs mt-1 hover:text-blue-700 transition-colors">
          Baca lebih banyak
        </div>
    </Link>
  ))}
</div>
        </section>
      </main>
    );
  }
  