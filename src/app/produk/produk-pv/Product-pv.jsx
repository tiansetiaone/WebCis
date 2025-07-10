'use client';
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { 
  ConcreteRoofContent, concreteRoofProducts,
  PavingBlockContent, pavingBlockProducts,
  ConcreteBlockContent, concreteBlockProducts,
  UtilityContent, utilityProducts
} from '../../product-content';
import Link from 'next/link';
import Image from 'next/image';
import BannerProduk from '../../components/BannerProduk';
import ProductSidebar from '../../components/ProductSidebar';
import { useSearchParams } from 'next/navigation';

export default function ProductPv() {
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState('Concrete Roof');
  const productSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = 4;

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['Concrete Roof', 'Paving Block', 'Concrete Block', 'Utility'].includes(category)) {
      setActiveItem(category);
    }
  }, [searchParams]);

 const getCurrentProducts = () => {
    switch(activeItem) {
      // case 'Concrete Roof': return concreteRoofProducts;
      case 'Paving Block': return pavingBlockProducts;
      case 'Concrete Block': return concreteBlockProducts;
      case 'Utility': return utilityProducts;
      default: return [];
    }
  };

  const getCurrentContent = () => {
    switch(activeItem) {
      // case 'Concrete Roof': return <ConcreteRoofContent />;
      case 'Paving Block': return <PavingBlockContent />;
      case 'Concrete Block': return <ConcreteBlockContent />;
      case 'Utility': return <UtilityContent />;
      default: return <div className="text-center py-10">Pilih kategori produk</div>;
    }
  };

  const nextSlide = () => {
    const products = getCurrentProducts();
    if (currentSlide < products.length - visibleSlides) {
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
    if (productSliderRef.current) {
      const slideWidth = productSliderRef.current.children[0]?.clientWidth || 0;
      productSliderRef.current.scrollTo({
        left: slideIndex * (slideWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800">
      <BannerProduk kategori={activeItem} />

      <div className="bg-[#0B203F] text-white text-center py-2 font-light text-[1.5rem] tracking-wide">
        {activeItem.toUpperCase()}
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto ps-2 pe-2 py-8">
        <ProductSidebar onItemChange={setActiveItem} />

        <main className="w-full lg:w-5/6 space-y-8 ps-5 pe-5">
          {getCurrentContent()}

          {/* <section className="mb-10 relative">
            <h2 className="text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">TYPE PRODUK :</h2>
            <div className="relative">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-[1.5rem] top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 bg-[#0B203F] text-white rounded-none flex items-center justify-center hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ml-[-26px]"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={productSliderRef}
                className="grid grid-flow-col auto-cols-[calc(100%/2)] sm:auto-cols-[calc(100%/3)] md:auto-cols-[calc(100%/4)] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-20 gap-7 ml-[-29px]"
              >
                {getCurrentProducts().map((product) => (
                  <div key={product.name} className="snap-start min-w-0 ps-12.5 group">
                    <Link 
                      href={`/produk/detail?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(activeItem)}`}
                      className="block"
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
                    </Link>
                  </div>
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide >= getCurrentProducts().length - visibleSlides}
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