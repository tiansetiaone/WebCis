'use client';
import Link from "next/link";
import { useState } from 'react';

export default function SidebarProyek({ 
  activeItem, 
  setActiveItem,
  activeSubItem,
  setActiveSubItem
}) {
  const mainProducts = [
    { name: 'Semua Produk', value: 'Semua Produk' },
    { name: 'Concrete Roof', value: 'Concrete Roof'},
    { name: 'Paving Block', value: 'Paving Block' },
    { name: 'Concrete Block', value: 'Concrete Block' },
    { name: 'Concrete Pipe', value: 'Concrete Pipe' }
  ];

  const handleItemClick = (itemValue, ) => {
    setActiveItem(itemValue);
    setActiveSubItem( null);
  };

  return (
    <aside className="w-full lg:w-1/6 lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
      <h1 className="text-lg font-medium mb-4 pb-2">Produk</h1>
      <ul className="space-y-2 text-sm">
        {mainProducts.map((item) => (
          <li key={item.name}>
            {item.value === 'Semua Produk' ? (
              <Link
                href="/proyek"
                onClick={() => handleItemClick('Semua Produk')}
                className={`block w-full text-left px-2 cursor-pointer ${
                  activeItem === 'Semua Produk'
                    ? 'text-[#2957A4] border-l-2 border-[#2957A4] font-semibold'
                    : 'text-gray-700 font-medium hover:text-[#2957A4]'
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <button
                onClick={() => handleItemClick(item.value)}
                className={`w-full text-left px-2 cursor-pointer hover:text-[#2957A4] ${
                  activeItem === item.value 
                    ? 'text-[#2957A4] border-l-2 border-[#2957A4] font-semibold'
                    : 'text-gray-700 hover:text-[#3a4557]'
                }`}
              >
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}