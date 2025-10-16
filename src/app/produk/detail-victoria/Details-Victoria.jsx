'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaCalculator, FaTimes } from 'react-icons/fa';
import { productsVsContent, victoriaSeriesSubItems } from '../../../../content-bank/product-vs';
import Link from 'next/link';
import ProductSidebar from '../../components/ProductSidebar';
import { useRouter } from 'next/navigation';
import BannerProduk from '../../components/BannerProduk';

export default function DetailsVS() {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(productsVsContent['Onyx']);
  const [activeThumbnail, setActiveThumbnail] = useState(productsVsContent['Onyx'].thumbnails[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const visibleSlides = 4;
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculationType, setCalculationType] = useState('Luas Atap');
  const [inputValue, setInputValue] = useState('');
  const [slopeAngle, setSlopeAngle] = useState('');
  const [result, setResult] = useState('');

  // Initialize product from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const subItem = urlParams.get('subItem');

    if (product && productsVsContent[product]) {
      if (product === 'Onyx' && subItem) {
        const selectedSubItem = victoriaSeriesSubItems.find(item => item.id === subItem);
        if (selectedSubItem) {
          setCurrentProduct({
            ...productsVsContent[product],
            name: selectedSubItem.name,
            thumbnails: selectedSubItem.thumbnails,
            specifications: [
              ...productsVsContent[product].specifications.filter(spec => 
                !['Luas Efektif', 'Jarak Antar Reng', 'Sudut Atap'].includes(spec.label)
              ),
              ...selectedSubItem.specifications
            ],
            technicalSpecs: [
              ...productsVsContent[product].technicalSpecs.filter(tech => 
                !['Ketebalan Cat', 'Warna Cat'].includes(tech.label)
              ),
              ...selectedSubItem.technicalSpecs
            ],
            installationNote: selectedSubItem.installationNote
          });
          setActiveThumbnail(selectedSubItem.thumbnails[0]);
          return;
        }
      }
      setCurrentProduct(productsVsContent[product]);
      setActiveThumbnail(productsVsContent[product].thumbnails[0]);
    }
  }, []);

  const handleThumbnailClick = (thumbnail) => {
    setActiveThumbnail(thumbnail);
  };

  const handleProductTypeClick = (product) => {
    if (currentProduct.name === 'ONYX' || product.id) {
      const selectedSubItem = victoriaSeriesSubItems.find(item => item.id === product.id);
      if (selectedSubItem) {
        const subProduct = {
          ...currentProduct,
          name: selectedSubItem.name,
          thumbnails: selectedSubItem.thumbnails,
          specifications: [
            ...currentProduct.specifications.filter(spec => 
              !['Luas Efektif', 'Jarak Antar Reng', 'Sudut Atap'].includes(spec.label)
            ),
            ...selectedSubItem.specifications
          ],
          technicalSpecs: [
            ...currentProduct.technicalSpecs.filter(tech => 
              !['Ketebalan Cat', 'Warna Cat'].includes(tech.label)
            ),
            ...selectedSubItem.technicalSpecs
          ],
          installationNote: selectedSubItem.installationNote
        };
        
        setCurrentProduct(subProduct);
        setActiveThumbnail(selectedSubItem.thumbnails[0]);
        
        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('subItem', selectedSubItem.id);
        window.history.pushState({}, '', url);
      }
    } else {
      // Navigate to other product details
      router.push(`/produk/detail-victoria?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(currentProduct.category)}`);
    }
  };

  // Slider functions
const nextSlide = () => {
  const maxSlide = Math.max(0, currentProduct.accessories.length - visibleSlides);
  if (currentSlide < maxSlide) {
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
    const containerWidth = sliderRef.current.clientWidth;
    const scrollAmount = (containerWidth / visibleSlides) * slideIndex;
    sliderRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }
};

  // Calculator functions
  const resetCalculator = () => {
    setInputValue('');
    setSlopeAngle('');
    setResult('');
    setCalculationType('Luas Atap');
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    if (showCalculator) resetCalculator();
  };

  const handleCalculationTypeChange = (type) => {
    resetCalculator();
    setCalculationType(type);
  };

