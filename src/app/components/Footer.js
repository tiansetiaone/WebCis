import {
    FaInstagram,
    FaFacebookF,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#0B203F] text-white px-6 py-8">
            {/* Mobile View */}
             <div className="md:hidden flex flex-col items-center text-center">
                <div className="flex-col flex justify-center gap-3 mb-6">
                    <div className="relative h-40 w-full">
                        <Image 
                            src="/logo50.png" 
                            alt="50th Anniversary" 
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                    <div className="relative h-8 w-24">
                        <Image 
                            src="/logo-sertifikasi.png" 
                            alt="Sertifikasi" 
                            fill
                            style={{ 
                                objectFit: 'contain',
                                backgroundColor: 'white',
                                borderRadius: '9px',
                                padding: '0.25rem'
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex justify-center gap-10 text-xs mb-6">
                    <FaInstagram className="bg-white text-black rounded-full box-border size-6 p-1" />
                    <FaFacebookF className="bg-white text-black rounded-full box-border size-6 p-1" />
                    <FaTiktok className="bg-white text-black rounded-full box-border size-6 p-1" />
                    <FaYoutube className="bg-white text-black rounded-full box-border size-6 p-1" />
                </div>
                
                <div className="text-xs mb-4">
                    © 2025 Cisangkan. All Rights Reserved
                </div>
                
                <a href="#" className="text-xs">Privacy Policy</a>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block max-w-8xl mx-auto px-15 ">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                    {/* Logo & Sertifikasi */}
                    <div className="md:w-1/3">
<div className="relative w-40 2xl:w-60 h-auto" style={{ height: 'auto' }}>
                            <Image 
                                src="/logo50.png" 
                                alt="50th Anniversary" 
                                width={160}
                                height={160}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                        <div className="relative w-32 2xl:w-52 h-auto ml-4" style={{ height: 'auto' }}>
                            <Image 
                                src="/logo-sertifikasi.png" 
                                alt="Sertifikasi" 
                                width={160}
                                height={160}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    padding: '0 0.25rem'
                                }}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-10 text-sm md:gap-20 md:text-base 2xl:text-xl 2xl:gap-30">
                        <div>
                            <h3 className="mb-2 text-sm font-bold 2xl:text-xl">Produk</h3>
                            <ul className="space-y-1 text-gray-400 text-[12px] 2xl:text-sm">
<li>
                <Link href="/produk?category=Concrete Roof" className='hover:cursor-pointer'>
                  Concrete Roof
                </Link>
              </li>
<li>
                <Link href="/produk/produk-pv?category=Paving Block" className='hover:cursor-pointer'>
                  Paving Block
                </Link>
              </li>
  <li>
                <Link href="/produk/produk-pv?category=Concrete Block" className='hover:cursor-pointer'>
                  Concrete Block
                </Link>
              </li>
<li>
                <Link href="/produk/produk-pv?category=Utility" className='hover:cursor-pointer'>
                  Utility
                </Link>
              </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-bold 2xl:text-xl">Perusahaan</h3>
                            <ul className="space-y-1 text-gray-400 text-[12px] 2xl:text-sm">
                                <li>
                <Link href="/perusahaan/tentang" className='hover:cursor-pointer'>
                Tentang Kami
                </Link>
                </li>
                                <li>
                <Link href="/perusahaan/sejarah" className='hover:cursor-pointer'>
                                    Sejarah
                                    </Link>
                                    </li>
                                <li>
                <Link href="/perusahaan/inovasi" className='hover:cursor-pointer'>
                                    Inovasi
                                    </Link>
                                    </li>
                               <li>
                <Link href="/perusahaan/karir" className='hover:cursor-pointer'>
                                    Karir
                                    </Link>
                                    </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-bold 2xl:text-xl">Informasi</h3>
                            <ul className="space-y-1 text-gray-400 text-[12px] 2xl:text-sm">
                               <li>
                <Link href="/informasi/sertifikasi" className='hover:cursor-pointer'>
                                    Sertifikasi
                                    </Link>
                                    </li>
                                <li>
                <Link href="/informasi/katalog" className='hover:cursor-pointer'>
                                    Katalog
                                    </Link>
                                    </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-bold 2xl:text-xl">Berita</h3>
                            <ul className="space-y-1 text-gray-400 text-[12px] 2xl:text-sm">
                                <li>
                <Link href="/blog/artikel" className='hover:cursor-pointer'>
                                    Artikel
                                    </Link>
                                    </li>
                                <li>
                <Link href="/blog/testimoni" className='hover:cursor-pointer'>
                                    Testimoni
                                    </Link>
                                    </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-600" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p className="mb-4 md:mb-0 text-[12px] 2xl:text-sm">
                        © 2025 <span className="text-[12px] text-white">Cisangkan.</span> All Rights Reserved
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white text-[12px] 2xl:text-sm">Privacy Policy</a>
                        <div className="flex gap-4 2xl:gap-6 text-xs">
                            <a href="https://www.instagram.com/pt_cisangkan/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <FaInstagram className="cursor-pointer bg-white text-black rounded-full box-border size-5 p-1 2xl:size-7 hover:bg-blue-100 transition-colors" />
                            </a>
                            <a href="https://www.facebook.com/cisangkan#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <FaFacebookF className="cursor-pointer bg-white text-black rounded-full box-border size-5 p-1 2xl:size-7 hover:bg-blue-100 transition-colors" />
                            </a>
                            <a href="https://www.tiktok.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <FaTiktok className="cursor-pointer bg-white text-black rounded-full box-border size-5 p-1 2xl:size-7 hover:bg-blue-100 transition-colors" />
                            </a>
                            <a href="https://www.youtube.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <FaYoutube className="cursor-pointer bg-white text-black rounded-full box-border size-5 p-1 2xl:size-7 hover:bg-blue-100 transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}