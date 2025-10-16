
import Link from "next/link";
export const concreteTileSubItems = [
{
    id: 'Sandstein',
    name: 'Sandstein',
    thumbnails: [
      {
        id: 1,
        thumbImage: '/images/Paving Block/Concrete Tile/Sanstein.png',
        largeImage: '/images/Paving Block/Concrete Tile/Sanstein.png',
        color: 'Multi Warna'
      },
      {
        id: 2,
        thumbImage: '/images/Paving Block/Concrete Tile/Sanstein2.png',
        largeImage: '/images/Paving Block/Concrete Tile/Sanstein2.png',
        color: 'Multi Warna'
      },
      {
        id: 3,
        thumbImage: '/images/Paving Block/Concrete Tile/Sandstein3.png',
        largeImage: '/images/Paving Block/Concrete Tile/Sandstein3.png',
        color: 'Multi Warna'
      }
    ],
    specifications: [
      { label: 'Dimensi', value: '60 x 40 x 5  / 40 x 40 x 5  / 20 x 40 x 5 ' },
      { label: 'Berat', value: '25,5  / 17  / 8,5 ' },
      { 
        label: 'Aplikasi', 
        icons: [
          ['pedestrian', 'garage'],  
          ['pedestrian', 'garage'],  
          ['pedestrian', 'garage']      
        ]
      },
      { label: 'Pemakaian', value: '4,16  : 6,25  : 12,5 ' },
      { label: 'Warna', value: '-' },
      { label: 'Best Seller', icon: '' }
    ],
    technicalSpecs: [
      { label: 'Beban Lentur', value: '1100-1300 N' },
      { label: 'Penyerapan Air', value: 'Maks. 12%' },
      { label: 'Ketebalan Cat', value: '80-120 Mikron' },
      { label: 'Warna Variasi', value: '5 Pilihan Warna' }
    ],
    installationNote: ''
  },
  {
    id: 'Spectra Pave',
    name: 'Spectra Pave',
    thumbnails: [
      {
        id: 2,
        thumbImage: '/images/Paving Block/Concrete Tile/Spectra Pave.png',
        largeImage: '/images/Paving Block/Concrete Tile/Spectra Pave.png',
        color: 'Multi Warna'
      }
    ],
    specifications: [
      { label: 'Dimensi', value: '30 x 30 x 6 ' },
      { label: 'Berat', value: '11,5 ' },
      { 
        label: 'Aplikasi', 
        icons: [
          ['pedestrian', 'garage']     
        ]
      },
      { label: 'Pemakaian', value: '11 ' },
      { label: 'Warna', value: 'Natural, Regular, Khusus' },
      { label: 'Best Seller', icon: '' }
    ],
    technicalSpecs: [
      { label: 'Beban Lentur', value: '1100-1300 N' },
      { label: 'Penyerapan Air', value: 'Maks. 12%' },
      { label: 'Ketebalan Cat', value: '80-120 Mikron' },
      { label: 'Warna Variasi', value: '5 Pilihan Warna' }
    ],
    installationNote: ''
  },
  {
    id: 'Cladding Tile',
    name: 'Cladding Tile',
    thumbnails: [
      {
        id: 3,
        thumbImage: '/images/Paving Block/Concrete Tile/Cladding Tile.png',
        largeImage: '/images/Paving Block/Concrete Tile/Cladding Tile.png',
        color: 'Abu-abu Gelap'
      }
    ],
    specifications: [
      { label: 'Dimensi', value: '30 x 30 x 1,5 ' },
      { label: 'Berat', value: '4,2 ' },
      { 
        label: 'Aplikasi', 
        icons: [
          ['pedestrian']     
        ]
      },
      { label: 'Pemakaian', value: '11 ' },
      { label: 'Warna', value: 'Natural' },
      { label: 'Best Seller', icon: '' }
    ],
    technicalSpecs: [
      { label: 'Beban Lentur', value: '1300 N' },
      { label: 'Penyerapan Air', value: 'Maks. 8%' },
      { label: 'Ketebalan Cat', value: '120 Mikron' },
      { label: 'Warna Cat', value: 'Slate Grey' }
    ],
    installationNote: 'Pemasangan pola acak'
  },
  {
    id: 'Clading',
    name: 'Clading △',
    thumbnails: [
      {
        id: 4,
        thumbImage: '/images/Paving Block/Concrete Tile/Cladding Tile Triangle.png',
        largeImage: '/images/Paving Block/Concrete Tile/Cladding Tile Triangle.png',
        color: 'Coklat'
      }
    ],
    specifications: [
      { label: 'Dimensi', value: '30 x 30 x 1,5 ' },
      { label: 'Berat', value: '2,52 ' },
      { 
        label: 'Aplikasi', 
        icons: [
          ['pedestrian']     
        ]
      },
      { label: 'Pemakaian', value: '20 ' },
      { label: 'Warna', value: 'Natural' },
      { label: 'Best Seller', icon: '' }
    ],
    technicalSpecs: [
      { label: 'Beban Lentur', value: '1150 N' },
      { label: 'Penyerapan Air', value: 'Maks. 11%' },
      { label: 'Ketebalan Cat', value: '90 Mikron' },
      { label: 'Warna Cat', value: 'Pine Wood' }
    ],
    installationNote: 'Pemasangan pola berselang'
  }
];