const calculateRequirement = () => {
  const value = parseFloat(inputValue);
  if (!isNaN(value)) {
    let calculatedResult;
    
    // Ambil nilai pemakaian genteng dari produk saat ini
    const usagePerSqm = currentProduct.specifications.find(
      spec => spec.label === 'Pemakaian Genteng'
    )?.value;
    
    // Fungsi untuk ekstrak nilai tertinggi dari range
    const extractHighestUsageValue = (usageString) => {
      // Temukan semua angka (termasuk desimal dengan koma/titik)
      const numbers = usageString.match(/[\d,\.]+/g);
      
      if (!numbers) return 8; // Default jika tidak ditemukan
      
      // Konversi semua angka ke float dan cari yang tertinggi
      const floatValues = numbers.map(num => 
        parseFloat(num.replace(',', '.'))
      ).filter(num => !isNaN(num));
      
      return floatValues.length > 0 ? Math.max(...floatValues) : 8;
    };
    
    const usageValue = usagePerSqm ? extractHighestUsageValue(usagePerSqm) : 8;
    
    if (calculationType === 'Luas Atap') {
      calculatedResult = Math.ceil(value * usageValue);
    } else {
      if (!slopeAngle || slopeAngle < 20 || slopeAngle > 75) {
        alert('Mohon masukkan sudut kemiringan min 20°');
        return;
      }
      
      const angleRad = parseFloat(slopeAngle) * Math.PI / 180;
      const cosValue = Math.cos(angleRad);
      const actualRoofArea = value / cosValue;
      calculatedResult = Math.ceil(actualRoofArea * usageValue);
    }
    
    setResult(calculatedResult.toString());
  }
};

 return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800">
      {/* Hero Section */}
      <BannerProduk kategori={currentProduct.category} />
      
      {/* Header Section */}
      <div className="bg-[#0B203F] text-white text-center py-2 font-light text-[1.5rem] tracking-wide">
        {currentProduct.category.toUpperCase()}
      </div>

      <div className="flex flex-col lg:flex-row mx-auto ps-2 pe-2 2xl:ps-6 2xl:pe-1 py-8">
        <ProductSidebar />
        
        <main className="w-full lg:w-5/6 flex flex-col">
          {/* Product Images and Details */}
          <div className="flex flex-col lg:flex-row gap-8 2xl:gap-[21rem] mb-22">
            <div className="relative w-full max-w-md">
              <div className="absolute top-0 left-0 bg-[#d5def4] px-4 py-2 rounded-br-lg shadow text-xl italic font-semibold text-[#0B203F] z-10 2xl:text-2xl">
                {currentProduct.name}
              </div>
              
              <div className="relative aspect-square bg-white w-full 2xl:w-180 flex items-center justify-center">
                <Image 
                  src={activeThumbnail.largeImage}
                  alt={`Produk ${currentProduct.name}`} 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="mt-4">
                <div className="flex space-x-3 2xl:gap-1">
                  {currentProduct.thumbnails.map((thumbnail) => (
                    <div 
                      key={thumbnail.id}
                      className={`relative w-16 h-16 2xl:w-30 2xl:h-30 rounded-xs overflow-hidden cursor-pointer ${
                        activeThumbnail.id === thumbnail.id 
                          ? 'ring-4 ring-blue-500' 
                          : 'border border-gray-300'
                      }`}
                      onClick={() => handleThumbnailClick(thumbnail)}
                    >
                      <Image
                        src={thumbnail.thumbImage}
                        alt={`Thumbnail ${thumbnail.id}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="w-full lg:w-1/2 space-y-6 px-6">
              <section className='mb-14'>
                <h2 className="text-xl 2xl:text-2xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI :</h2>
                <div className="space-y-3 pl-4">
                  {currentProduct.specifications.map((item, index) => (
                    <div key={index} className="flex 2xl:text-lg">
                      <p className="w-65  font-medium">{item.label}</p>
                      <p className="mr-2">:</p>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
                {currentProduct.installationNote && (
                  <p className="italic mt-4 pl-4">{currentProduct.installationNote}</p>
                )}
                {currentProduct.installationNote2 && (
                  <p className="italic mt-4 pl-4">{currentProduct.installationNote2}</p>
                )}
              </section>

              {/* <section className='mb-8'>
                <h2 className="text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI TEKNIS :</h2>
                <div className="space-y-3 pl-4">
                  {currentProduct.technicalSpecs.map((item, index) => (
                    <div key={index} className="flex">
                      <p className="w-48 font-medium">{item.label}</p>
                      <p className="mr-2">:</p>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
              </section> */}

              {/* Calculator and Brochure Buttons */}
              <div className='pl-4 px-44'>
                <button 
                  onClick={toggleCalculator}
                  className="bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] flex items-center gap-2 w-full 2xl:justify-center"
                >
                  <FaCalculator className="text-lg 2xl:text-xl" />
                  Hitung Kebutuhan Genteng
                </button>
              </div>
              <div className='pl-4 px-44'>
                <a
                  href="/informasi/katalog#brosur-section"
                  className="bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] flex items-center gap-2 w-full justify-center"
                >
                  <FaCalculator className="text-lg 2xl:text-xl" />
                  Unduh Brosur
                </a>
              </div>

              {/* Calculator Popup */}
              {showCalculator && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
                    <button
                      onClick={toggleCalculator}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="text-xl" />
                    </button>

                    <h3 className="text-lg 2xl:text-xl font-semibold text-center border-b border-b-gray-400 pb-6 mb-6">Kalkulator Genteng</h3>

                    <div className="mb-6">
                      <p className="text-xs 2xl:text-sm font-bold mb-2">Hitungan dengan:</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs 2xl:text-sm">
                          <input
                            type="radio"
                            checked={calculationType === 'Luas Atap'}
                            onChange={() => handleCalculationTypeChange('Luas Atap')}
                            className="h-3 w-3 2xl:h-5 2xl:w-5 text-[#0B203F] focus:ring-[#0B203F]"
                          />
                          Luas Atap
                        </label>
                        <label className="flex items-center gap-2 text-xs 2xl:text-sm">
                          <input
                            type="radio"
                            checked={calculationType === 'Luas Bangunan'}
                            onChange={() => handleCalculationTypeChange('Luas Bangunan')}
                            className="h-3 w-3 2xl:h-5 2xl:w-5 text-[#0B203F] focus:ring-[#0B203F]"
                          />
                          Luas Bangunan
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="font-bold block mb-2 text-xs 2xl:text-sm">
                        {calculationType === 'Luas Atap' ? 'Luas Atap' : 'Luas Bangunan'}:
                      </label>
                      <div className="flex border border-gray-300 rounded">
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="px-3 py-2 w-full focus:outline-none text-xs"
                          placeholder="0"
                          min="0"
                        />
                        <span className="text-xs px-3 py-2 bg-gray-300">m²</span>
                      </div>
                    </div>

                    {calculationType === 'Luas Bangunan' && (
                      <div className="mb-4">
                        <label className="font-bold block mb-2 text-xs 2xl:text-sm">Sudut Kemiringan Atap:</label>
                        <div className="flex border border-gray-300 rounded">
                          <input
                            type="number"
                            value={slopeAngle}
                            onChange={(e) => setSlopeAngle(e.target.value)}
                            className="px-3 py-2 w-full focus:outline-none text-xs"
                            placeholder="min 20 derajat"
                            min="0"
                            max="90"
                          />
                          <span className="px-4 py-2 bg-gray-300 text-xs">°</span>
                        </div>
                      </div>
                    )}

                    {result && (
                      <div className='mb-6'>
                        <p className="font-bold mb-2 text-xs 2xl:text-sm">Anda Membutuhkan:</p>
                        <div className="flex border border-gray-300 rounded">
                          <input
                            type="text"
                            value={result}
                            readOnly
                            className="px-3 py-2 w-full focus:outline-none text-xs"
                          />
                          <span className="text-xs px-3 py-2 bg-gray-300">pcs</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={calculateRequirement}
                      className="w-full bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] mt-4"
                    >
                      Hitung
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Types Slider */}
          {/* <section className="mt-12">
            <h2 className="text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-2">TYPE PRODUK :</h2>
            
            <div className="relative">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-[1.5rem] top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 bg-[#0B203F] text-white rounded-none flex items-center justify-center hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              
              <div
                ref={sliderRef}
                className="grid grid-flow-col auto-cols-[calc(100%/2)] sm:auto-cols-[calc(100%/3)] md:auto-cols-[calc(100%/4)] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-20 gap-7.5"
              >
                {currentProduct.type.map((product) => (
                  <div 
                    key={product.name} 
                    className="snap-start min-w-0 ps-11 group cursor-pointer"
                    onClick={() => handleProductTypeClick(product)}
                  >
                    <div className="w-50 bg-gray-300 rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col items-center">
                      <div className="relative w-full h-45 flex items-center justify-center bg-white overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-scale-down transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="w-full text-center text-sm font-medium bg-[#E5ECF6] py-2 rounded-b-xl">
                        {product.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                disabled={currentSlide >= currentProduct.type.length - visibleSlides}
                className="absolute right-[1.5rem] top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 bg-[#0B203F] text-white rounded-none flex items-center justify-center hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section> */}


          {/* Product Accesories */}
         <section className="mt-12">
                     <h2 className="text-xl 2xl:text-2xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-2">AKSESORIS :</h2>
                     
                     <div className="relative">
                       <button
                         onClick={prevSlide}
                         disabled={currentSlide === 0}
                         className="absolute left-[1.5rem] top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 2xl:w-14 2xl:h-14 bg-[#0B203F] text-white rounded-none flex items-center justify-center hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         <FaChevronLeft className="w-5 h-5 2xl:w-8 2xl:h-8" />
                       </button>
                       
                       <div
                         ref={sliderRef}
                         className="grid grid-flow-col auto-cols-[calc(100%/2)] sm:auto-cols-[calc(100%/3)] md:auto-cols-[calc(100%/4)] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-20 gap-7.5 2xl:gap-5 2xl:ml-2"
                       >
                         {currentProduct.accessories.map((product) => (
                           <div key={product.name} className="snap-start min-w-0 ps-11 2xl:ps-22 group">
                             <div className="w-50 2xl:w-65 bg-gray-300 rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col items-center">
         <div className="relative w-full aspect-[4/3] 2xl:h-45 flex items-center justify-center bg-white overflow-hidden">
           <Image
             src={product.image}
             alt={product.name}
             fill
             className="object-scale-down transition-transform duration-500 group-hover:scale-105"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           />
         </div>
                               <div className="w-full text-center text-sm 2xl:text-base font-medium bg-[#E5ECF6] py-2 rounded-b-xl">
                                 {product.name}
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                       
<button
  onClick={nextSlide}
  disabled={currentSlide >= Math.max(0, currentProduct.accessories.length - visibleSlides)}
  className="absolute right-[1.5rem] top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 2xl:w-14 2xl:h-14 bg-[#0B203F] text-white rounded-none flex items-center justify-center hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
>
  <FaChevronRight className="w-5 h-5 2xl:w-8 2xl:h-8" />
</button>
                       
                       <style jsx>{`
                         .no-scrollbar::-webkit-scrollbar {
                           display: none;
                         }
                         .no-scrollbar {
                           -ms-overflow-style: none;
                           scrollbar-width: none;
                         }
                       `}</style>
                     </div>
                   </section>
        </main>
      </div>
    </div>
  );
}