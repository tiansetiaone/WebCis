"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function BannerProduk({ kategori }) {
  const searchParams = useSearchParams();
  const product = searchParams.get('product');

  // Tentukan sumber media berdasarkan kategori dan produk
const getMediaSource = () => {
  // Jika ada parameter product (sub product)
  if (product) {
    switch (product) {
      // Concrete Roof Products
      case "Neo Solar System":
        // return { type: "image", src: "/images/banners/sub-products/Banner Neo Statis.jpg" };
        return { type: "video", src: "/images/banners/sub-products/Banner Neo.mp4" };
      case "Dual Slate":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Floral":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Victoria Series":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Onyx":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Multiline":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Slate":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Pine":
        // return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "Classic":
        return { type: "image", src: "/images/banners/sub-products/Spanduk web Cisangkan.png" };
        // return { type: "video", src: "/images/banners/sub-products/Spanduk web Cisangkan.mp4" };
      case "New Royal":
        // return { type: "image", src: "/images/banners/sub-products/banner genteng gelombang.jpg" };
        return { type: "video", src: "/images/banners/sub-products/banner genteng gelombang.mp4" };
      case "Oriental":
        // return { type: "image", src: "/images/banners/sub-products/banner genteng gelombang.jpg" };
        return { type: "video", src: "/images/banners/sub-products/banner genteng gelombang.mp4" };
      case "Majestic":
        // return { type: "image", src: "/images/banners/sub-products/banner genteng gelombang.jpg" };
        return { type: "video", src: "/images/banners/sub-products/banner genteng gelombang.mp4" };

      // Paving Block Products
      case "Square Set":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Classic Set":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Altstadt":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Others":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Guiding Pave":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Grass Block":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Concrete Tile":
        return { type: "image", src: "/images/BannerPb.jpg" };
      case "Guiding Tiles":
        return { type: "image", src: "/images/BannerPb.jpg" };
      case "Kanstein Wet Process":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Kanstein Dry Process":
        return { type: "image", src: "/images/banner pavingblock.jpg" };
      case "Tali Air":
        return { type: "image", src: "/images/banner pavingblock.jpg" };

      // Concrete Block Products
      case "Concrete Block":
        return { type: "image", src: "/images/BannerCb.jpg" };
      case "Ventilation Block":
        return { type: "image", src: "/images/banner roster.jpg" };
      case "Ventilation Block 3D":
        return { type: "image", src: "/images/banner roster.jpg" };

      // Utility Products
      case "Concrete Pipe":
        return { type: "image", src: "/images/banner concrete pipe.jpg" };
      case "Ciswell":
        return { type: "image", src: "/images/banner ciswell.png" };

      // Fallback untuk sub produk yang tidak memiliki banner khusus
      default:
        return getMainProductBanner(kategori);
    }
  }
  
  // Jika tidak ada parameter product (main product)
  return getMainProductBanner(kategori);
};

  // Fungsi untuk mendapatkan banner main product
  const getMainProductBanner = (kategori) => {
    switch (kategori) {
      case "Concrete Roof":
        return {
          // type: "image",
          // src: "/images/banners/sub-products/Spanduk web Cisangkan.png",
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
    <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
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
    </div>
  );
}