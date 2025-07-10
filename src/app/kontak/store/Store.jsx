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
  const [selectedCityName, setSelectedCityName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // City matching configuration
  const cityMatchingConfig = {
    // 'JAKARTA': ['JAKARTA TIMUR', 'JAKARTA BARAT', 'JAKARTA SELATAN', 'JAKARTA PUSAT', 'JAKARTA UTARA'],
    'BANDUNG': ['KOTA BANDUNG'],
    'SURABAYA': ['KOTA SURABAYA'],
    // Add more mappings as needed
  };

  const getCityVariations = (cityName) => {
    const normalized = normalizeCityName(cityName);
    const variations = new Set([normalized]);
    
    // Add common variations
    if (normalized.includes('TIMUR')) variations.add('TIMUR');
    if (normalized.includes('BARAT')) variations.add('BARAT');
    if (normalized.includes('SELATAN')) variations.add('SELATAN');
    if (normalized.includes('UTARA')) variations.add('UTARA');
    if (normalized.includes('PUSAT')) variations.add('PUSAT');
    
    // Add configured variations
    for (const [key, values] of Object.entries(cityMatchingConfig)) {
      if (normalized.includes(key)) {
        values.forEach(v => variations.add(v));
      }
    }
    
    return Array.from(variations);
  };

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
      body: JSON.stringify({
        ...formData,
        formType: 'Store'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    setSubmitStatus({ 
      type: 'success', 
      message: data.message || 'Terima kasih! Pesan Anda telah terkirim.' 
    });
    
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
      message: error.message || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.' 
    });
  } finally {
    setIsSubmitting(false);
  }
};


  useEffect(() => {
    axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(res => setProvinces(res.data))
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);

useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then(res => {
          setCityOptions(res.data);
        })
        .catch(err => console.error('Error fetching cities:', err));
    } else {
      setCityOptions([]);
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
      city: 'MEDAN',
      stores: [
        {
          name: 'HOMESMART',
          address: 'PT MEGAMAS PLAZA BANGUNAN',
          address2 : 'Jl. Jend. Gatot Subroto No. 102 Medan, Sumatera Utara',
          telp: '(061) 4527588, (061) 4527586',
          hp: '0813 7028 1999',
          maps: 'https://maps.app.goo.gl/FAvHUY8G52aHjMAY7'
        },
      ],
    },
    {
      city: 'BATAM',
      stores: [
        {
          name: 'CV BATAM SUPPLY & DISTRIBUSI',
          address: 'Ruko Niaga Mas Blok B No.16',
          address2: 'SinCom - Batam Center',
          telp: '0813 7253 6236',
          maps: 'https://maps.app.goo.gl/rLxxdWiYCneyPnJT8'
        },
      ],
    },
        {
      city: 'PADANG',
      stores: [
        {
          name: 'CV. HENDRI WIJAYA PHERI',
          address: 'Jl. Nipah No.10-Padang',
          telp: '(0751) 28685',
          hp: '0813 6350 0284',
          maps: 'https://maps.app.goo.gl/xFdaMyNWxYKbCx1D7'
        },
      ],
    },
    {
      city: 'PALEMBANG',
      stores: [
        {
          name: 'PT. CELENTANG MULTI ARTHA',
          address: 'Jl. Brigjen H. Kasim No. B1',
          address2: 'Bukit Sangkal Palembang',
          telp: '(0711) 5612157',
          hp: '0895 3444 88643',
          maps: 'https://maps.app.goo.gl/K2trdfYynqw9caEQ9'
        },
      ],
    },
    {
      city: 'BANDAR LAMPUNG',
      stores: [
        {
          name: 'VICTORIA INDAH',
          address: 'Jl. Sukarno Hatta 39, Bandar Lampung (Samping Pool Bus Puspa)',
          hp: '0821 7676 6429',
          maps: ''
        },
      ],
    },
    {
      city: 'SEMARANG',
      stores: [
        {
          name: 'CV. SURYA MANDIRI',
          address: 'Jl. Kanai Raya 10 G Semarang',
          telp: '(024) 8455257, 8455258',
          hp: '0857 0303 0108, 0812 2951 8998',
          maps: 'https://maps.app.goo.gl/xC7yvABATaSybdiy7'
        },
      ],
    },
     {
      city: 'SURABAYA',
      stores: [
        {
          name: 'PT LARISSA CITRA NUSA',
          address: 'Jl. Alon-Alon Contong No. 5A',
          address2: 'Surabaya',
          telp: '(031) 5341655 / 5469879',
          hp: '0812 5951 6039',
          maps: 'https://maps.app.goo.gl/CJV6SfWgcYxSV6R36'
        },
      ],
    },
    {
      city: 'BALI',
      stores: [
        {
          name: 'CV ANUGERAH PUTRA DEWATA',
          address: 'Jl. Kargo Permai I no. 198, Denpasar',
          hp: '0851 0040 4904',
          maps: ''
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'TRI PUTRA ABADI',
          address: 'Jl. Ahmad Yani No. 57 (By Pass) Rawamangun, Jakarta Timur',
          telp: '(021) 8197816',
          maps: ''
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'TRI PUTRA ABADI',
          address: 'Jl. Malaka Baru No. 36 Pondok Kopi',
          address2: 'Jakarta Timur',
          telp: '(021) 8619756',
          hp: '0812 8714 9117',
          maps: 'https://maps.app.goo.gl/uq9aQicUMpvbH9H86'
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'SINAR BHUANA',
          address: 'Jl. Raya Bogor Km. 20, Kramat Jati',
          address2: 'Jakarta Timur',
          hp: '0878 3003 0098',
          maps: 'https://maps.app.goo.gl/6ZjFCMkG7TaF79keA'
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'MEKAR JAYA ABADI',
          address: 'Jl. Daan Mogot Km 11 No. 2A',
          address2: 'Jakarta Barat',
          hp: '(021) 29037949',
          maps: 'https://maps.app.goo.gl/mWPY9jqsu32K8oNY8'
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'ADHIGANA GENTENG STORE',
          address: 'Jl. Raya Bogor km. 27 no.14 Gandaria, Jakarta Timur (Seberang Alfa)',
          hp: '0812 1111 1042',
          maps: 'https://maps.app.goo.gl/w6Z1RjCiAVJUF5Jw5'
        },
      ],
    },
    {
      city: 'JAKARTA',
      stores: [
        {
          name: 'MAESTRO ATAP GALLERY CIGANJUR',
          address: 'Jl. Moh Kahfi I no. 2 Ciganjur, Kec. Jagakarsa, Jakarta Selatan',
          telp: '(021) 7871577',
          hp: '0878 8194 7124',
          maps: 'https://maps.app.goo.gl/rV5bUGY9WyGkwpdt9'
        },
      ],
    },
    {
      city: 'BOGOR',
      stores: [
        {
          name: 'CV BURSA GENTENG',
          address: 'Jl. Raya Cileungsi Jonggol Km. 3',
          address2: 'Cileungsi',
          telp: '(021) 82491388',
          hp: '0811 1666 478, 0811 8230 18',
          maps: 'https://maps.app.goo.gl/3yM4PfYYKZAQsfvc6'
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'TB PILAR MAS',
          address: 'Jl. Raya Cirendeu No. 9 Cirendeu',
          address2: 'Tangerang Selatan',
          hp: '0817 6776 161',
          maps: ''
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'DUTA INDAH GENTENG',
          address: 'Jl. Raya Serpong no. 88 BSD',
          address2: 'Tangerang Selatan',
          hp: '(021) 5375625',
          maps: ''
        },
      ],
    },
    {
      city: 'TANGERANG',
      stores: [
        {
          name: 'RITA ROOF',
          address: 'Jln. Imam Bonjol No. 30',
          address2: 'Karawaci, Tangerang',
          hp: '0813 1791 1419',
          maps: 'https://maps.app.goo.gl/Lbg4ynWT9uEYhH1F8'
        },
      ],
    },
    {
      city: 'BEKASI',
      stores: [
        {
          name: 'SINAR HARAPAN',
          address: 'JI. Wibawamukti 2 Kp. Pedurenan',
          address2: 'Jatiasih-Bekasi',
          hp: '0852 8848 4735',
          maps: ''
        },
      ],
    },
    {
      city: 'BEKASI',
      stores: [
        {
          name: 'CAHAYA ATAP SEJATI',
          address: 'JI. Patriot No. 111',
          address2: 'Bekasi',
          telp: '(021) 88963670',
          hp: '0896 6463 3386',
          maps: ''
        },
      ],
    },
    {
      city: 'BEKASI',
      stores: [
        {
          name: 'MAESTRO ATAP BEKASI',
          address: 'Jl. Raya Hankam no. 141,Jatiranggon',
          address2: 'Jati Sampurna, Bekasi',
          hp: '0856 9485 4422',
          maps: ''
        },
      ],
    },
    {
      city: 'BEKASI',
      stores: [
        {
          name: 'ANEKA ATAP TEDUH LESTARI',
          address: 'Jl. Raya teluk pucung no.62',
          address2: 'Kec. Bekasi utara',
          hp: '0812 8762 00888',
          maps: ''
        },
      ],
    },
    {
      city: 'BANDUNG',
      stores: [
        {
          name: 'MAESTRO ATAP BANDUNG',
          address: 'Jl. Soekarno-Hatta No. 628',
          address2: 'Bandung',
          hp: '0813 2828 4040',
          maps: ''
        },
      ],
    },
  ];

