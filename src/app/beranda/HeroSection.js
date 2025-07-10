'use client';
import FadeBannerSlider from './FadeBannerSlider';
import '@/app/style/HeroSection.css'

export default function HeroSection({ 
  slides = [], 
  currentSlide = 0,
  autoPlayDelay = 5000,
  onSlideChange,
  onSlideClick // Tambahkan prop ini
}) {
  if (!slides.length) return null;

  return (
    <div className="parent-container relative w-full h-[400px] md:h-[823px] overflow-hidden mt-[3rem] md:mt-[5.8rem] mb-[-4rem] md:mb-[-14rem]">
      <FadeBannerSlider 
        slides={slides}
        currentSlide={currentSlide}
        autoPlayDelay={autoPlayDelay}
        onSlideChange={onSlideChange}
        onSlideClick={onSlideClick} // Teruskan prop ke FadeBannerSlider
      />
    </div>
  );
}