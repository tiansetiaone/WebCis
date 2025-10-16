'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaCalculator, FaTimes } from 'react-icons/fa';
import { productsUt2Content, utility2SubItems } from '../../../../content-bank/products-ut2';
import Link from 'next/link';
import ProductSidebar from '../../components/ProductSidebar';
import { useRouter } from 'next/navigation';
import BannerProduk from '../../components/BannerProduk';

export default function DetailsUt2() {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(productsUt2Content['Utility Variant2']);
  const [activeThumbnail, setActiveThumbnail] = useState(productsUt2Content['Utility Variant2'].thumbnails[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const visibleSlides = 4;


  // Initialize product from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const subItem = urlParams.get('subItem');

    if (product && productsUt2Content[product]) {
      if (product === 'Utility Variant2' && subItem) {
        const selectedSubItem = utility2SubItems.find(item => item.id === subItem);
        if (selectedSubItem) {
          setCurrentProduct({
            ...productsUt2Content[product],
            name: selectedSubItem.name,
            thumbnails: selectedSubItem.thumbnails,
            specifications: [
              ...productsUt2Content[product].specifications.filter(spec => 
                !['Lubang Efektif', 'Jarak Antar Reng', 'Sudut Atap'].includes(spec.label)
              ),
              ...selectedSubItem.specifications
            ],
            technicalSpecs: [
              ...productsUt2Content[product].technicalSpecs.filter(tech => 
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
      setCurrentProduct(productsUt2Content[product]);
      setActiveThumbnail(productsUt2Content[product].thumbnails[0]);
    }
  }, []);

  const handleThumbnailClick = (thumbnail) => {
    setActiveThumbnail(thumbnail);
  };

  const handleProductTypeClick = (product) => {
    if (currentProduct.name === 'CISWELL' || product.id) {
      const selectedSubItem = utility2SubItems.find(item => item.id === product.id);
      if (selectedSubItem) {
        const subProduct = {
          ...currentProduct,
          name: selectedSubItem.name,
          thumbnails: selectedSubItem.thumbnails,
          specifications: [
            ...currentProduct.specifications.filter(spec => 
              !['Lubang Efektif', 'Jarak Antar Reng', 'Sudut Atap'].includes(spec.label)
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
      router.push(`/produk/detail?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(currentProduct.category)}`);
    }
  };

  // Slider functions
  const nextSlide = () => {
    if (currentSlide < currentProduct.type.length - visibleSlides) {
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
        left: slideIndex * (slideWidth + 16),
        behavior: 'smooth'
      });
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
          <div className="flex flex-col lg:flex-row gap-8 mb-22 2xl:gap-[14rem]">
            <div className="relative w-full max-w-md">
              <div className="absolute top-0 left-0 bg-[#d5def4] px-4 py-2 rounded-br-lg shadow text-xl italic font-semibold text-[#0B203F] z-10 2xl:text-2xl">
                {currentProduct.name}
              </div>
              
              <div className="relative aspect-square bg-white w-full flex items-center justify-center 2xl:w-160">
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
             {currentProduct.tables && (
  <section className="mb-14">
    {Object.values(currentProduct.tables).map((table, idx) => (
      <div key={idx} className="mb-8 overflow-x-auto">
        <h2 className="text-lg font-semibold border-l-4 border-[#0B203F] pl-4 mb-2 2xl:text-2xl">{table.title}</h2>
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-[#0B203F] text-white text-xs 2xl:text-sm">
              {table.headers.map((header, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='text-sm'>
            {table.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="even:bg-gray-50">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border border-gray-300 px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </section>
)}

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

<div className='pl-2 2xl:pl-1'>
  <a
    href="/informasi/katalog#brosur-section"
    className="bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] inline-flex items-center gap-2"
  >
    <FaCalculator className="text-lg" />
    Unduh Brosur
  </a>
</div>
            </div>
          </div>
          
          {/* Product Types Slider */}
          {/* <section className="mt-12">
            <h2 className="text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-2">PRODUK CONCRETE BLOCK LAINNYA :</h2>
            
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
        </main>
      </div>
    </div>
  );
}