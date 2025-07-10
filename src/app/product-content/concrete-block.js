import Image from 'next/image';

export const ConcreteBlockContent = () => {
  // Data array untuk langkah-langkah pemasangan
  const installationSteps = [
    {
      id: 1,
      image: "/images/cb1.jpg",
      alt: "Langkah 1 - Persiapan dasar",
      title: "Langkah 1",
      description: "Untuk menjaga kestabilan dan kekuatan Bata Beton Berlubang, luas dinding antara kolom dan balok diharapkan tidak melebihi 12 m2 untuk tebal dinding 9 cm, 18 m2 untuk tebal dinding 14 cm dan 24 m2 untuk tebal dinding 19 cm (atau besi tulangan)."
    },
    {
      id: 2,
      image: "/images/cb2.jpg",
      alt: "Langkah 2 - Pemasangan awal",
      title: "Langkah 2",
      description: "Khusus untuk naht persegi (dilengkeng), Anda dapat menggunakan cara lain, yaitu setelah adukan mengeras (kurang lebih 2 jam) sikatlah naht tersebut dengan air bersih menggunakan sikat ijuk."
    },
    {
      id: 3,
      image: "/images/cb3.jpg",
      alt: "Langkah 3 - Penyusunan blok",
      title: "Langkah 3",
      description: "Contoh pemakaian Bond Beam sebagai ring balok."
    },
    {
      id: 4,
      image: "/images/cb4.jpg",
      alt: "Langkah 4 - Pengikatan",
      title: "Langkah 4",
      description: "Contoh instalasi listrik/air pada dinding yang tidak diplester (expose)."
    },
    {
      id: 5,
      image: "/images/cb5.jpg",
      alt: "Langkah 5 - Finishing",
      title: "Langkah 5",
      description: "Contoh pemakaian C - PILLAR"
    },
    {
      id: 6,
      image: "/images/cb6.jpg",
      alt: "Langkah 6 - Pemeriksaan",
      title: "Langkah 6",
      description: "Untuk pertemuan tembok yang satu dengan yang lain, siapkan angker diameter 6 mm atau mesh."
    }
  ];

  return (
    <>
      {/* Spesifikasi Teknis */}
      <section className='mb-10'>
        <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">
          SPESIFIKASI TEKNIS :
        </h2>
        <ul className="text-sm leading-relaxed space-y-1 ps-9 list-disc">
          <li className="ps-3">Bahan dasar campuran beton</li>
          <li className="ps-3">
            Mutu Produk mengacu pada SNI 03 - 0349 - 1989 Kategori peringkat I
          </li>
          <li className="ps-3">
            Kuat tekan rata-rata 70 kg/cm²
          </li>
          <li className="ps-3">
            Penyerapan air rata-rata 25%
          </li>
          <li className="ps-3">
            Hasil uji insulasi bunyi mengacu pada SNI 03 - 6386 - 2000 dengan hasil Rw = 53 dB
          </li>
          <li className="ps-3">
            Hasil uji transmitansi thermal rata-rata mengacu pada SNI 03 - 6389 - 2000 dengan hasil OTTV (<em>overall thermal transfer value</em>) &lt; 45 watt/m² (<em>bangunan hemat energi</em>)
          </li>
          <li className="ps-3">
            Hasil ketahanan api mengacu pada SNI 1741 : 2008, dan mempunyai ketahanan api lebih dari 2 jam
          </li>
        </ul>
      </section>

      {/* Cara Pemasangan */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">
          CARA PEMASANGAN :
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-8">
          {installationSteps.map((step) => (
            <div
              key={step.id}
              className="overflow-hidden flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/5] relative border rounded-lg overflow-hidden shadow-lg flex flex-col items-center text-center">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-md"
                />
              </div>
                            <div className="w-full text-sm px-4 py-3 leading-relaxed">
                <strong className="block mb-1">{step.title}</strong>
                <p className='text-justify'>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const concreteBlockProducts = [
  { name: "Roster R-01", image: '/images/Concrete Block/Roster R-01.png'},
  { name: "Roster R-04", image: '/images/Concrete Block/Roster R-04.png'},
  { name: "Roster R-06", image: '/images/Concrete Block/Roster R-06.png'},
  { name: "Roster R-08", image: '/images/Concrete Block/Roster-08.png'},
  { name: "Roster R-09", image: '/images/Concrete Block/Roster R-09.png'},
  { name: "Roster R-11", image: '/images/Concrete Block/Roster R-11.png'},
  { name: "Roster R-13", image: '/images/Concrete Block/Roster R-13.png'}
];