"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaCalculator } from "react-icons/fa";
import { productsPb3Content, kansteinWetprocessSubItems, kansteinDryprocessSubItems, taliAirSubItems } from "../../../../content-bank/products-pb3";
import ProductSidebar from "../../components/ProductSidebar";
import { useRouter } from "next/navigation";
import BannerProduk from '../../components/BannerProduk'; 
// import ApplicationModal from '../../components/ApplicationModal';

export default function DetailsPb3() {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(productsPb3Content["Kanstein Wet Process"]);
  const [activeThumbnail, setActiveThumbnail] = useState(productsPb3Content["Kanstein Wet Process"].thumbnails[0]);
  const [activeItems, setActiveItems] = useState(kansteinWetprocessSubItems); // Tambahkan state ini
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const visibleSlides = 4;
  const [activeThumbnails, setActiveThumbnails] = useState({});
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (productId, thumbIndex) => {
    setActiveThumbnails((prev) => ({
      ...prev,
      [productId]: thumbIndex,
    }));
  };

  // Initialize product from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get("product");
    const subItem = urlParams.get("subItem");

    if (product && productsPb3Content[product]) {
      // Tentukan items yang aktif berdasarkan produk
      let items;
      switch (product) {
        case "Kanstein Wet Process":
          items = kansteinWetprocessSubItems;
          break;
        case "Kanstein Dry Process":
          items = kansteinDryprocessSubItems;
          break;
        case "Tali Air":
          items = taliAirSubItems;
          break;
        default:
          items = kansteinWetprocessSubItems;
      }
      setActiveItems(items);

      if (subItem) {
        const selectedSubItem = items.find((item) => item.id === subItem);
        if (selectedSubItem) {
          setCurrentProduct({
            ...productsPb3Content[product],
            name: selectedSubItem.name,
            thumbnails: selectedSubItem.thumbnails,
            specifications: [...productsPb3Content[product].specifications.filter((spec) => !["Lubang Efektif", "Jarak Antar Reng", "Sudut Atap"].includes(spec.label)), ...selectedSubItem.specifications],
            technicalSpecs: [...productsPb3Content[product].technicalSpecs.filter((tech) => !["Ketebalan Cat", "Warna Cat"].includes(tech.label)), ...selectedSubItem.technicalSpecs],
            installationNote: selectedSubItem.installationNote,
          });
          setActiveThumbnail(selectedSubItem.thumbnails[0]);
          return;
        }
      }
      setCurrentProduct(productsPb3Content[product]);
      setActiveThumbnail(productsPb3Content[product].thumbnails[0]);
    }
  }, []);

  const handleProductTypeClick = (product) => {
    const selectedSubItem = activeItems.find((item) => item.id === product.id);
    if (selectedSubItem) {
      const subProduct = {
        ...currentProduct,
        name: selectedSubItem.name,
        thumbnails: selectedSubItem.thumbnails,
        specifications: [...currentProduct.specifications.filter((spec) => !["Lubang Efektif", "Jarak Antar Reng", "Sudut Atap"].includes(spec.label)), ...selectedSubItem.specifications],
        technicalSpecs: [...currentProduct.technicalSpecs.filter((tech) => !["Ketebalan Cat", "Warna Cat"].includes(tech.label)), ...selectedSubItem.technicalSpecs],
        installationNote: selectedSubItem.installationNote,
      };

      setCurrentProduct(subProduct);
      setActiveThumbnail(selectedSubItem.thumbnails[0]);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("subItem", selectedSubItem.id);
      window.history.pushState({}, "", url);
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
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800">
      {/* Hero Section */}
      <BannerProduk kategori={currentProduct.category} />

      {/* Header Section */}
      <div className="bg-[#0B203F] text-white text-center py-2 font-light text-[1.5rem] tracking-wide">{currentProduct.category.toUpperCase()}</div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto ps-2 pe-2 py-8">
        <ProductSidebar />

        <main className="w-full lg:w-5/6 flex flex-col">
          {/* Product Images and Details */}
          <div className="relative gap-8 mb-22">
            {/* Product Specifications */}
            <div className="w-auto lg:w-1/2 space-y-6 px-6">
              <section className="mb-5 mt-5">
                <div className="w-fit bg-[#d5def4] rounded-br-lg shadow text-xl italic font-semibold text-[#0B203F] px-4 py-2 mb-4">{currentProduct.name}</div>
                {/* Spesifikasi Teknis */}
                <section className="mb-10">
                  <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI TEKNIS :</h2>
                  <ul className="list-disc pl-8 text-sm text-gray-700 space-y-1">
                    {currentProduct.specifications?.map((item, index) => (
                      <li key={index}>{item.value}</li>
                    ))}
                  </ul>
                </section>

                {/* Spesifikasi Sandstein */}
                {/* <section className="mb-15">
    <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI TEKNIS SANDSTEIN :</h2>
    <ul className="list-disc pl-8 text-sm text-gray-700 space-y-1">
      {currentProduct.technicalSpecs?.map((item, index) => (
        <li key={index}>{item.value}</li>
      ))}
    </ul>
  </section> */}
                <div className="w-[63rem] max-h-[600px] overflow-y-auto rounded border border-gray-300">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-[#0B203F] z-20 text-white">
                      <tr className="bg-[#0B203F] text-white">
                        <th className="border border-gray-300 px-4 py-2 text-center w-60">Gambar</th>
                        <th className="border border-gray-300 px-4 py-2 text-center w-60">Penampang</th>
                        <th className="border border-gray-300 px-4 py-2 text-center w-30">Produk</th>
                        <th className="border border-gray-300 px-4 py-2 text-center w-40">Dimensi</th>
                        <th className="border border-gray-300 px-4 py-2 text-center w-20">Berat</th>
                        {/* <th className="border border-gray-300 px-4 py-2 text-center w-20">Warna</th> */}
                        <th className="border border-gray-300 px-4 py-2 text-center w-30">Pemakaian</th>
                        {/* <th className="border border-gray-300 px-4 py-2 text-center w-20">Aplikasi</th> */}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {activeItems.map((product) => {
                        const dimensions = product.specifications
                          .find((spec) => spec.label === "Dimensi" || spec.label === "Ukuran")
                          ?.value.split("/")
                          .map((w) => w.trim()) || ["-"];
                        const weights = product.specifications
                          .find((spec) => spec.label === "Berat")
                          ?.value.split("/")
                          .map((w) => w.trim()) || ["-"];
                        const thicknesses = product.specifications
                          .find((spec) => spec.label === "Tebal")
                          ?.value.split("/")
                          .map((t) => t.trim()) || ["-"];
                        // const color = product.specifications.find(spec => spec.label === 'Warna')?.value || '-';
                        const usage = product.specifications
                          .find((spec) => spec.label === "Pemakaian")
                          ?.value.split(":")
                          .map((t) => t.trim()) || ["-"];
                        // const application = product.specifications.find(spec => spec.label === 'Aplikasi');
                        const bestSellerIcon = product.specifications.find((spec) => spec.label === "Best Seller" && spec.icon)?.icon || product.specifications.find((spec) => spec.label === "New Product" && spec.icon)?.icon;

                        return (
                          <React.Fragment key={product.id}>
                            {weights.map((weight, i) => (
                              <tr key={`${product.id}-${i}`} className="hover:bg-gray-50">
                                {i === 0 ? (
                                  <>
                                    {/* Thumbnail gallery shoppe style*/}
                                    {/* <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2">
  <div className="flex flex-col items-center gap-2">
    <div className="relative w-40 h-40 mx-auto">
      <Image
        src={product.thumbnails[activeThumbnails[product.id] || 0].thumbImage}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
    
    <div className="flex flex-wrap justify-center gap-1 mt-2">
      {product.thumbnails.map((thumbnail, index) => (
        <button 
          key={index}
          onClick={() => handleThumbnailClick(product.id, index)}
          className={`relative w-8 h-8 ${(activeThumbnails[product.id] || 0) === index ? 'ring-2 ring-blue-500' : ''}`}
        >
          <Image
            src={thumbnail.thumbImage}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </div>
  </div>
</td> */}
                                    <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2">
                                      <div className="flex divide-x divide-gray-300">
                                        {/* Hitung jumlah kolom yang dibutuhkan (maksimal 3 kolom) */}
                                        {(() => {
                                          const columnCount = Math.min(3, Math.ceil(product.thumbnails.length / 3));
                                          const itemsPerColumn = Math.ceil(product.thumbnails.length / columnCount);

                                          return Array.from({ length: columnCount }).map((_, col) => {
                                            const startIndex = col * itemsPerColumn;
                                            const endIndex = startIndex + itemsPerColumn;
                                            const colItems = product.thumbnails.slice(startIndex, endIndex);

                                            return (
                                              <div key={col} className="flex-1 px-2 first:pl-0 last:pr-0">
                                                <div className="space-y-2">
                                                  {colItems.map((thumbnail, index) => (
                                                    <div key={startIndex + index} className="relative w-30 h-30 mx-auto">
                                                      <Image src={thumbnail.thumbImage} alt={`${product.name} - ${startIndex + index + 1}`} fill className="object-contain" />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          });
                                        })()}
                                      </div>
                                    </td>
                                    <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2">
                                      <div className="flex divide-x divide-gray-300">
                                        {/* Hitung jumlah kolom yang dibutuhkan (maksimal 3 kolom) */}
                                        {(() => {
                                          const columnCount = Math.min(3, Math.ceil(product.thumbnails.length / 3));
                                          const itemsPerColumn = Math.ceil(product.thumbnails.length / columnCount);

                                          return Array.from({ length: columnCount }).map((_, col) => {
                                            const startIndex = col * itemsPerColumn;
                                            const endIndex = startIndex + itemsPerColumn;
                                            const colItems = product.thumbnails.slice(startIndex, endIndex);

                                            return (
                                              <div key={col} className="flex-1 px-2 first:pl-0 last:pr-0">
                                                <div className="space-y-2">
                                                  {colItems.map((thumbnail, index) => (
                                                    <div key={startIndex + index} className="relative w-30 h-30 mx-auto">
                                                      <Image src={thumbnail.penampangImage} alt={`${product.name} - ${startIndex + index + 1}`} fill className="object-contain" />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          });
                                        })()}
                                      </div>
                                    </td>
                                    <td rowSpan={weights.length} className="relative border border-gray-300 px-4 py-2 font-medium text-center">
                                      <div className="flex flex-col justify-center items-center relative">
                                        {bestSellerIcon && (
                                          <img
                                            src={bestSellerIcon}
                                            alt="Best Seller"
                                            className="absolute -top-12 w-12 h-12" // Sesuaikan ukuran dan posisi
                                          />
                                        )}
                                        {product.name}
                                      </div>
                                    </td>
                                    {/* <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2 text-center">
                  {dimensions}
                </td> */}
                                  </>
                                ) : null}
                                <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2 text-center">
                                  {dimensions}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{weight}</td>
                                {/* {i === 0 ? (
              <td rowSpan={weights.length} className="border border-gray-300 px-4 py-2 text-center">
                {color}
              </td>
            ) : null} */}
                                <td className="border border-gray-300 px-4 py-2 text-center">{usage[i] || usage[0]}</td>
                                {/* <td className="border border-gray-300 px-4 py-2 text-center relative">
  {application ? (
    <div className="flex gap-1 justify-center">
      {Array.isArray(application.icons?.[0]) 
        ? application.icons[i]?.map((icon, iconIndex) => (
            <div 
              key={iconIndex}
              className="relative"
              onMouseEnter={(e) => {
                setHoveredIcon(icon);
                const rect = e.currentTarget.getBoundingClientRect();
                setHoverPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.top
                });
              }}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {icon === 'pedestrian' ? (
                <img src="/icons/pedestrian.png" alt="Pedestrian" className="w-2 h-4" />
              ) : icon === 'car' ? (
                <img src="/icons/car.png" alt="Car" className="w-4 h-4" />
              ) : icon === 'garage' ? (
                <img src="/icons/garage.png" alt="garage" className="w-4 h-4" />
              ): icon === 'lorry' ? (
                <img src="/icons/lorry.png" alt="lorry" className="w-4 h-4" />
              ) : icon === 'fuso' ? (
                <img src="/icons/fuso.png" alt="fuso" className="w-4 h-4" />
              ) : icon === 'factory' ? (
                <img src="/icons/factory.png" alt="factory" className="w-4 h-4" />
              ) : icon === 'harbor' ? (
                <img src="/icons/harbor.png" alt="harbor" className="w-4 h-4" />
              ) : null}
              
              {hoveredIcon === icon && (
                <div 
                  className="fixed z-50"
                  style={{
                    left: `${hoverPosition.x}px`,
                    top: `${hoverPosition.y}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <ApplicationModal applicationType={icon} />
                </div>
              )}
            </div>
          ))
        : application.icons?.map((icon, iconIndex) => (
            <div 
              key={iconIndex}
              className="relative"
              onMouseEnter={(e) => {
                setHoveredIcon(icon);
                const rect = e.currentTarget.getBoundingClientRect();
                setHoverPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.top
                });
              }}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {icon === 'pedestrian' ? (
                <img src="/icons/pedestrian.png" alt="Pedestrian" className="w-2 h-4" />
              ) : icon === 'car' ? (
                <img src="/icons/car.png" alt="Car" className="w-4 h-4" />
              ) : null}
              
              {hoveredIcon === icon && (
                <div 
                  className="fixed z-50"
                  style={{
                    left: `${hoverPosition.x}px`,
                    top: `${hoverPosition.y}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <ApplicationModal applicationType={icon} />
                </div>
              )}
            </div>
          ))
      }
    </div>
  ) : '-'}
</td> */}
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {currentProduct.installationNote && <p className="italic mt-4 pl-4">{currentProduct.installationNote}</p>}
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
              <div className="pl-1">
                <a href="/informasi/katalog" className="w-fit bg-[#0B203F] text-white py-2 px-4 rounded hover:bg-[#1c355f] flex items-center gap-2">
                  <FaCalculator className="text-lg" />
                  Unduh Brosur
                </a>
              </div>
            </div>
          </div>

          {/* Product Types Slider */}
          {/* <section className="mt-12">
            <h2 className="text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-2">PRODUK PAVING BLOCK LAINNYA :</h2>
            
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
