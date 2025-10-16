'use client';
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../style/FadeBannerSlider.module.css';

const FadeBannerSlider = ({ 
  slides = [], 
  currentSlide = 0,
  autoPlayDelay = 5000,
  onSlideChange,
  onSlideClick
}) => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      // Gunakan breakpoint yang sama dengan CSS Anda (640px)
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile(); // Set initial value
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (sliderRef.current && hasMounted) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide, hasMounted]);

  const handleSlideClick = (url) => {
    setIsPlaying(false);
    onSlideClick?.(url);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const settings = {
    ref: sliderRef,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: autoPlayDelay,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    afterChange: onSlideChange,
  };

  if (!slides.length || !hasMounted) return null;

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {slides.map((slide, index) => {
          // Gunakan mobileImage HANYA jika isMobile=true DAN mobileImage tersedia
          // Jika tidak mobile atau tidak ada mobileImage, gunakan image desktop
          const imageSrc = isMobile && slide.mobileImage 
            ? slide.mobileImage 
            : slide.image;
          
          const imageWidth = 1920;
          const imageHeight = isMobile ? 400 : 823; // Sesuaikan dengan kebutuhan

          return (
            <div key={`${slide.id || slide.image}-${index}`} className={styles.slide}>
              <div 
                className={styles.imageContainer}
                onClick={() => handleSlideClick(slide.url)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image 
                  src={imageSrc}
                  alt={slide.alt || slide.title || 'Banner'} 
                  width={imageWidth}
                  height={imageHeight}
                  className={`${styles.bannerImage} cursor-pointer`}
                  priority={index === 0}
                  sizes="100vw"
                />
                
                {slide.location && (
                  <motion.div 
                    className={styles.locationOverlay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: isHovered ? 1.05 : 1 
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <motion.p
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className={styles.locationText}
                    >
                      {slide.location}
                    </motion.p>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default FadeBannerSlider;