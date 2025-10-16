import Image from 'next/image';

export const UtilityContent = () => (
  <>
   {/* Spesifikasi Teknis */}
<section className="mb-10">
  <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4 2xl:text-2xl">
    SPESIFIKASI TEKNIS CONCRETE PIPE:
  </h2>
  <ul className="padding-pv text-sm 2xl:text-base leading-relaxed space-y-1 ps-9 list-none">
    <li className="ps-3 list-disc">Bahan dasar campuran beton</li>
    <li className="ps-3 list-disc">Mutu beton K - 225</li>
    <li className="ps-3 list-disc">Sistem produksi vibrated compaction system</li>
  </ul>
</section>


   {/* Tabel Buis Beton */}
<section className="responsive-table mb-20">
  <table>
 <thead>
      <tr>
        <th>Diameter dalam (mm)</th>
        <th>Diameter luar (mm)</th>
        <th>Panjang bentang (mm)</th>
        <th>Beban Ultimate (Lbs)</th>
        <th>Beban Ultimate (Kg)</th>
        <th>Tinggi timbunan (cm)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>200</td>
        <td>270</td>
        <td>1000</td>
        <td>757</td>
        <td>343.37</td>
        <td>70.65</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">300</td>
        <td className="border border-gray-400 px-4 py-2">395</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">1061</td>
        <td className="border border-gray-400 px-4 py-2">481.26</td>
        <td className="border border-gray-400 px-4 py-2">67.69</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">400</td>
        <td className="border border-gray-400 px-4 py-2">515</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">1241</td>
        <td className="border border-gray-400 px-4 py-2">562.91</td>
        <td className="border border-gray-400 px-4 py-2">60.72</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">500</td>
        <td className="border border-gray-400 px-4 py-2">645</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">1578</td>
        <td className="border border-gray-400 px-4 py-2">715.77</td>
        <td className="border border-gray-400 px-4 py-2">61.65</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">600</td>
        <td className="border border-gray-400 px-4 py-2">780</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">1788</td>
        <td className="border border-gray-400 px-4 py-2">811.02</td>
        <td className="border border-gray-400 px-4 py-2">57.77</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">800</td>
        <td className="border border-gray-400 px-4 py-2">1020</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">2318</td>
        <td className="border border-gray-400 px-4 py-2">1051.43</td>
        <td className="border border-gray-400 px-4 py-2">57,27</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">1250</td>
        <td className="border border-gray-400 px-4 py-2">1000</td>
        <td className="border border-gray-400 px-4 py-2">2629</td>
        <td className="border border-gray-400 px-4 py-2">1192.49</td>
        <td className="border border-gray-400 px-4 py-2">53.00</td>
      </tr>
    </tbody>
  </table>
</section>

<section className="mb-20">
  <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4 2xl:text-2xl">
    SPESIFIKASI TEKNIS CISWELL (Sumur Resapan):
  </h2>
  <ul className="padding-pv text-sm 2xl:text-base leading-relaxed space-y-1 ps-9 list-none">
    <li className="ps-3 list-disc">Bahan dasar beton non pasir</li>
    <li className="ps-3 list-disc">Warna Natural (Abu-abu)</li>
    <li className="ps-3 list-disc">Dimensi Tebal 12,5 cm, Tinggi 50 cm, dan Diameter dalam 100 cm sistem produksi vibrated compaction system</li>
    <li className="ps-3 list-disc">Berat 420 Kg/Bh</li>
    <li className="ps-3 list-disc">Koefisien Permeabilitas 1,15 cm/detik (41 m/jam)</li>
    <li className="ps-3 list-disc">Pemakaian 2 pcs untuk kedalaman 1 meter</li>
  </ul>
</section>
  </>
);


export const utilityProducts = [
  { name: 'Square Set', image: '/images/icon photo.png' },
  { name: 'Classic Set', image: '/images/icon photo.png' }
];