// const availableCities = useMemo(() => {
//     return [...new Set(cityItems.map(item => item.city.toUpperCase()))];
//   }, []);

  // Filter kota yang hanya memiliki store
  // useEffect(() => {
  //   if (cities.length > 0) {
  //     const filtered = cities.filter(city => 
  //       availableCities.some(availCity => 
  //         city.name.toUpperCase().includes(availCity) || 
  //         availCity.includes(city.name.toUpperCase())
  //       )
  //     );
  //     setCityOptions(filtered);
  //   } else {
  //     setCityOptions([]);
  //   }
  // }, [cities, availableCities]);

  // Fungsi untuk menangani perubahan kota
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const selectedCityData = cityOptions.find(c => c.id === cityId);
    
    setSelectedCityId(cityId);
    setSelectedCityName(selectedCityData ? selectedCityData.name : '');
    setSelectedCity('');
  };

  const normalizeCityName = (cityName) => {
    return cityName
      .replace(/KOTA|KAB(UPATEN)?\.?/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  };

  const getExactSearchPhrase = (cityName) => {
    const normalized = normalizeCityName(cityName);
    
    // Handle special cases
    const specialCases = {
      'jakarta selatan': ['jaksel', 'jkt selatan'],
      'jakarta timur': ['jaktim', 'jkt timur'],
      'jakarta barat': ['jakbar', 'jkt barat'],
      'tangerang selatan': ['tangsel'],
      'bandung': ['kota bandung', 'bandung kota'],
      // Tambahkan kasus khusus lainnya di sini
    };

    for (const [key, aliases] of Object.entries(specialCases)) {
      if (normalized.includes(key)) {
        return [key, ...aliases];
      }
    }

    return [normalized];
  };

  const getStrictCityKeywords = (cityName) => {
    const normalized = normalizeCityName(cityName);
    
    // Special handling for Jakarta areas
    if (normalized.includes('jakarta','tangerang')) {
      return [normalized]; // Use the full phrase like "jakarta selatan"
    }
    return normalized.split(' ');
  };

 const filteredStores = useMemo(() => {
    if (!selectedCityName) return cityItems;
    
    const searchPhrases = getExactSearchPhrase(selectedCityName);
    
    return cityItems.filter(item => {
      const itemCity = normalizeCityName(item.city);
      
      // 1. Exact city name match
      if (searchPhrases.some(phrase => itemCity === phrase)) {
        return true;
      }
      
       // 2. Address contains exact phrase
      return item.stores.some(store => {
        const fullAddress = `${store.address} ${store.address2 || ''}`.toLowerCase();
        return searchPhrases.some(phrase => fullAddress.includes(phrase));
      });
    });
  }, [selectedCityName, cityItems]);

  // Bagi ke 3 kolom secara vertikal
  const itemsPerColumn = Math.ceil(filteredStores.length / 3);
  const columns = [
    filteredStores.slice(0, itemsPerColumn),
    filteredStores.slice(itemsPerColumn, itemsPerColumn * 2),
    filteredStores.slice(itemsPerColumn * 2),
  ];

  
  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
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
      </div>

  {/* Header Section */}

      <div className="bg-[#F2F2F2] py-4">
        <nav className="flex justify-center space-x-10 text-[1.5rem] font-light tracking-wide">
          <Link href="/kontak/store" className="text-[#2D5DA6] font-bold">Store</Link>
          <Link href="/kontak/kiosk" className="text-[#333] hover:text-[#2D5DA6]">Kiosk</Link>
        </nav>
      </div> 

      <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 mb-10 text-sm sm:text-base border-b border-[#CCCCCC]">
        {/* Header Section */}
        <div className="flex items-center gap-6 border-b border-[#CCCCCC] pb-6 max-w-6xl mx-auto px-4 md:px-0">
          <div className="flex items-center w-full md:w-1/2 gap-10">
            <div className="leading-snug">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#0B203F] border-l-4 border-[#0B203F] pl-4 uppercase leading-tight">
                Temukan<br />Store Kami<br />di Kota Anda
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/STORE.png"
                alt="Store Icon"
                width={140}
                height={140}
                className="mb-1"
              />
            </div>
          </div>

        {/* Kanan: Logo + Dropdowns */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 text-sm mb-4">
              Pilih wilayah untuk melihat informasi STORE kami terdekat
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
                    setSelectedCityName('');
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
                  {cityOptions.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Store */}
        <div className="min-h-screen p-10">
          {selectedCityName && filteredStores.length === 0 ? (
            <div className="text-center py-10 col-span-3">
              <div className="inline-block bg-gray-100 px-6 py-4 rounded-lg">
                <p className="text-gray-600 font-medium">
                  Maaf untuk saat ini STORE kami belum tersedia di {selectedCityName}
                </p>
                <button 
                  onClick={() => {
                    setSelectedCityId('');
                    setSelectedCityName('');
                    setSelectedProvince('');
                  }}
                  className="mt-3 text-blue-600 hover:underline text-sm"
                >
                  Lihat semua store
                </button>
              </div>
            </div>
          ) : (
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
      (022)6031588
    </a>
    <br />
    <a href="tel:+6251585652262" className="text-sm hover:underline">
      (022)6030467
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