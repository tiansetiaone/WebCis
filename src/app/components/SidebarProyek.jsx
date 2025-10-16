'use client';
import Link from "next/link";
import { useState } from 'react';

export default function SidebarProyek({ 
  activeItem, 
  setActiveItem,
  activeSubItem,
  setActiveSubItem
}) {
  const [open, setOpen] = useState(false);

  const mainProducts = [
    { name: 'Semua Produk', value: 'Semua Produk' },
    { name: 'Concrete Roof', value: 'Concrete Roof'},
    { name: 'Paving Block', value: 'Paving Block' },
    { name: 'Concrete Block', value: 'Concrete Block' },
    { name: 'Concrete Pipe', value: 'Concrete Pipe' }
  ];

  const handleItemClick = (itemValue) => {
    setActiveItem(itemValue);
    setActiveSubItem(null);
  };

  return (
    <aside className="w-full lg:w-1/6 lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
      
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-medium mb-4 pb-2 2xl:text-xl">Produk</h1>
        <ul className="space-y-2 text-sm 2xl:text-base">
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
      </div>


      <div className="py-4 mt-[-4rem] mb-[2rem]">
      {/* ===== Mobile Dropdown ===== */}
      <div className="lg:hidden flex flex-col text-[1rem] font-light tracking-wide">
  {/* Judul utama menu */}
  <button
    onClick={() => setOpen(!open)}
    className="flex justify-between items-center px-4 py-3 bg-[#F2F2F2] text-[#2D5DA6] font-bold border-b"
  >
    {/* tampilkan menu aktif atau default Produk */}
    <span>{activeItem || "Produk"}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 transform transition-transform ${
        open ? "rotate-180 text-[#2D5DA6]" : "rotate-0 text-[#2D5DA6]"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Dropdown list */}
  {open && (
    <div className="flex flex-col px-6 py-2 space-y-2">
      {mainProducts.map((item) =>
        item.value === "Semua Produk" ? (
          <Link
            key={item.name}
            href="/proyek"
            onClick={() => {
              handleItemClick("Semua Produk");
              setOpen(false);
            }}
            className={`block cursor-pointer ${
              activeItem === "Semua Produk"
                ? "text-[#2957A4] font-semibold"
                : "text-gray-700 hover:text-[#2D5DA6]"
            }`}
          >
            {item.name}
          </Link>
        ) : (
          <button
            key={item.name}
            onClick={() => {
              handleItemClick(item.value);
              setOpen(false);
            }}
            className={`text-left cursor-pointer ${
              activeItem === item.value
                ? "text-[#2957A4] font-semibold"
                : "text-gray-700 hover:text-[#2D5DA6]"
            }`}
          >
            {item.name}
          </button>
        )
      )}
    </div>
  )}
</div>
            </div>
    </aside>
  );
}
