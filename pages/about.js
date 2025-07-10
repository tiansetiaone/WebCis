// pages/about.js
import { useRouter } from 'next/router';
import en from '../locales/en/common.json';
import id from '../locales/id/common.json';

export default function AboutPage() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : id; // Auto-select translation

  return (
    <div>
      <h1>{t.welcome}</h1>
      <p>{t.about}</p>
    </div>
  );
}