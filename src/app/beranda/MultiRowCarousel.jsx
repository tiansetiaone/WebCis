'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MultiRowCarousel = () => {
  const sliderRef = useRef(null);

  // Sample image data - replace with your actual images
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/sample${(i % 6) + 1}.jpg`, // Using 6 sample images
    alt: `Sample ${i + 1}`,
    title: `Project ${i + 1}`,
    description: `Description for project ${i + 1}`
  }));

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Next"
    >
      <FaChevronRight className="text-lg" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Previous"
    >
      <FaChevronLeft className="text-lg" />
    </button>
  );

  // Slick Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Projects</h2>
      
      <div className="relative px-10"> {/* Added padding for arrows */}
        <Slider ref={sliderRef} {...settings}>
          {images.map((image) => (
            <div key={image.id} className="px-2">
              <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-semibold text-white">{image.title}</h3>
                  <p className="text-gray-200 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </div>
    </div>
  );
};

export default MultiRowCarousel;