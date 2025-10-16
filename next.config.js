module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'id',
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        // pathname: '/vi/**', // Uncomment jika ingin membatasi path tertentu
      },
      // Tambahkan pola remote lainnya jika diperlukan
    ],
  },
};

module.exports = nextConfig;