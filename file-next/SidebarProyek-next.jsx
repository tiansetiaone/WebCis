'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function SidebarProyek({ 
  activeItem, 
  setActiveItem,
  activeSubItem,
  setActiveSubItem,
  setActiveView
}) {
  const [showSubmenu, setShowSubmenu] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('autoExpand') === 'true';
    }
    return false;
  });
  const [showNeoSubmenu, setShowNeoSubmenu] = useState(false);
  
  const mainProducts = ['Concrete Roof', 'Paving Block', 'Concrete Block', 'Concrete Pipe'];
  const subProducts = ['Neo', 'Victoria', 'Dual Slate', 'Floral', 'Excellent', 'Majestic', 'Oriental', 'New Royal'];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('expand') === 'true') {
      setShowSubmenu(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleMainItemClick = (item) => {
    setActiveItem(item);
    setActiveSubItem(null);
    setActiveView('default');

    if (item === 'Semua Produk') {
      setShowSubmenu(false);
      setShowNeoSubmenu(false);
    } else if (item === 'Concrete Roof') {
      setShowSubmenu(!showSubmenu);
    } else {
      setShowSubmenu(false);
      setShowNeoSubmenu(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
    if (subItem === 'Neo') {
      setActiveView('neo');
      setShowNeoSubmenu(true);
    } else {
      setActiveView('default');
      setShowNeoSubmenu(false);
    }
  };

  return (
    <aside className="w-full lg:w-1/6 lg:sticky lg:top-[6.5rem] lg:h-[calc(100vh-6.5rem)] lg:overflow-y-auto">
      <h1 className="text-lg font-medium mb-4 pb-2">Produk</h1>
      <ul className="space-y-2 text-sm">
        {/* Semua Produk */}
        <li>
          <Link
            href="/proyek"
            onClick={() => handleMainItemClick('Semua Produk')}
            className={`block w-full text-left px-2 cursor-pointer ${
              activeItem === 'Semua Produk'
                ? 'text-[#2957A4] border-l-2 border-[#2957A4] font-semibold'
                : 'text-gray-700 font-medium hover:text-[#2957A4]'
            }`}
          >
            Semua Produk
          </Link>
        </li>
        
        {mainProducts.map((item) => (
          <li key={item}>
            {item === 'Concrete Roof' ? (
              <>
                <button
                  onClick={() => handleMainItemClick(item)}
                  className={`w-full text-left px-2 cursor-pointer hover:text-[#2957A4] ${
                    activeItem === item && showSubmenu
                      ? 'text-[#2957A4] border-l-2 border-[#2957A4] font-semibold'
                      : 'text-gray-700 font-medium hover:text-[#3a4557]'
                  }`}
                >
                  {item}
                </button>

                {/* Submenu Concrete Roof */}
                {showSubmenu && activeItem === 'Concrete Roof' && (
                  <ul className="ml-4 mt-2 space-y-3 text-gray-600 text-xs border-l border-gray-300 pl-2 mb-4">
                    {subProducts.map((sub) => (
                      <li key={sub}>
                        {sub === 'Neo' ? (
                          <button
                            onClick={() => handleSubItemClick(sub)}
                            className={`flex items-center w-full text-left cursor-pointer gap-2 ${
                              activeSubItem === sub
                                ? 'text-[#0B203F] font-semibold'
                                : 'text-[#2957A4] font-medium hover:text-[#0B203F]'
                            }`}
                          >
                            <span>{sub}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSubItemClick(sub)}
                            className={`block cursor-pointer ${
                              activeSubItem === sub
                                ? 'text-[#2957A4] font-medium'
                                : 'hover:text-[#2957A4]'
                            }`}
                          >
                            {sub}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <button
                onClick={() => handleMainItemClick(item)}
                className={`w-full text-left px-2 cursor-pointer hover:text-[#2957A4] ${
                  activeItem === item
                    ? 'text-[#2957A4] border-l-2 border-[#2957A4] font-semibold'
                    : 'text-gray-700 hover:text-[#3a4557]'
                }`}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}