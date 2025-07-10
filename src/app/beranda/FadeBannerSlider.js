'use client';
import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import styles from '../style/FadeBannerSlider.module.css';

const FadeBannerSlider = ({ 
    slides = [], 
    currentSlide = 0,
    autoPlayDelay = 5000,
    onSlideChange,
    onSlideClick // Tambahkan prop baru untuk handle klik
  }) => {
    const sliderRef = useRef(null);
  
    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide);
      }
    }, [currentSlide]);

    // Handler untuk klik slide
    const handleSlideClick = (url) => {
      if (onSlideClick) {
        onSlideClick(url);
      }
    };
  
    const settings = {
      ref: sliderRef,
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: autoPlayDelay,
      fade: true,
      cssEase: 'linear',
      arrows: false,
      pauseOnHover: false,
      afterChange: (index) => onSlideChange(index),
    };
  
    if (!slides.length) return null;

    return (
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div 
                key={slide.id || slide.image} 
                className={styles.slide}
                onClick={() => handleSlideClick(slide.url)} // Tambahkan onClick handler
              >
                <div className={styles.imageContainer}>
                  <Image 
                    src={slide.image} 
                    alt={slide.alt || slide.title || 'Banner'} 
                    width={1765}
                    height={823}
                    className={`${styles.bannerImage} cursor-pointer`} // Tambahkan cursor-pointer
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      );
    };
    
    export default FadeBannerSlider;