'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const ProductCategory = ({ name, defaultIcon = '/default-icon.png' }) => {
  const [icon, setIcon] = useState(defaultIcon);
  const fileInputRef = useRef(null);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIcon(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border border-gray-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-[#0B203F] hover:border-white hover:border-2">
        <Image
          src={icon}
          alt={name}
          width={56}
          height={56}
          className={`max-h-12 sm:max-h-14 md:max-h-16 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert ${
            icon === defaultIcon ? 'opacity-70' : 'opacity-100'
          }`}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleIconChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute -bottom-2 text-xs bg-blue-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Upload Icon
        </button>
      </div>
      <span className="mt-3 text-sm sm:text-base font-medium">{name}</span>
    </div>
  );
};

export default ProductCategory;