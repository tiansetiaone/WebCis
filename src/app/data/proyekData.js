// src/data/proyekData.js
export const proyekByKategori = {
  'Semua Produk': [
    // {
    //   id: 1,
    //   nama: "Paving Block",
    //   file: "/images/proyek/Alun-Alun Depok.jpg",
    //   tempat: "Alun Alun Kota Depok - Jawa Barat",
    //   kategori: "Paving Block"
    // },
    // {
    //   id: 2,
    //   nama: "Sandstein",
    //   file: "/images/proyek/Candi Borobudur.jpg",
    //   tempat: "Kawasan Candi Borobudur - Magelang",
    //   kategori: "Paving Block"
    // },
    // ... data lainnya untuk Semua Produk
  ],
  'Concrete Roof': [
    {
      id: 10,
      nama: "Dual Slate",
      file: "/images/proyek/Concrete Roof/Banjar Wijaya.jpg",
      lokasi: "Banjar Wijaya",
      tempat: "",
      kategori: "Concrete Roof",
    //   subkategori: "Neo"
    },
    {
      id: 11,
      nama: "Dual Slate",
      file: "/images/proyek/Concrete Roof/DS genteng summarecon bogor.jpg",
      lokasi: "Summarecon Bogor",
      tempat: "Bogor",
      kategori: "Concrete Roof",
    },
    {
      id: 12,
      nama: "New Royal",
      file: "/images/proyek/Concrete Roof/NR gazebo pasir putih pik-2.jpg",
      lokasi: "Gazebo Pasir Putih PIK",
      tempat: "Jakarta",
      kategori: "Concrete Roof",
    },
    {
      id: 13,
      nama: "New Royal",
      file: "/images/proyek/Concrete Roof/NR pantjoran pik-2.jpg",
      lokasi: "Pantjoran PIK",
      tempat: "Jakarta",
      kategori: "Concrete Roof",
    },
    {
      id: 14,
      nama: "Victoria Multiline",
      file: "/images/proyek/Concrete Roof/VS Kahatex Gempol.jpg",
      lokasi: "Kahatex Gempol",
      tempat: "Cimahi",
      kategori: "Concrete Roof",
    },
    {
      id: 15,
      nama: "Victoria Classic",
      file: "/images/proyek/Concrete Roof/VSC Sentul City Cluster Terrace Hill.jpg",
      lokasi: "Sentul City Cluster Terrace Hill",
      tempat: "Bogor",
      kategori: "Concrete Roof",
    }

  ],
  'Paving Block': [
    {
      id: 20,
      nama: "Fullpave, Truepave, Kanstein K.02 & K.11, Car Stopper, Tactile",
      file: "/images/proyek/Paving Block/Alun-Alun Depok.jpg",
      lokasi: "Alun-Alun Depok",
      tempat: "Depok",
      kategori: "Paving Block"
    },
    {
      id: 21,
      nama: "Truepave",
      file: "/images/proyek/Paving Block/Alun-Alun Wado.jpg",
      lokasi: "Alun-Alun Wado",
      tempat: "Sumedang",
      kategori: "Paving Block"
    },
    {
      id: 22,
      nama: "Concrete Tile Sandstein",
      file: "/images/proyek/Paving Block/Candi Borobudur.jpg",
      lokasi: "Pelataran Candi Borobudur",
      tempat: "Magelang",
      kategori: "Paving Block"
    },
    {
      id: 23,
      nama: "Truepave, Clssic, Kanstein K.02, Tactile",
      file: "/images/proyek/Paving Block/Unjani.jpg",
      lokasi: "Universitas Jenderal Achmad Yani",
      tempat: "Cimahi",
      kategori: "Paving Block"
    },
    {
      id: 24,
      nama: "Concrete Tile Sandstein, Tactile",
      file: "/images/proyek/Paving Block/Candi Gedong Songo.jpg",
      lokasi: "Candi Gedong Songo",
      tempat: "Semarang",
      kategori: "Paving Block"
    },
    {
      id: 25,
      nama: "Kanstein K.03",
      file: "/images/proyek/Paving Block/Embung Kipp IKN.jpg",
      lokasi: "Embung Kipp",
      tempat: "IKN",
      kategori: "Paving Block"
    },
    {
      id: 26,
      nama: "Concrete Tile Sandstein, Tactile",
      file: "/images/proyek/Paving Block/Gedung Sate.jpg",
      lokasi: "Gedung Sate",
      tempat: "Bandung",
      kategori: "Paving Block"
    },
    {
      id: 28,
      nama: "Truepave",
      file: "/images/proyek/Paving Block/Pelindo Tower.jpg",
      lokasi: "Pelindo Tower",
      tempat: "Jakarta",
      kategori: "Paving Block"
    },
    {
      id: 29,
      nama: "Concrete Tile Sandstein, Kanstein K.03, Tactile",
      file: "/images/proyek/Paving Block/Trotoar SPAM.jpg",
      lokasi: "Trotoar SPAM Sepaku",
      tempat: "IKN",
      kategori: "Paving Block"
    }
   
  ],
  'Concrete Block': [
    {
      id: 30,
      nama: "Roster R-20",
      file: "/images/proyek/Concrete Block/roster istana presiden R-20.jpg",
      lokasi: "Roster Istana Presiden",
      tempat: "IKN",
      kategori: "Concrete Block"
    },
    {
      id: 31,
      nama: "Roster R-20",
      file: "/images/proyek/Concrete Block/roster sportclub PIK-2 R-20.jpg",
      lokasi: "Roster Sportclub PIK",
      tempat: "Jakarta",
      kategori: "Concrete Block"
    },
  ],
  'Concrete Pipe': [
    {},
  ],
  // ... kategori lainnya
};

// Data khusus untuk tampilan Neo
export const proyekNeo = [
  { 
    id: 101, 
    nama: "Proyek Atap Neo Premium", 
    file: "/images/proyek/Atap Neo Premium.jpg", 
    tempat: "Jakarta",
    kategori: "Concrete Roof",
    subkategori: "Neo"
  },
  // ... proyek Neo lainnya
];

export const semuaProyek = Object.values(proyekByKategori).flat();