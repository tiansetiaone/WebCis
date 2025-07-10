// components/FloatingChatPanel.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function FloatingChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatPanelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Enhanced bot responses with product details
  const botResponses = {
    greetings: [
      "Halo! Saya Victoria, asisten virtual PT Cisangkan. Ada yang bisa saya bantu?",
      "Selamat datang! Saya siap membantu informasi produk concrete kami."
    ],
    help: [
      "Saya bisa membantu dengan: \n- Informasi produk \n- Spesifikasi teknis \n- Harga \n- Pemesanan \n\nProduk apa yang Anda minati?",
      "Kami menyediakan: Concrete Roof, Paving Block, Concrete Block, dan Concrete Pipe. Produk mana yang ingin Anda tanyakan?"
    ],
    products: {
      general: "Kami menyediakan:\n1. Concrete Roof (Genteng Beton)\n2. Paving Block\n3. Concrete Block (Batako)\n4. Concrete Pipe (Pipa Beton)\n\nProduk mana yang ingin Anda ketahui lebih detail?",
      concreteRoof: {
        types: "Concrete Roof kami terdiri dari:\n- Neo\n- Victoria\n- Victoria Multiline\n- Victoria Slate\n- Victoria Pine\n\nTipe mana yang ingin Anda ketahui?",
        neo: "Concrete Roof NEO:\n- Ketebalan: 8mm\n- Dimensi: 420x330mm\n- Berat: 4.2kg/pcs\n- Warna: Tersedia 6 pilihan\n- Harga: Rp 15.000/pcs (min. order 100pcs)",
        victoria: "Concrete Roof VICTORIA:\n- Ketebalan: 9mm\n- Dimensi: 424x337mm\n- Berat: 4.5kg/pcs\n- Warna: Tersedia 8 pilihan\n- Harga: Rp 18.000/pcs (min. order 100pcs)",
        victoriaMultiline: "Concrete Roof VICTORIA MULTILINE:\n- Ketebalan: 10mm\n- Dimensi: 426x340mm\n- Berat: 4.8kg/pcs\n- Warna: Tersedia 5 pilihan\n- Harga: Rp 21.000/pcs",
        victoriaSlate: "Concrete Roof VICTORIA SLATE:\n- Ketebalan: 11mm\n- Dimensi: 430x345mm\n- Berat: 5.2kg/pcs\n- Warna: Tersedia 4 pilihan\n- Harga: Rp 25.000/pcs",
        victoriaPine: "Concrete Roof VICTORIA PINE:\n- Ketebalan: 12mm\n- Dimensi: 435x350mm\n- Berat: 5.5kg/pcs\n- Warna: Tersedia 3 pilihan\n- Harga: Rp 28.000/pcs"
      },
      pavingBlock: {
        types: "Paving Block kami terdiri dari:\n- Hexagonal (Segi Enam)\n- Bata (Rectangle)\n- Trihex\n- Coble\n\nTipe mana yang Anda butuhkan?",
        hexagonal: "Paving Block Hexagonal:\n- Dimensi: 200x100x60mm\n- Kekuatan: K300-K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 12.000/m² (min. order 50m²)",
        bata: "Paving Block Bata:\n- Dimensi: 200x100x60mm\n- Kekuatan: K300-K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 11.500/m²",
        trihex: "Paving Block Trihex:\n- Dimensi: 200x100x60mm\n- Kekuatan: K300-K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 13.000/m²",
        coble: "Paving Block Coble:\n- Dimensi: 200x100x80mm\n- Kekuatan: K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 15.000/m²"
      },
      concreteBlock: {
        types: "Concrete Block (Batako) kami terdiri dari:\n- Standard\n- Hollow\n- Press\n\nTipe mana yang Anda cari?",
        standard: "Batako Standard:\n- Dimensi: 40x20x10cm\n- Kekuatan: K175\n- Harga: Rp 5.000/pcs (min. order 100pcs)",
        hollow: "Batako Hollow:\n- Dimensi: 40x20x15cm\n- Kekuatan: K200\n- Harga: Rp 6.500/pcs",
        press: "Batako Press:\n- Dimensi: 40x20x10cm\n- Kekuatan: K250\n- Harga: Rp 7.000/pcs"
      },
      concretePipe: {
        types: "Concrete Pipe (Pipa Beton) kami tersedia dalam:\n- Diameter 30cm\n- Diameter 40cm\n- Diameter 50cm\n\nUkuran mana yang Anda butuhkan?",
        diameter30: "Pipa Beton Ø30cm:\n- Panjang: 1m\n- Ketebalan: 4cm\n- Harga: Rp 150.000/pcs (min. order 10pcs)",
        diameter40: "Pipa Beton Ø40cm:\n- Panjang: 1m\n- Ketebalan: 5cm\n- Harga: Rp 200.000/pcs",
        diameter50: "Pipa Beton Ø50cm:\n- Panjang: 1m\n- Ketebalan: 6cm\n- Harga: Rp 250.000/pcs"
      }
    },
    order: [
      "Untuk pemesanan produk, silahkan hubungi Admin kami via WhatsApp:\n\n📞 0812-1498-3517\n\nAtau klik tombol 'Hubungi Admin' di bagian bawah chat ini.",
      "Saya akan menghubungkan Anda dengan tim penjualan kami. Silahkan hubungi:\n\n📞 0812-1498-3517 (WhatsApp)\n\nTim kami siap membantu proses pemesanan Anda."
    ],
    contacts: [
      "Kantor Pusat:\nJl. Haji Alpi No 107, Cijerah\nKota Bandung, Jawa Barat\n\n📞 (022) 6031588 (hunting)",
      "Email kami: info@cisangkan.com\n\nJam Operasional:\nSenin-Jumat: 08.00-17.00 WIB"
    ],
    pricing: "Harga dapat berubah sesuai lokasi pengiriman dan jumlah pemesanan. Untuk info harga terupdate, silahkan sebutkan:\n1. Produk yang diminta\n2. Jumlah yang dibutuhkan\n3. Alamat pengiriman",
    delivery: "Kami melayani pengiriman ke seluruh Indonesia dengan ketentuan:\n- Minimal order berbeda per produk\n- Ongkir ditanggung pembeli\n- Waktu pengiriman 3-14 hari kerja tergantung lokasi",
    payment: "Metode Pembayaran:\n- Transfer Bank (BCA, Mandiri, BRI)\n- Cash On Delivery (COD) khusus area tertentu\n- Pembayaran 50% saat order, 50% sebelum pengiriman",
    default: [
      "Maaf, saya belum memahami pertanyaan Anda. Berikut hal yang bisa saya bantu:\n1. Info produk\n2. Harga\n3. Pemesanan\n4. Kontak kami",
      "Boleh diulangi dengan kata lain? Atau Anda bisa menanyakan tentang:\n- Concrete Roof\n- Paving Block\n- Concrete Block\n- Concrete Pipe"
    ]
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(botResponses.greetings[0]);
      }, 500);
    }
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { text, isUser: false }]);
    setIsTyping(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage = { text: message, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate bot typing and response
      setTimeout(() => {
        generateBotResponse(message);
      }, 1000 + Math.random() * 2000);
    }
  };

  const generateBotResponse = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    let response;

    // Greetings
    if (/halo|hai|hi|hello|selamat/.test(lowerCaseMsg)) {
      response = botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } 
    // Help
    else if (/bantuan|help|tolong|info|informasi/.test(lowerCaseMsg)) {
      response = botResponses.help[Math.floor(Math.random() * botResponses.help.length)];
    }
    // Products
    else if (/produk|barang|item|jenis|tipe/.test(lowerCaseMsg)) {
      if (/atap|roof|genteng/.test(lowerCaseMsg)) {
        if (/neo/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.neo;
        } else if (/victoria multiline/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoriaMultiline;
        } else if (/victoria slate/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoriaSlate;
        } else if (/victoria pine/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoriaPine;
        } else if (/victoria/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoria;
        } else {
          response = botResponses.products.concreteRoof.types;
        }
      } 
      else if (/paving|block|konblok/.test(lowerCaseMsg)) {
        if (/hexa|segienam/.test(lowerCaseMsg)) {
          response = botResponses.products.pavingBlock.hexagonal;
        } else if (/bata|rectangle/.test(lowerCaseMsg)) {
          response = botResponses.products.pavingBlock.bata;
        } else if (/trihex/.test(lowerCaseMsg)) {
          response = botResponses.products.pavingBlock.trihex;
        } else if (/coble/.test(lowerCaseMsg)) {
          response = botResponses.products.pavingBlock.coble;
        } else {
          response = botResponses.products.pavingBlock.types;
        }
      }
      else if (/batako|concrete block|blok/.test(lowerCaseMsg)) {
        if (/standard/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteBlock.standard;
        } else if (/hollow/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteBlock.hollow;
        } else if (/press/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteBlock.press;
        } else {
          response = botResponses.products.concreteBlock.types;
        }
      }
      else if (/pipa|pipe|concrete pipe|drainase/.test(lowerCaseMsg)) {
        if (/30|tiga puluh/.test(lowerCaseMsg)) {
          response = botResponses.products.concretePipe.diameter30;
        } else if (/40|empat puluh/.test(lowerCaseMsg)) {
          response = botResponses.products.concretePipe.diameter40;
        } else if (/50|lima puluh/.test(lowerCaseMsg)) {
          response = botResponses.products.concretePipe.diameter50;
        } else {
          response = botResponses.products.concretePipe.types;
        }
      }
      else {
        response = botResponses.products.general;
      }
    }
    // Order
    else if (/pesan|order|beli|pemesanan|pembelian|purchase|buy/.test(lowerCaseMsg)) {
      response = botResponses.order[Math.floor(Math.random() * botResponses.order.length)];
    }
    // Contacts
    else if (/kontak|alamat|kantor|telpon|telepon|email/.test(lowerCaseMsg)) {
      response = botResponses.contacts[Math.floor(Math.random() * botResponses.contacts.length)];
    }
    // Pricing
    else if (/harga|price|biaya|cost|berapa/.test(lowerCaseMsg)) {
      response = botResponses.pricing;
    }
    // Delivery
    else if (/kirim|pengiriman|ongkos|ongkir|delivery|pengantaran/.test(lowerCaseMsg)) {
      response = botResponses.delivery;
    }
    // Payment
    else if (/bayar|pembayaran|payment|dp|uang muka/.test(lowerCaseMsg)) {
      response = botResponses.payment;
    }
    // Default
    else {
      response = botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }

    addBotMessage(response);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatPanelRef.current && !chatPanelRef.current.contains(event.target)) {
        const chatButton = document.querySelector('[aria-label="Open chat"]');
        if (!chatButton || !chatButton.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-[#2957A4] text-white p-3 rounded-full shadow-lg hover:bg-[#0B1F3A] hover:scale-105 transition-transform duration-300"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div 
          ref={chatPanelRef}
          className="w-80 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Chat Header */}
          <div className="bg-[#2957A4] text-white p-3 flex justify-between items-center relative overflow-hidden h-25">
            <div className="flex items-center">
              <div className="relative w-20 h-full rounded-none overflow-hidden mr-2">
                <Image
                  src="/images/Victoria 2.png"
                  alt="Victoria"
                  width={80}
                  height={70}
                  className="object-cover mt-10"
                />
              </div>
              <div>
                <p className="font-normal text-[9px]">Chat with</p>
                <p className="text-sm font-semibold">Victoria</p>
                <p className="text-[8px]">Virtual Assistant</p>
              </div>
            </div>
            
            {/* Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-15 mb-[-1em] overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f9fafb" fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,197.3C672,181,768,139,864,106.7C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            
            <div className="flex items-center z-10">
              <div className="flex items-center mr-2 bg-white/20 rounded-full px-2 py-1">
                <span className="w-1 h-1 bg-green-400 rounded-full mr-1 mb-0.5"></span>
                <span className="text-[8px]">Online</span>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-60 p-3 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-sm text-gray-500 mt-16">
                Victoria is online and ready to help
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs px-3 py-2 rounded-lg text-xs whitespace-pre-line ${msg.isUser 
                      ? 'bg-[#2957A4] text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Masukkan Pertanyaan..."
                className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#2957A4]"
              />
              <button
                type="submit"
                className="bg-[#2957A4] text-white px-3 py-2 rounded-r hover:bg-[#0B1F3A] transition-colors"
                disabled={isTyping}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Admin Info */}
          <div className="text-center text-xs text-gray-500 p-2 bg-gray-100">
            <a className='flex gap-2 justify-center items-center' href="https://wa.me/6281214983517" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/icons8-whatsapp.svg" alt="WhatsApp" width={15} height={15} />
              <span>Hubungi Admin</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}