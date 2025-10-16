"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from '../style/styles.module.css';
import '@/app/style/BannerProduk.css';


export default function BannerProduk({ kategori }) {
  const searchParams = useSearchParams();
  const product = searchParams.get('product');
  const [isHovered, setIsHovered] = useState(false);

  // Tentukan sumber media berdasarkan kategori dan produk
  const getMediaSource = () => {
    // Jika ada parameter product (sub product)
    if (product) {
      switch (product) {
        // Concrete Roof Products
        case "Neo Solar System":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Banner Neo.mp4",
            location: 'Neo Solar System' 
          };
        case "Dual Slate":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Dual Slate' 
          };
        case "Floral":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Floral' 
          };
        case "Victoria Series":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Victoria Series' 
          };
        case "Onyx":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Onyx' 
          };
        case "Multiline":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Multiline' 
          };
        case "Slate":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Slate' 
          };
        case "Pine":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
            location: 'Pine' 
          };
        case "Classic":
          return { 
            type: "image", 
            src: "/images/banners/sub-products/Spanduk web Cisangkan.png",
            location: 'Classic' 
          };
        case "New Royal":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/banner genteng gelombang.mp4",
            location: 'New Royal' 
          };
        case "Oriental":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/banner genteng gelombang.mp4",
            location: 'Oriental' 
          };
        case "Majestic":
          return { 
            type: "video", 
            src: "/images/banners/sub-products/banner genteng gelombang.mp4",
            location: 'Majestic' 
          };

        // Paving Block Products
        case "Square Set":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Square Set' 
          };
        case "Classic Set":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Classic Set' 
          };
        case "Altstadt":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Altstadt' 
          };
        case "Others":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Others' 
          };
        case "Guiding Pave":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Guiding Pave' 
          };
        case "Grass Block":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Grass Block' 
          };
        case "Concrete Tile":
          return { 
            type: "image", 
            src: "/images/BannerPb.jpg",
            location: 'Concrete Tile' 
          };
        case "Guiding Tiles":
          return { 
            type: "image", 
            src: "/images/BannerPb.jpg",
            location: 'Guiding Tiles' 
          };
        case "Kanstein Wet Process":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Kanstein Wet Process' 
          };
        case "Kanstein Dry Process":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Kanstein Dry Process' 
          };
        case "Tali Air":
          return { 
            type: "image", 
            src: "/images/banner pavingblock.jpg",
            location: 'Tali Air' 
          };

        // Concrete Block Products
        case "Concrete Block":
          return { 
            type: "image", 
            src: "/images/BannerCb.jpg",
            location: 'Concrete Block' 
          };
        case "Ventilation Block":
          return { 
            type: "image", 
            src: "/images/banner roster.jpg",
            location: 'Ventilation Block' 
          };
        case "Ventilation Block 3D":
          return { 
            type: "image", 
            src: "/images/banner roster.jpg",
            location: 'Ventilation Block 3D' 
          };

        // Utility Products
        case "Concrete Pipe":
          return { 
            type: "image", 
            src: "/images/banner concrete pipe.jpg",
            location: 'Concrete Pipe' 
          };
        case "Ciswell":
          return { 
            type: "image", 
            src: "/images/banner ciswell.png",
            location: 'Ciswell' 
          };

        // Fallback untuk sub produk yang tidak memiliki banner khusus
        default:
          const mainBanner = getMainProductBanner(kategori);
          return {
            ...mainBanner,
            location: ''
          };
      }
    }
    
    // Jika tidak ada parameter product (main product)
    const mainBanner = getMainProductBanner(kategori);
    return {
      ...mainBanner,
      location: ''
    };
  };

  // Fungsi untuk mendapatkan banner main product
  const getMainProductBanner = (kategori) => {
    switch (kategori) {
      case "Concrete Roof":
        return {
          type: "video",
          src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4",
        };
      case "Paving Block":
        return {
          type: "image",
          src: "/images/banner pavingblock.jpg",
        };
      case "Concrete Block":
        return {
          type: "image",
          src: "/images/BannerCb.jpg",
        };
      case "Utility":
        return {
          type: "image",
          src: "/images/banner concrete pipe.jpg",
        };
      default:
        return {
          type: "image",
          src: "/images/Spanduk web Cisangkan.png",
        };
    }
  };

  const media = getMediaSource();

  return (
    <div 
      className="image-container relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {media.type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        >
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image 
          src={media.src} 
          alt={`Banner ${product || kategori}`} 
          fill
          className="w-full h-full object-cover object-center" 
          priority 
          quality={100}
          sizes="100vw"
        />
      )}
      
      {/* Location Overlay */}
      {media.location && (
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
            {media.location}
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}