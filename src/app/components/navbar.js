"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBell, FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import SearchBar from "./SearchBar";


export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState("Ind");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fungsi untuk mengecek route aktif
  const isActive = (href) => {
    // Handle route dengan query params
    const basePath = href.split("?")[0];

    // Cek untuk route produk dan submenu
    if (href === "/produk" && (pathname.startsWith("/produk") || pathname.startsWith("/proyek/proyek-a"))) {
      return true;
    }

    // Cek exact match atau nested route
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const reloadHome = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = (e) => {
    e.stopPropagation();
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const closeMobileDropdown = () => {
    setMobileDropdownOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className={`bg-white fixed top-0 w-full z-[50] transition-all duration-300 ${scrolled ? "shadow-md border-b border-gray-200" : "shadow-none"}`}>
      <div className="flex items-center justify-between px-10 py-4 2xl:px-14">
        {/* Logo dengan fungsi reload */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={reloadHome}>
          <Image src="/logo.png" alt="Cisangkan Logo" width={200} height={200} className="hover:opacity-80 transition-opacity 2xl:w-60" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 text-gray-700 text-sm font-medium 2xl:gap-2 2xl:text-xl">
          <li>
            <Link href="/">
              <button onClick={scrollToTop} className={`px-3 py-1 rounded-full cursor-pointer ${isActive("/") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
                Beranda
              </button>
            </Link>
          </li>

          {/* Dropdown Produk - HOVER */}
          <li className="relative group">
            <button className={`px-3 py-1 flex items-center gap-1 rounded-full ${isActive("/produk") || isActive("/proyek/proyek-a") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
              Produk <FaChevronDown size={10} />
            </button>
            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <li>
                <Link href="/produk?category=Concrete Roof" onClick={() => sessionStorage.setItem("autoExpand", "true")} className={`block px-4 py-2 ${isActive("/produk?category=Concrete Roof") ? "bg-gray-100 text-[#0F1E3E] font-medium" : "hover:bg-gray-100"}`}>
                  Concrete Roof
                </Link>
              </li>
              <li>
  <Link 
    href="/produk/produk-pv?category=Paving Block" 
    onClick={() => sessionStorage.setItem("autoExpand", "true")} 
    className={`block px-4 py-2 ${isActive("/produk/produk-pv?category=Paving Block") ? "bg-gray-100 text-[#0F1E3E] font-medium" : "hover:bg-gray-100"}`}
  >
    Paving Block
  </Link>
</li>
<li>
  <Link 
    href="/produk/produk-pv?category=Concrete Block" 
    onClick={() => sessionStorage.setItem("autoExpand", "true")} 
    className={`block px-4 py-2 ${isActive("/produk/produk-pv?category=Concrete Block") ? "bg-gray-100 text-[#0F1E3E] font-medium" : "hover:bg-gray-100"}`}
  >
    Concrete Block
  </Link>
</li>
<li>
  <Link 
    href="/produk/produk-pv?category=Utility" 
    onClick={() => sessionStorage.setItem("autoExpand", "true")} 
    className={`block px-4 py-2 ${isActive("/produk/produk-pv?category=Utility") ? "bg-gray-100 text-[#0F1E3E] font-medium" : "hover:bg-gray-100"}`}
  >
    Utility
  </Link>
</li>
            </ul>
          </li>

          <li>
            <Link href="/perusahaan/tentang" className={`rounded-full px-3 py-2 ${isActive("/perusahaan") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
              Perusahaan
            </Link>
          </li>

          <li>
            <Link href="/informasi/sertifikasi" className={`px-3 py-2 rounded-full ${isActive("/informasi") ? "bg-[#0F1E3E] text-white" : "hover:bg-[rgb(15,30,62)] hover:text-white"}`}>
              Informasi
            </Link>
          </li>

          <li>
            <Link href="/proyek" className={`px-3 py-2 rounded-full ${isActive("/proyek") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
              Galeri
            </Link>
          </li>

          <li>
            <Link href="/blog/artikel" className={`px-4 py-2 rounded-full ${isActive("/blog") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
              Berita
            </Link>
          </li>

          <li>
            <Link href="/kontak/store" className={`px-3 py-2 rounded-full ${isActive("/kontak") ? "bg-[#0F1E3E] text-white" : "hover:bg-[#0F1E3E] hover:text-white"}`}>
              Kontak
            </Link>
          </li>
        </ul>

{/* Right Side - Diperbarui */}
        <div className="hidden lg:flex items-center space-x-4 mr-4 text-gray-600 text-sm 2xl:text-xl">
          <div>
            <span className={`cursor-pointer ${language === "Eng" ? "text-black font-normal" : "text-gray-400"}`} onClick={() => setLanguage("Eng")}>
              Eng
            </span>
            {" / "}
            <span className={`cursor-pointer ${language === "Ind" ? "text-black font-bold" : "text-gray-400"}`} onClick={() => setLanguage("Ind")}>
              Ind
            </span>
          </div>
          <SearchBar /> {/* Ganti FaSearch dengan komponen SearchBar */}
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>{menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
        </div>
      </div>

      {/* Mobile Menu - Tetap menggunakan behavior klik */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <ul className="flex flex-col space-y-4 text-gray-700 text-sm font-medium">
            <li>
              <Link href="/">
                <button onClick={scrollToTop} className={`px-4 py-2 rounded-full inline-block w-fit ${isActive("/") ? "bg-[#0F1E3E] text-white" : "hover:bg-gray-100"}`}>
                  Beranda
                </button>
              </Link>
            </li>

            {/* Dropdown Produk di Mobile */}
            <li>
              <button onClick={toggleMobileDropdown} className={`flex items-center gap-2 ${isActive("/produk") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`}>
                Produk <FaChevronDown size={10} className={`transform transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li onClick={closeMobileDropdown}>
                    <Link href="/produk?expand=true" className={`block ${isActive("/produk") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`}>
                      Concrete Roof
                    </Link>
                  </li>
                  <li onClick={closeMobileDropdown}>
                    <a href="#" className={`block ${isActive("/paving-block") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`}>
                      Paving Block
                    </a>
                  </li>
                  <li onClick={closeMobileDropdown}>
                    <a href="#" className={`block ${isActive("/concrete-block") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`}>
                      Concrete Block
                    </a>
                  </li>
                  <li onClick={closeMobileDropdown}>
                    <a href="#" className={`block ${isActive("/concrete-pipe") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`}>
                      Concrete Pipe
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/perusahaan/tentang" className={`block ${isActive("/perusahaan") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`} onClick={closeMobileDropdown}>
                Perusahaan
              </Link>
            </li>
            <li>
              <Link href="/showroom/store" className={`block ${isActive("/showroom") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`} onClick={closeMobileDropdown}>
                Showroom
              </Link>
            </li>
            <li>
              <Link href="/proyek" className={`block ${isActive("/proyek") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`} onClick={closeMobileDropdown}>
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/blog/artikel" className={`block ${isActive("/blog") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`} onClick={closeMobileDropdown}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/kontak" className={`block ${isActive("/kontak") ? "text-[#0F1E3E] font-medium" : "hover:text-black"}`} onClick={closeMobileDropdown}>
                Kontak Kami
              </Link>
            </li>

            <div className="flex items-center space-x-4 mt-4 text-gray-600">
              <FaSearch className="cursor-pointer" />
            </div>
<div className="pt-2">
            <span className={`cursor-pointer ${language === "Eng" ? "text-black font-normal" : "text-gray-400"}`} onClick={() => setLanguage("Eng")}>
              Eng
            </span>
            {" / "}
            <span className={`cursor-pointer ${language === "Ind" ? "text-black font-bold" : "text-gray-400"}`} onClick={() => setLanguage("Ind")}>
              Ind
            </span>
          </div>
          </ul>
        </div>
      )}
    </nav>
  );
}