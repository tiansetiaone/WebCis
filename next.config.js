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
        unoptimized: false, // Nonaktifkan optimisasi gambar
        domains: ['img.youtube.com'],
      },
  };
  
  module.exports = nextConfig;
  