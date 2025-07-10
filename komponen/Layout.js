import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Sistem Konten Dinamis</title>
        <meta name="description" content="Contoh sistem konten dinamis dengan Next.js" />
      </Head>
      
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <a className="text-xl font-bold">Brand Kami</a>
            </Link>
            <div className="space-x-4">
              <Link href="/">
                <a className="hover:text-gray-300">Beranda</a>
              </Link>
              <Link href="/content/productA">
                <a className="hover:text-gray-300">Produk A</a>
              </Link>
              <Link href="/content/productB">
                <a className="hover:text-gray-300">Produk B</a>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Sistem Konten Dinamis. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}