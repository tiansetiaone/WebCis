'use client';
import Image from 'next/image';
import Link from "next/link";
import React, { useState, useRef, useEffect, useMemo } from 'react'; 
import axios from 'axios';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa';


export default function Store() {

  const [showSubmenu, setShowSubmenu] = useState(true);
  const [activeItem, setActiveItem] = useState('Concrete Roof');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const mainProducts = ['Concrete Roof', 'Paving Block', 'Concrete Block', 'Concrete Pipe'];
  const subProducts = ['Neo', 'Victoria', 'Dust Stone', 'Excelent', 'Majestic', 'Crown', 'New Royal'];
   const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
  const [cities, setCities] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
  
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mengirim pesan');
    }

    setSubmitStatus({ type: 'success', message: 'Pesan berhasil dikirim!' });
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: ''
    });

  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: error.message || 'Terjadi kesalahan saat mengirim pesan'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    // Fetch daftar provinsi
    axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(res => setProvinces(res.data))
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then(res => setCities(res.data))
        .catch(err => console.error('Error fetching cities:', err));
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    // Ambil product dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
      setActiveSubItem(product);
      // Pertahankan state di sessionStorage
      sessionStorage.setItem('autoExpand', 'true');
      sessionStorage.setItem('activeSubItem', product);
    }
  }, []);

  const handleMainItemClick = (item) => {
    setActiveItem(item);
    setActiveSubItem(null);
    if (item === 'Concrete Roof') {
      setShowSubmenu(!showSubmenu);
    } else {
      setShowSubmenu(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
  };
  
 // Slider state for product types
 const [currentSlide, setCurrentSlide] = useState(0);
 const sliderRef = useRef(null);

 const productTypes = [
  { name: 'Neo', image: '/images/icon photo.png' },
  { name: 'Victoria', image: '/images/icon photo.png' },
  { name: 'Victoria Multiline', image: '/images/icon photo.png' }, { name: 'Victoria Slate', image: '/images/icon photo.png' }, { name: 'Victoria Pine', image: '/images/Victoria Pine Clear.png' }];
 const visibleSlides = 4; // Number of slides visible at once

 const nextSlide = () => {
   if (currentSlide < productTypes.length - visibleSlides) {
     setCurrentSlide(currentSlide + 1);
     scrollToSlide(currentSlide + 1);
   }
 };

 const prevSlide = () => {
   if (currentSlide > 0) {
     setCurrentSlide(currentSlide - 1);
     scrollToSlide(currentSlide - 1);
   }
 };

 const scrollToSlide = (slideIndex) => {
   if (sliderRef.current) {
     const slideWidth = sliderRef.current.children[0]?.clientWidth || 0;
     sliderRef.current.scrollTo({
       left: slideIndex * (slideWidth + 16), // 16px for gap
       behavior: 'smooth'
     });
   }
 };


const [slopeAngle, setSlopeAngle] = useState('');
   const [showCalculator, setShowCalculator] = useState(false);
  const [calculationType, setCalculationType] = useState('Luas Atap');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const calculateRequirement = () => {
  const value = parseFloat(inputValue);
  if (!isNaN(value)) {
    let calculatedResult;
    
    if (calculationType === 'Luas Atap') {
      calculatedResult = Math.ceil(value * 8); // 8 genteng per m2
    } else {
      // Perhitungan luas bangunan
      let roofArea = value;
      
      if (slopeAngle) {
        const angle = parseFloat(slopeAngle);
        // Hitung luas atap berdasarkan sudut kemiringan
        roofArea = value / Math.cos(angle * Math.PI / 180);
      } else {
        // Asumsi default 1.5x luas bangunan
        roofArea = value * 1.5;
      }
      
      calculatedResult = Math.ceil(roofArea * 8);
    }
    
    setResult(calculatedResult.toString());
  }
};

  const cityItems = [
    {
      city: 'BANDA ACEH & LHOKSUMAWE',
      stores: [
        {
          name: 'PT. EVRANDO SUKSES BERSAMA',
          address: 'Jl. Ngumban Surbakti / Melati Raya No.88, Medan',
          telp: '(081) 8384284',
          hp: '0813 8139 5045',
          maps: 'https://maps.app.goo.gl/zwfeYKmfxq1KS2sh7'
        },
      ],
    },
    {
      city: 'TANJUNG PINANG',
      stores: [
        {
          name: 'PT. CITRA SERAYA',
          address: 'Jl. Gatot Subroto No.98 A Tanjung Pinang',
          hp: '085558096268',
          maps: 'https://maps.app.goo.gl/UfGb8a4Q8TUmBibZ8'
        },
      ],
    },
    {
      city: 'BANGKA BELITUNG',
      stores: [
        {
          name: 'PT. SETIAJAYA MAKMURINDO',
          address: 'Jl. Mayor Syafri, Rachman No.2 Bangka, Pengkal Pinang, Bangka Belitung',
          telp: '(077) 422835, (077) 438568',
          hp: '0813 8999 3973',
          maps: 'https://maps.app.goo.gl/EY3SVwNFiEzzJL6r9'
        },
      ],
    },
    {
      city: 'PURWOKERTO',
      stores: [
        {
          name: 'TB PELITA',
          address: 'Jl. Jend. Sudirman 724, Sukoharjo',
          telp: '(0281) 6441079, (0281) 6441015, (0281) 6441045',
          maps: ''
        },
      ],
    },
    {
      city: 'YOGYAKARTA',
      stores: [
        {
          name: 'CV AGNA ASTABAJA',
          address: 'Jl. Purboyo Krandon Sumberadi Mleati, Sleman (depan kantor Badan Pusat Statistik Kab. Sieman)',
          hp: '0851 0545 5234',
          maps: 'https://maps.app.goo.gl/AuXaWnd69ddooJCc7'
        },
      ],
    },
    {
      city: 'YOGYAKARTA',
      stores: [
        {
          name: 'MATAHARI JAYA',
          address: 'Jl. Parangtritis KM. 4 No. 301 Sewon - Bantul',
          telp: '(0274) 389868',
          maps: 'https://maps.app.goo.gl/nCmxKoooSnsrHcvq9'
        },
      ],
    },
    {
      city: 'SAMARINDA',
      stores: [
        {
          name: 'PT KERAMIK JAYA BANGUNAN',
          address: 'Jl. A. Wahab Syahrani No.78, Samarinda (Depan SPBU)',
          hp: '0852 4695 8522',
          maps: 'https://maps.app.goo.gl/Hf7P6ijFFgTyg2hY8'
        },
      ],
    },
    {
      city: 'MANADO',
      stores: [
        {
          name: 'PT WIJAYA BANGUNAN',
          address: 'Jl. Walter Monginsidi No.124 Bahu - Manado',
          telp: '(0431) 825500, (0431) 825700',
          hp: '0812 4408 8877',
          maps: 'https://maps.app.goo.gl/7zdvYTRLLf1SaTKM6'
        },
      ],
    },
    {
      city: 'JAYAPURA',
      stores: [
        {
          name: '',
          address: 'Jl. Koti No.72 B',
          telp: '',
          hp: '',
          maps: ''
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'GENTENG PILAR MAS',
          address: 'Jl. Panjaitan No.18 (Bypass) Jakarta Timur',
          hp: '0811 8006 010',
          maps: 'https://maps.app.goo.gl/X7JnL8crSiqVPKk6A'
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'PT MITRA TARUMA PERKASA',
          address: 'Jl. Raya Rawa Buntu No.20, Serpong, Tangerang Selatan',
          telp: '(021) 758 77060',
          hp: '0877 7505 1700',
          maps: 'https://maps.app.goo.gl/CB9sSGWJqAYBksnn9'
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'ERA CIPTA BANGUN PERKASA',
          address: 'Jl. KH. Ahmad Dahlan No.1A',
          address2: 'Tangerang',
          telp: '(021) 68742233',
          hp: '0877 7181 6062',
          maps: ''
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'SUPER BANGUN JAYA 1',
          address: 'Jl. Raya Cisauk, Sampora BSD Tangerang Selatan',
          telp: '(021) 75579999',
          hp: '0896 7061 4648',
          maps: 'https://maps.app.goo.gl/BXK5HHTcwECcYLap7'
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'SUPER BANGUN JAYA 2',
          address: 'Jl. Raya Lapan I–2, Suradita Cisauk, Kab. Tangerang',
          telp: '(021) 75879999',
          hp: '0896 7061 4648',
          maps: 'https://maps.app.goo.gl/r19GXxcsPfffkFr47'
        },
      ],
    },
    {
      city: 'BEKASI',
      stores: [
        {
          name: 'MADJU PRIMA SEJAHTERA',
          address: 'Jl. Raya Kalimalang No. 36, Bekasi',
          telp: '(021) 8841210',
          hp: '0896 8970 2070',
          maps: 'https://maps.app.goo.gl/ugAdMcLKUb8hzFdm9'
        },
      ],
    },
    {
      city: 'PURWAKARTA',
      stores: [
        {
          name: 'ANEKA GENTENG',
          address: 'Jl. Raya Sadang, Cikampek Purwakarta (Samping Jembatan Timbang Ciwangi)',
          hp: '0852 2444 7000, 0818 4711133',
          maps: ''
        },
      ],
    },
    {
      city: 'PURWAKARTA',
      stores: [
        {
          name: 'ANEKA GENTENG',
          address: 'Jl. Ipik Gandamanah No. 99 B',
          address2: 'Sukasari Tegal Munjul, Purwakarta',
          hp: '0818 0222 0608',
          maps: ''
        },
      ],
    },
    {
      city: 'BANDUNG',
      stores: [
        {
          name: 'ABADI GENTENG',
          address: 'Jl. Soekarno Hatta No. 384 Bandung',
          telp: '(022) 5205152',
          maps: 'https://maps.app.goo.gl/LqcoDiHM2jAbAX8Z7'
        },
      ],
    },
];

// Fungsi untuk menangani perubahan kota
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    
    // Cari nama kota berdasarkan ID
    const selectedCity = cities.find(city => city.id === cityId);
    setSelectedCity(selectedCity ? selectedCity.name : '');
  };

  // Filter store berdasarkan kota yang dipilih
  const filteredStores = useMemo(() => {
    if (!selectedCity) return cityItems;
    
    return cityItems.filter(item => 
      item.city.toLowerCase() === selectedCity.toLowerCase()
    );
  }, [selectedCity, cityItems]);

  // Bagi ke 3 kolom secara vertikal
  const itemsPerColumn = Math.ceil(filteredStores.length / 3);
  const columns = [
    filteredStores.slice(0, itemsPerColumn),
    filteredStores.slice(itemsPerColumn, itemsPerColumn * 2),
    filteredStores.slice(itemsPerColumn * 2),
  ];


  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section - Responsive di semua device */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/kontak.jpg"
          alt="Produk Genteng Cisangkan"
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
        <div className="absolute inset-0 flex items-end pb-6 sm:pb-8 md:pb-12 lg:items-center lg:justify-center lg:pb-0 px-4 sm:px-6">
        </div>
      </div>
  {/* Header Section */}

<div className="bg-[#F2F2F2] py-4">
  <nav className="flex justify-center space-x-10 text-[1.5rem] font-light tracking-wide">
    <Link href="/kontak/store" className="text-[#333] hover:text-[#2D5DA6]">Store</Link>
    <Link href="/kontak/kiosk" className="text-[#2D5DA6] font-bold">Kiosk</Link>
  </nav>
</div> 

    <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 mb-10 text-sm sm:text-base border-b border-[#CCCCCC]">
           {/* Header Section */}
           <div className="flex items-center gap-6 border-b border-[#CCCCCC] pb-6 max-w-6xl mx-auto px-4 md:px-0">
     {/* Kiri: Judul */}
     <div className="flex items-center w-full md:w-1/2 gap-10">
       <div className="leading-snug">
               <h1 className="text-xl sm:text-2xl font-semibold text-[#0B203F] border-l-4 border-[#0B203F] pl-4 uppercase leading-tight">
                 Temukan<br />Store Kami<br />di Kota Anda
               </h1>
       </div>
     <div className="flex flex-col items-center">
       <Image
         src="/images/KIOSK.png" // TANPA /public
         alt="Store Icon"
         width={140} // Bisa disesuaikan
         height={140}
         className="mb-1"
       />
   </div>
   
     </div>
   
           {/* Kanan: Logo + Dropdowns */}
                    <div className="w-full md:w-1/2">
               <p className="text-gray-600 text-sm mb-4">
                 Pilih wilayah untuk melihat informasi STORE dan KIOSK kami terdekat
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex flex-col w-full sm:w-1/2">
                   <label className="text-sm font-semibold mb-1">Propinsi</label>
                   <select
                     className="border border-gray-300 rounded px-3 py-2"
                     value={selectedProvince}
                     onChange={(e) => {
                       setSelectedProvince(e.target.value);
                       setSelectedCityId('');
                       setSelectedCity('');
                     }}
                   >
                     <option value="">Pilih Propinsi</option>
                     {provinces.map((provinsi) => (
                       <option key={provinsi.id} value={provinsi.id}>{provinsi.name}</option>
                     ))}
                   </select>
                 </div>
                 <div className="flex flex-col w-full sm:w-1/2">
                   <label className="text-sm font-semibold mb-1">Kota/Kabupaten</label>
                   <select 
                     className="border border-gray-300 rounded px-3 py-2"
                     value={selectedCityId}
                     onChange={handleCityChange}
                     disabled={!selectedProvince}
                   >
                     <option value="">Pilih Kota</option>
                     {cities.map((city) => (
                       <option key={city.id} value={city.id}>{city.name}</option>
                     ))}
                   </select>
                 </div>
               </div>
             </div>
           </div>
   
     {/* Grid Store */}
           <div className="min-h-screen p-10">
   {filteredStores.length === 0 ? (
     <div className="text-center py-10">
       <div className="inline-block bg-gray-100 px-6 py-4 rounded-lg">
         <p className="text-gray-600 font-medium">
           Maaf untuk saat ini STORE kami belum tersedia di kota ini
         </p>
         <button 
           onClick={() => {
             setSelectedCityId('');
             setSelectedCity('');
           }}
           className="mt-3 text-blue-600 hover:underline text-sm"
         >
           Lihat semua store
         </button>
       </div>
     </div>
   ) : (
     // Tampilkan store yang tersedia
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {columns.map((column, colIndex) => (
                   <div key={colIndex} className="space-y-6">
                     {column.map((cityItem, idx) => (
                       <div key={idx}>
                         <h3 className="text-[#1E3A8A] font-bold uppercase mb-2">{cityItem.city}</h3>
                         {cityItem.stores.map((store, sIdx) => (
                           <div key={sIdx} className="mb-4 text-gray-800 text-sm">
                             <a
                               className="font-semibold hover:underline block"
                               href={store.maps}
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               {store.name}
                             </a>
                             <p>{store.address}{store.address2 && <><br/>{store.address2}</>}</p>
                             {store.telp && <p>Telp: {store.telp}</p>}
                             {store.hp && <p>HP: {store.hp}</p>}
                           </div>
                         ))}
                       </div>
                     ))}
                   </div>
                 ))}
               </div>
             )}
           </div>
   
   {/* Pagination */}
           {/* <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2">
               <button
       className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
     >
       Sebelumnya
     </button>
             <button className="px-3 py-1 border border-gray-300 rounded-none bg-[#0B203F] text-white text-xs">
               1
             </button>
             <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs">
               2
             </button>
                         <button
       className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
     >
       Berikutnya
     </button>
           </div> */}
   </section>
 {/* Main Content */}
     <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-20">
             <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">Kontak Kami</h2>
       <p className="text-sm text-justify">
         Kami selalu berusaha untuk memberikan pelayanan yang terbaik, mohon kirimkan informasi dan saran Anda kepada Kami
         dengan mengisi formulir dibawah ini.
       </p>
 
       <div className="bg-gray-100 p-6 sm:p-10 rounded-lg flex flex-col sm:flex-row gap-10 mt-10">
 {/* Kontak Info */}
 <div className="w-full sm:w-1/3 text-center mx-auto flex flex-col items-center justify-center space-y-10">
   <div>
     <FaPhone className="text-5xl mx-auto mb-2" />
     <h3 className="font-semibold text-lg">Phone</h3>
     <a href="tel:+6251585652262" className="text-sm hover:underline">
       +62xxxxxxxxx
     </a>
     <br />
     <a href="tel:+6251585652262" className="text-sm hover:underline">
       +62xxxxxxxxx
     </a>
   </div>
   <div>
     <FaEnvelope className="text-5xl mx-auto mb-2" />
     <h3 className="font-semibold text-lg">Email</h3>
     <a href="mailto:info@cisangkan.com" className="text-sm hover:underline">
       Email : info@cisangkan.com
     </a>
   </div>
 </div>
 
         {/* Form */}
         <form onSubmit={handleSubmit} className="flex-1 space-y-4">
   {submitStatus && (
     <div className={`p-3 rounded ${
       submitStatus.type === 'success' 
         ? 'bg-green-100 text-green-800' 
         : 'bg-red-100 text-red-800'
     }`}>
       {submitStatus.message}
     </div>
   )}
 
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <div>
       <label className="block mb-1 text-gray-700">Nama</label>
       <input 
         type="text" 
         name="name"
         value={formData.name}
         onChange={handleInputChange}
         placeholder="Nama Anda" 
         className="w-full border rounded px-4 py-2 bg-white" 
         required
       />
     </div>
     <div>
       <label className="block mb-1 text-gray-700">Email</label>
       <input 
         type="email" 
         name="email"
         value={formData.email}
         onChange={handleInputChange}
         placeholder="Email Anda" 
         className="w-full border rounded px-4 py-2 bg-white" 
         required
       />
     </div>
   </div>
   
   <div>
     <label className="block mb-1 text-gray-700">Telepon</label>
     <input 
       type="tel" 
       name="phone"
       value={formData.phone}
       onChange={handleInputChange}
       placeholder="Telepon Anda" 
       className="w-full border rounded px-4 py-2 bg-white" 
     />
   </div>
   
   <div>
     <label className="block mb-1 text-gray-700">Alamat</label>
     <textarea 
       name="address"
       value={formData.address}
       onChange={handleInputChange}
       placeholder="Alamat Anda" 
       className="w-full border rounded px-4 py-2 bg-white" 
       rows="2"
     ></textarea>
   </div>
   
   <div>
     <label className="block mb-1 text-gray-700">Pesan</label>
     <textarea 
       name="message"
       value={formData.message}
       onChange={handleInputChange}
       placeholder="Pesan Anda" 
       className="w-full border rounded px-4 py-2 bg-white" 
       rows="3"
       required
     ></textarea>
   </div>
 
   <div className="flex items-center gap-4">
     <button 
       type="submit" 
       className="bg-[#0B203F] text-white px-6 py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
       disabled={isSubmitting}
     >
       {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
     </button>
     
     {/* <div className="flex gap-3">
       <a href="https://www.instagram.com/pt_cisangkan/" target="_blank" rel="noopener noreferrer">
         <FaInstagram className="text-pink-500 cursor-pointer text-xl hover:scale-110 transition-transform" />
       </a>
       <a href="https://www.facebook.com/cisangkan#" target="_blank" rel="noopener noreferrer">
         <FaFacebookF className="text-blue-600 cursor-pointer text-xl hover:scale-110 transition-transform" />
       </a>
       <a href="https://www.tiktok.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer">
         <FaTiktok className="text-black cursor-pointer text-xl hover:scale-110 transition-transform" />
       </a>
       <a href="https://www.youtube.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer">
         <FaYoutube className="text-red-600 cursor-pointer text-xl hover:scale-110 transition-transform" />
       </a>
       <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
         <FaWhatsapp className="text-green-500 cursor-pointer text-xl hover:scale-110 transition-transform" />
       </a>
     </div> */}
   </div>
 </form>
       </div>
     </section>
 
     </div>
   );
 }