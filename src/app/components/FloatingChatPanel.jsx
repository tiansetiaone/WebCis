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

  // Bot responses limited to only the required questions
  const botResponses = {
    greetings: [
      "Halo! Saya Victoria, asisten virtual PT Cisangkan. Ada yang bisa saya bantu?",
      "Selamat datang! Saya siap membantu informasi produk concrete kami."
    ],
    products: {
      concreteRoof: {
        victoriaVariants: "Victoria Series:\n- Onyx\n- Multiline\n- Slate\n- Pine\n- Classic",
        victoriaSpacing: "Jarak reng untuk Genteng Victoria: 26,5 cm",
        dualSlateSpacing: "Jarak reng untuk Genteng Dual Slate: 36,5-37 cm"
      },
      pavingBlock: {
        colors: "Warna Paving Cisangkan:\n\n- Natural\n- Warna Reguler:\n  • Hitam\n  • Merah\n- Warna Khusus:\n  • Putih\n  • Hijau\n  • Kuning\n  • Cinnamon",
        truepaveUsage: "Pemakaian Paving Truepave: 49 pcs/m²"
      }
    },
    default: "Maaf, saya hanya bisa menjawab pertanyaan spesifik tentang produk PT Cisangkan."
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

    // Specific question matching
    if (/varian|jenis|tipe.*victoria/.test(lowerCaseMsg)) {
      response = botResponses.products.concreteRoof.victoriaVariants;
    }
    else if (/jarak.*reng.*victoria/.test(lowerCaseMsg)) {
      response = botResponses.products.concreteRoof.victoriaSpacing;
    }
    else if (/jarak.*reng.*dualslate/.test(lowerCaseMsg)) {
      response = botResponses.products.concreteRoof.dualSlateSpacing;
    }
    else if (/warna.*paving|paving.*warna/.test(lowerCaseMsg)) {
      response = botResponses.products.pavingBlock.colors;
    }
    else if (/pemakaian.*truepave|truepave.*pemakaian/.test(lowerCaseMsg)) {
      response = botResponses.products.pavingBlock.truepaveUsage;
    }
    else {
      response = botResponses.default;
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
          className="bg-[#2957A4] sm-125:bg-amber-50 text-white p-3 2xl:p-4 rounded-full shadow-lg hover:bg-[#0B1F3A] hover:scale-105 transition-transform duration-300"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 2xl:h-8 2xl:w-8"
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
          className="w-80 2xl:w-105 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
        >
          {/* Chat Header */}
          <div className="bg-[#2957A4] text-white p-3 flex justify-between items-center relative overflow-hidden h-25 2xl:h-32">
            <div className="flex items-center">
              <div className="relative min-w-[80px] w-20 h-28 2xl:min-w-[104px] 2xl:w-26 2xl:h-36 rounded-none overflow-hidden mr-2 mt-4">
                <Image
                  src="/images/Victoria2.png"
                  alt="Victoria"
                  fill
                  sizes="(max-width: 1366px) 80px, (min-width: 1920px) 104px"
                  className="object-cover object-center"
                  priority
                  unoptimized={true}
                />
              </div>
              <div>
                <p className="font-normal text-[9px] 2xl:text-[11px]">Chat with</p>
                <p className="text-sm 2xl:text-base font-semibold">Victoria</p>
                <p className="text-[8px] 2xl:text-[10px]">Virtual Assistant</p>
              </div>
            </div>
            
            {/* Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-15 2xl:h-19 mb-[-1em] overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f9fafb" fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,197.3C672,181,768,139,864,106.7C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            
            <div className="flex items-center z-10">
              <div className="flex items-center mr-2 bg-white/20 rounded-full px-2 py-1">
                <span className="w-1 h-1 2xl:w-2 2xl:h-2 bg-green-400 rounded-full mr-1 mb-0.5"></span>
                <span className="text-[8px] 2xl:text-[10px]">Online</span>
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
          <div className="h-60 2xl:h-82 p-3 overflow-y-auto bg-gray-50">
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
                    className={`max-w-xs px-3 py-2 rounded-lg text-xs 2xl:text-sm whitespace-pre-line ${msg.isUser 
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
          <div className="text-center text-xs 2xl:text-sm text-gray-500 p-2 bg-gray-100">
            <a 
              className='flex gap-2 justify-center items-center' 
              href="https://wa.me/6281214983517" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="relative w-4 h-4 2xl:w-6 2xl:h-6">
                <Image 
                  src="/icons/icons8-whatsapp.svg" 
                  alt="WhatsApp" 
                  fill
                  sizes="(max-width: 768px) 16px, 16px"
                  className="object-contain"
                />
              </div>
              <span>Hubungi Admin</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}