'use client';
import FadeBannerSlider from './FadeBannerSlider';
import '@/app/style/HeroSection.css';
import { motion } from 'framer-motion';

export default function HeroSection({ 
  slides = [], 
  currentSlide = 0,
  autoPlayDelay = 5000,
  onSlideChange,
  onSlideClick
}) {
  if (!slides.length) return null;

  return (
    <section className="hero-section">
      <div className="parent-container">
        <FadeBannerSlider 
          slides={slides}
          currentSlide={currentSlide}
          autoPlayDelay={autoPlayDelay}
          onSlideChange={onSlideChange}
          onSlideClick={onSlideClick}
        />
      </div>
    </section>
  );
}