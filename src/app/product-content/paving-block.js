import Image from "next/image";

export const PavingBlockContent = () => (
  <>
    {/* Spesifikasi Teknis */}
    <section className="mb-10">
      <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI TEKNIS :</h2>
      <ul className="text-sm leading-relaxed space-y-1 ps-9 list-none">
        <li className="ps-3 list-disc">Bahan dasar campuran Beton</li>
        <li className="ps-3 list-disc">Toleransi dimensi mengacu pada B56717-1 : 1993</li>
        <ul className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ps-3">
          <li className="contents">
            <span>- Panjang/Lebar</span>
            <span>: 2 mm</span>
          </li>
          <li className="contents">
            <span>- Tebal</span>
            <span>: 3 mm</span>
          </li>
        </ul>
        <li className="ps-3 list-disc">Mutu Produk mengacu pada SNI 03-0691-1996</li>
        <li className="ps-3 list-disc">Kategori Peringkat 1</li>
        <li className="ps-3 list-disc">Kuat Tekan rata-rata :</li>
        <ul className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ps-3">
          <li className="contents">
            <span>- Tebal 6 & 8 cm</span>
            <span>= 450 kg/cm2</span>
          </li>
          <li className="contents">
            <span>- Tebal 10 cm</span>
            <span>= 500 kg/cm2</span>
          </li>
        </ul>
        <li className="ps-3 list-disc">Penyerapan air rata-rata 3%</li>
        <li className="ps-3 list-disc">Ketahanan aus rata-rata 0.09 mm/menit</li>
        <li className="ps-3 list-disc">Kuat lentur tipe Truepave (AS/NZS 4456.5:2003) 50 Kgf/cm2</li>
        <li className="ps-3 list-disc">Diproduksi menggunakan mesin otomatis dengan sistem Vibrating dan Compressing</li>
        <li className="ps-3 list-disc">Proses Produksi dilengkapi dengan alat pengendali kandungan air (Water Moisture Control) dan teknologi pengembunan (Fogging)</li>
        <li className="ps-3 list-disc">Produk terdiri dari banyak varian warna</li>
        <ul className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ps-3">
          <li className="contents">
            <span>- Natural</span>
            <span></span>
          </li>
          <li className="contents">
            <span>- Regular</span>
            <span>: Merah, Hitam</span>
          </li>
          <li className="contents">
            <span>- Khusus</span>
            <span>: Putih, Kuning, Hijau, Cinnamon</span>
          </li>
        </ul>
      </ul>
    </section>

    {/* Ketentuan Pemasangan */}
    <section className="mb-10">
      <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">KETENTUAN PEMASANGAN :</h2>
      <ul className="text-sm leading-relaxed space-y-1 ps-9 list-none">
        <li className="ps-3 list-disc">Pasir alas harus lolos saringan 5mm</li>
        <li className="ps-3 list-disc">Pasir pengisi harus lolos saringan 4mm</li>
      </ul>
    </section>

    {/* Gambar */}
    <section className="flex justify-center overflow-x-auto mb-20">
      <table className="table-auto text-sm border border-collapse border-gray-400">
        <thead className="bg-[#0B203F] text-white text-sm text-center">
          <tr>
            <th className="border border-gray-400 px-4 py-2 align-middle" rowSpan={2}>
              Sieve (mm)
            </th>
            <th className="border border-gray-400 px-4 py-2" colSpan={2}>
              Pasir Alas / Sand Bedding
            </th>
            <th className="border border-gray-400 px-4 py-2 align-middle" rowSpan={2}>
              Sieve (mm)
            </th>
            <th className="border border-gray-400 px-4 py-2" colSpan={2}>
              Joint Filler / Sand Filler
            </th>
          </tr>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Min %</th>
            <th className="border border-gray-400 px-4 py-2">Max %</th>
            <th className="border border-gray-400 px-4 py-2">Min %</th>
            <th className="border border-gray-400 px-4 py-2">Max %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">12.5</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
            <td className="border border-gray-400 px-4 py-2">12.5</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">9.5</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
            <td className="border border-gray-400 px-4 py-2">9.5</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">4.75</td>
            <td className="border border-gray-400 px-4 py-2">90</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
            <td className="border border-gray-400 px-4 py-2">4.75</td>
            <td className="border border-gray-400 px-4 py-2">90</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">2.36</td>
            <td className="border border-gray-400 px-4 py-2">60</td>
            <td className="border border-gray-400 px-4 py-2">95</td>
            <td className="border border-gray-400 px-4 py-2">2.36</td>
            <td className="border border-gray-400 px-4 py-2">75</td>
            <td className="border border-gray-400 px-4 py-2">100</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">1.18</td>
            <td className="border border-gray-400 px-4 py-2">30</td>
            <td className="border border-gray-400 px-4 py-2">70</td>
            <td className="border border-gray-400 px-4 py-2">1.18</td>
            <td className="border border-gray-400 px-4 py-2">55</td>
            <td className="border border-gray-400 px-4 py-2">90</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">0.6</td>
            <td className="border border-gray-400 px-4 py-2">15</td>
            <td className="border border-gray-400 px-4 py-2">34</td>
            <td className="border border-gray-400 px-4 py-2">0.6</td>
            <td className="border border-gray-400 px-4 py-2">35</td>
            <td className="border border-gray-400 px-4 py-2">59</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">0.3</td>
            <td className="border border-gray-400 px-4 py-2">5</td>
            <td className="border border-gray-400 px-4 py-2">20</td>
            <td className="border border-gray-400 px-4 py-2">0.3</td>
            <td className="border border-gray-400 px-4 py-2">8</td>
            <td className="border border-gray-400 px-4 py-2">30</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">0.15</td>
            <td className="border border-gray-400 px-4 py-2">0</td>
            <td className="border border-gray-400 px-4 py-2">10</td>
            <td className="border border-gray-400 px-4 py-2">0.15</td>
            <td className="border border-gray-400 px-4 py-2">0</td>
            <td className="border border-gray-400 px-4 py-2">10</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">0</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">0</td>
            <td className="border border-gray-400 px-4 py-2">0</td>
            <td className="border border-gray-400 px-4 py-2">-</td>
            <td className="border border-gray-400 px-4 py-2">0</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="border border-gray-400 px-4 py-2 text-center italic" colSpan={6}>
              Batas kandungan air pasir alas 6–8%, dan maks 1% untuk pasir pengisi
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  </>
);

export const pavingBlockProducts = [
  { name: "Square Set", image: "/images/Paving Block/Square Set/fullpave.png" },
  { name: "Classic Set", image: "/images/Paving Block/Classic Set/classic-2.png" },
  { name: "Altstadt", image: "/images/Paving Block/Altstadt/Altstad Centrum.png" },
  { name: "Hexagon", image: "/images/Paving Block/Others/hexagon.png" },
  { name: "Quatro", image: "/images/Paving Block/Others/quatro.png" },
];
