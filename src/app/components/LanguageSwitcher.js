// components/LanguageSwitcher.js
"use client";
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  
  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select 
      onChange={changeLanguage} 
      value={router.locale}
      className="bg-transparent border-none text-sm focus:outline-none focus:ring-0 cursor-pointer"
    >
      <option value="en">ENG</option>
      <option value="id">IND</option>
    </select>
  );
}