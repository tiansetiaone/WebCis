'use client';;
import Image from 'next/image';
import { useRef } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa';


export default function Kontak() {
  const modalRef = useRef(null);



  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
      <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
        <Image
          src="/images/kontak.jpg"
          alt="Produk Genteng Cisangkan"
          width={1764}
          height={460}
          className="w-full h-full object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
        />
        <div className="absolute inset-0 flex items-end pb-6 sm:pb-8 md:pb-12 lg:items-center lg:justify-center lg:pb-0 px-4 sm:px-6">
        </div>
      </div>

      {/* Main Content */}
    <section className="max-w-6xl mx-auto mt-12 px-6 sm:px-12 text-sm sm:text-base mb-20">
            <h2 className="text-xl sm:text-xl font-semibold leading-snug border-l-4 border-[#0B203F] pl-4 uppercase mb-5">Kontak Kami</h2>
      <p className="text-sm text-justify">
        Kami selalu berusaha untuk memberikan pelayanan yang terbaik, mohon kirimkan informasi dan saran Anda kepada Kami
        dengan mengisi formulir dibawah ini.
      </p>

      <div className="bg-gray-100 p-6 sm:p-10 rounded-lg flex flex-col sm:flex-row gap-10 mt-10">
{/* Kontak Info */}
<div className="w-full sm:w-1/3 text-center mx-auto flex flex-col items-center justify-center space-y-10">
  <div>
    <FaPhone className="text-5xl mx-auto mb-2" />
    <h3 className="font-semibold text-lg">Phone</h3>
    <a href="tel:+6251585652262" className="text-sm hover:underline">
      +62xxxxxxxxx
    </a>
    <br />
    <a href="tel:+6251585652262" className="text-sm hover:underline">
      +62xxxxxxxxx
    </a>
  </div>
  <div>
    <FaEnvelope className="text-5xl mx-auto mb-2" />
    <h3 className="font-semibold text-lg">Email</h3>
    <a href="mailto:info@cisangkan.com" className="text-sm hover:underline">
      Email : info@cisangkan.com
    </a>
  </div>
</div>

        {/* Form */}
        <form className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Nama</label>
              <input type="text" placeholder="Nama Anda" className="w-full border rounded px-4 py-2 bg-white" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <input type="email" placeholder="Email Anda" className="w-full border rounded px-4 py-2 bg-white" />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Telepon</label>
            <input type="text" placeholder="Telepon Anda" className="w-full border rounded px-4 py-2 bg-white" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Alamat</label>
            <textarea placeholder="Alamat Anda" className="w-full border rounded px-4 py-2 bg-white" rows="2"></textarea>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Pesan</label>
            <textarea placeholder="Pesan Anda" className="w-full border rounded px-4 py-2 bg-white" rows="3"></textarea>
          </div>

          <div className="flex">
            <button type="submit" className="bg-[#0B203F] text-white px-6 py-2 rounded hover:bg-blue-800 transition">
              Kirim Pesan
            </button>
{/* <a href="https://www.instagram.com/pt_cisangkan/" target="_blank" rel="noopener noreferrer">
  <FaInstagram className="text-pink-500 cursor-pointer text-md hover:scale-110 transition-transform" />
</a>
<a href="https://www.facebook.com/cisangkan#" target="_blank" rel="noopener noreferrer">
  <FaFacebookF className="text-blue-600 cursor-pointer text-md hover:scale-110 transition-transform" />
</a>
<a href="https://www.tiktok.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer">
  <FaTiktok className="text-black cursor-pointer text-md hover:scale-110 transition-transform" />
</a>
<a href="https://www.youtube.com/@pt_cisangkan" target="_blank" rel="noopener noreferrer">
  <FaYoutube className="text-red-600 cursor-pointer text-xl hover:scale-110 transition-transform" />
</a>
<a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
  <FaWhatsapp className="text-green-500 cursor-pointer text-xl hover:scale-110 transition-transform" />
</a> */}
          </div>
        </form>
      </div>
    </section>
    </div>
  );
}