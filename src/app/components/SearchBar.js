// components/SearchBar.js
"use client";
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();

  // Handle klik di luar search bar
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions (mock data)
  useEffect(() => {
    if (query.length > 2) {
      // Ganti dengan API call sebenarnya
      const mockResults = [
        { id: 1, title: 'Concrete Roof', type: 'product' },
        { id: 2, title: 'Paving Block', type: 'product' },
        { id: 3, title: 'Artikel Terbaru', type: 'article' }
      ];
      setSuggestions(mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-black transition-colors"
        aria-label="Search"
      >
        {isOpen ? <FaTimes size={18} /> : <FaSearch size={18} />}
      </button>

      {/* Search Input */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-lg rounded-md z-50">
          <form onSubmit={handleSearch} className="p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk atau artikel..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
          </form>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <ul className="border-t border-gray-200 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      router.push(`/${item.type === 'product' ? 'produk' : 'blog'}/${item.id}`);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                  >
                    <FaSearch size={12} className="text-gray-400" />
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}