export const productsPb2Content = {
  'Concrete Tile': {
    name: 'CONCRETE TILE',
    category: 'Paving Block',
    thumbnails: [
      {
        id: 1,
        thumbImage: '/images/Paving Block/Concrete Tile/sandstein.png',
        largeImage: '/images/Paving Block/Concrete Tile/sandstein.png',
        color: 'Multi Warna'
      }
    ],
    specifications: [
      { value: 'Bahan dasar campuran beton' },
      {
  value: (
    <>
      Mutu Produk mengacu pada standar{' '}
      <Link href="/informasi/sertifikasi" className="font-semibold hover:cursor-pointer hover:underline">
        SNI 0028-1987-A
      </Link>{' '}
      kategori peringkat 1
    </>
  )
},
      { value: 'Kuat lentur rata-rata 35 kg/cm²' },
      { value: 'Hanya diperuntukkan untuk pedestrian' },
      { value: 'Tidak disarankan dilindas kendaraan' }
    ],
    technicalSpecs: [
      { value: 'Bahan dasar campuran beton' },
            {
  value: (
    <>
      Mutu Produk mengacu pada standar{' '}
      <Link href="/informasi/sertifikasi" className="font-semibold hover:cursor-pointer hover:underline">
        SNI 03-0691-1996
      </Link>{' '}
    </>
  )
},
      { value: 'Ketahanan aus rata-rata min 0,09 mm/menit' },
      { value: 'Penyerapan air rata-rata 3%' },
      { value: 'Varian Warna :' }
    ],
    technicalSpecs2: [
      { value: '- Natural' },
      { value: '- Regular : Merah dan Putih' },
      { value: '- Khusus  : Putih' }
    ],
    installationNote: '',
    type: concreteTileSubItems.map(item => ({
      name: item.name,
      image: item.thumbnails[0].thumbImage,
      id: item.id
    }))
  }
};

export const mainProducts = [
  'Concrete Roof',
  'Paving Block',
  'Concrete Block',
  'Utility'
];

export const subProducts = {
  'Concrete Roof': [
    'Neo Solar System', 'Dual Slate', 'Floral', 'Victoria Series',
    'Genteng Gelombang'
  ],
  'Paving Block': [
    'Square Set', 'Classic Set', 'Altstadt',
    'Others', 'Guiding Pave', 'Grass Block'
  ],
  'Concrete Block': [
    'Regular Full 10.01', 'Regular Full Tembus 10.01 B', 'Regular Half 10.02',
    'Bond Beam 10.03', 'C-Pillar 10.04', 'Open End 10.05', 'Regular Full 15.01', 'Regular Full 15.01 B (Tembus)', 'Regular Full 15.02', 'Regular Full 15.02 B (Tembus)', 'Bond Bean 15.03', 'Reguler Full 20.01', 'Reguler Full 20.01 B (Tembus)', 'Regular Half 20.02 B (Tembus)', 'Bond Beam 20.03', 'Grooved Ribbed Block G.10.01', 'Grooved Ribbed Paver G.04.01', 'Split Ribbed Block S.12.01', 'Split Ribbed Paver S.05.01', 'Ventilation Block'
  ],
  'Utility': [
    'Concrete Pipe', 'Ciswell'
  ]
};
