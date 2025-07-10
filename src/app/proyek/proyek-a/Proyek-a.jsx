'use client';;
import Image from 'next/image';

export default function ProyekA() {

  // Data katalog
  const proyekList = [
    { id: 1, nama: "Proyek 2", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 2, nama: "Proyek 2", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 3, nama: "Proyek 3", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 4, nama: "Proyek 4", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 5, nama: "Proyek 5", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
    { id: 6, nama: "Proyek 6", file: "/images/icon photo.png", tempat:"Nama Proyek - Tempat" },
  ];

  
  // Komponen lokal langsung ditulis di sini
  const HeaderProject = ({ productName, projectName, location }) => {
    return (
      <div>
        {/* Bagian Atas: Nama Produk */}
        <div className="bg-[#0B1F43] py-3">
          <h1 className="text-white text-center text-[1rem] font-semibold tracking-wide uppercase">
            {productName}
          </h1>
        </div>

        {/* Bagian Bawah: Nama Proyek – Lokasi */}
        <div className="bg-[#F2F2F2] py-3">
          <p className="text-[#2D5DA6] text-center text-[1rem] font-medium tracking-wide uppercase">
            {projectName} – {location}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[5.8rem] px-11 bg-white text-slate-800 mb-8">
      {/* Hero Section */}
        <div className="relative w-full aspect-[1764/460] min-h-[180px] sm:min-h-[300px] overflow-hidden">
              <Image
                src="/images/proyek.jpg"
                alt="Banner Proyek"
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
            </div>
      
            {/* Header Project */}
      <HeaderProject
        productName="Paving Block"
        projectName="Alun Alun Kota Depok"
        location="Jawa Barat"
      />

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto ps-6 pe-1 py-8">

      {/* Main Content */}
      <main className="w-full lg:w-5/5 space-y-8">
      <section className="max-w-6xl mx-auto px-6 sm:px-12 text-sm sm:text-base mb-10">
{/* Grid Proyek (sesuai UI) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-black mb-20">
  {proyekList.map((item) => (
    <div
      key={item.id}
      className="border border-[#2957A4] rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-gray-300 w-full aspect-[4/3] flex items-center justify-center">
        <img
          src={item.file}
          alt={item.nama}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ))}
</div>

       {/* Pagination */}
        <div className="flex justify-center items-center gap-2 text-sm border-y border-[#E0E0E0] py-2">
            <button
    className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
  >
    Sebelumnya
  </button>
          <button className="px-3 py-1 border border-gray-300 rounded-none bg-[#0B203F] text-white text-xs">
            1
          </button>
          <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs">
            2
          </button>
                      <button
    className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-xs disabled:opacity-50"
  >
    Berikutnya
  </button>
        </div>
          {/* Tombol Kembali */}
  <div className="mt-10">
    <a href="/proyek" className="text-sm text-blue-800 font-medium hover:underline">
      &lt;&lt; Kembali ke Halaman List Proyek
    </a>
  </div>
      </section>
</main>
    </div>
    </div>
  );
}