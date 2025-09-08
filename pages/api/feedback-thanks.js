import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/image";

export default function FeedbackThanks() {
  const router = useRouter();
  const { relevance, document, email } = router.query;

  // Terjemahkan nilai relevance ke bahasa Indonesia
  const getRelevanceText = (relevance) => {
    const relevanceMap = {
      'sangat': 'Sangat Relevan',
      'cukup': 'Cukup Relevan', 
      'kurang': 'Kurang Relevan',
      'tidak': 'Tidak Relevan'
    };
    return relevanceMap[relevance] || relevance;
  };

  useEffect(() => {
    // Redirect ke homepage setelah 5 detik
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <Head>
        <title>Terima Kasih Atas Feedback Anda | PT Cisangkan</title>
        <meta name="description" content="Terima kasih telah memberikan feedback untuk dokumen PT Cisangkan" />
      </Head>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="https://uploads.onecompiler.io/43q35qej6/43w3g2kmw/logo.png" 
            alt="Logo PT Cisangkan" 
            className="mx-auto h-16"
          />
        </div>

        {/* Icon Check */}
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Judul */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h1>
        
        {/* Pesan */}
        <p className="text-gray-600 mb-4">
          Feedback Anda telah berhasil direkam dan sangat berarti bagi kami.
        </p>

        {/* Detail Feedback (jika tersedia) */}
        {relevance && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              Anda menilai dokumen <strong>{document || 'kami'}</strong> sebagai{" "}
              <strong>{getRelevanceText(relevance)}</strong>.
            </p>
          </div>
        )}

        {/* Informasi tambahan */}
        <p className="text-sm text-gray-500 mb-6">
          Tim kami akan menggunakan masukan Anda untuk menyediakan konten yang lebih relevan di masa depan.
        </p>

        {/* Countdown */}
        <p className="text-sm text-gray-400 mb-6">
          Anda akan diarahkan ke halaman utama dalam <span className="font-medium">5 detik</span>...
        </p>

        {/* Tombol kembali */}
        <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
          Kembali ke Beranda
        </Link>

        {/* Kontak informasi */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Butuh bantuan? Hubungi kami di{" "}
            <a href="tel:+62226031588" className="text-blue-600 hover:underline">(022) 6031588</a> atau{" "}
            <a href="mailto:info@cisangkan.com" className="text-blue-600 hover:underline">info@cisangkan.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}