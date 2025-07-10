import Image from 'next/image';

export const ConcreteRoofContent = () => (
  <>
    <section className='mb-20'>
      <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">KEUNGGULAN GENTENG CISANGKAN :</h2>
      <p className="text-sm leading-relaxed text-justify ps-5">
  Genteng <strong>CISANGKAN®</strong> diproduksi dengan menggunakan proses basah yaitu <em>wet process</em>. Raw material pasir dan semen pilihan akan melewati suatu proses panjang, yaitu menggunakan mesin teknologi Jepang, kemudian setiap keping genteng yang dihasilkan melewati proses rendaman lalu curing secara alami, dan setiap keping genteng tersebut akan melewati proses penggosokan dan <em>quality control</em> satu per satu. Finishing akhir adalah proses <em>coating</em> dengan cat <em>solvent base</em> sesuai pesanan.
  <br /><br />
  Salah satu produk genteng unggulan <strong>CISANGKAN®</strong> yaitu profil genteng flat Victoria yang tersedia dalam 5 pilihan model/motif. Kelebihan tipe ini adalah presisi dan <em>interlocking system</em> satu sama lainnya sehingga memungkinkan terpasang sangat rapi dan kedap terhadap masuknya air hujan yang disebabkan oleh faktor angin. Selain itu kelebihannya yaitu memiliki <strong>Gutter Line</strong> yaitu tali air untuk mengarahkan aliran air hujan, <strong>Two Lines Barrier</strong>, <strong>Upper Barrier</strong> dan <strong>Double Protection Bar</strong> untuk membendung air hujan.
  <br /><br />
  Genteng <strong>CISANGKAN®</strong> dirancang sesuai dengan iklim tropis di Indonesia dan telah lolos pengujian yang mengacu pada standar nasional yaitu <strong>SNI 0096 – 2007</strong>. <em>Standar Bending Test</em> yaitu Kekuatan Lentur &gt; 1200 N.
</p>
    </section>

    <section className="flex justify-center">
      <Image src="/images/part descriptsion product.jpg" alt="Genteng Label Kiri" width={600} height={500} />
    </section>

    <section className='mb-15'>
      <h2 className="text-xl sm:text-xl font-semibold border-l-4 border-[#0B203F] pl-4 mb-4">SPESIFIKASI TEKNIS :</h2>
      <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
        <li>Bahan dasar campuran Beton</li>
        <li>Mutu Produk mengacu pada SNI 0096:2007</li>
        <li>Beban lentur minimal 1200 N</li>
        <li>Daya serap air &lt; 10%</li>
        <li>Sistem produksi mesin Press Wet System</li>
        <li>Sistem pengecatan Sprayboot 2 tahap (Base Coat dan Pigment Top Coat)</li>
        <li>Finishing menggunakan Cat Solvent Based tahan cuaca, air, alkali, sinar UV</li>
        <li>Ketebalan cat 70 mikron</li>
        <li>Prosedur dan hasil pengujian cat mengacu pada ASTM Section 6, Volume 06.01</li>
        <li>Terdiri dari banyak varian warna :</li>
                <ul className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ps-3">
          <li className="contents">
            <span>- Warna Regular</span>
            <span>: Hitam, Abu-abu, Kopi, Coklat dan Merah</span>
          </li>
        </ul>
      </ul>
    </section>
  </>
);

export const concreteRoofProducts = [
  { name: 'Neo Solar System', image: '/images/Concrete Roof/Neo/neo 2.png'},
  { name: 'Dual Slate', image: '/images/Concrete Roof/Dual Slate/dualslate 1.png' },
  { name: 'Floral', image: '/images/Concrete Roof/Floral/floral 1.png' }, 
  { name: 'Victoria Onyx', image: '/images/Concrete Roof/Victoria Series/onyx1.png' }, 
  { name: 'Victoria Multiline', image: '/images/Concrete Roof/Victoria Series/multilines1.png' },
  { name: 'Victoria Slate', image: '/images/Concrete Roof/Victoria Series/slate1.png' },
  { name: 'Victoria Pine', image: '/images/Concrete Roof/Victoria Series/pine1.png' },
  { name: 'Victoria Classic', image: '/images/Concrete Roof/Victoria Series/classic1.png' },
  { name: 'New Royal', image: '/images/Concrete Roof/New Royal/new royal 1.png' }, 
  { name: 'Oriental', image: '/images/Concrete Roof/Oriental/oriental 1.png' },
  { name: 'Majestic', image: '/images/Concrete Roof/Majestic/majestic 1.png' },
  { name: '', image: '' },
];