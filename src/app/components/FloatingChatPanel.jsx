// components/FloatingChatPanel.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function FloatingChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState(null);
  const [conversationContext, setConversationContext] = useState('');
  const chatPanelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize user data from localStorage or create new
  useEffect(() => {
    const storedUserData = localStorage.getItem('chatUserData');
    const storedMessages = localStorage.getItem('chatMessages');
    
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      
      // Set messages hanya jika ada
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
      
      // Jika chat dibuka dan ada nama user, sapa kembali
      if (isOpen && parsedData.firstName) {
        // Cek apakah pesan sambutan sudah ada untuk menghindari duplikasi
        const hasGreeting = JSON.parse(storedMessages || '[]').some(msg => 
          msg.text && msg.text.includes(`Halo kembali ${parsedData.firstName}`)
        );
        
        if (!hasGreeting) {
          addBotMessage(`Halo kembali ${parsedData.firstName}! Ada yang bisa saya bantu?`);
        }
      }
    } else {
      const newUserData = {
        id: generateUserId(),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interests: [],
        conversationHistory: [],
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        status: 'new',
        pageViews: 1,
        awaitingInput: null
      };
      setUserData(newUserData);
      localStorage.setItem('chatUserData', JSON.stringify(newUserData));
    }
  }, [isOpen]);

  // Generate unique user ID
  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  // Enhanced bot responses with more detailed product information
  const botResponses = {
    greetings: [
      "Halo! Saya Victoria, asisten virtual PT Cisangkan. Ada yang bisa saya bantu?",
      "Selamat datang! Saya siap membantu informasi produk concrete kami."
    ],
    help: [
      "Saya bisa membantu dengan: \n- Informasi produk \n- Spesifikasi teknis \n- Harga \n- Pemesanan \n\nProduk apa yang Anda minati?",
      "Kami menyediakan berbagai produk concrete. Anda bisa menanyakan tentang:\n- Concrete Roof\n- Paving Block\n- Concrete Block\n- Utility Products\n\nProduk mana yang ingin Anda tanyakan?"
    ],
    products: {
      general: "Kami menyediakan produk dalam beberapa kategori utama:\n\n1. Concrete Roof (Genteng Beton)\n2. Paving Block\n3. Concrete Block (Batako)\n4. Utility Products (Pipa Beton, dll)\n\nKategori mana yang ingin Anda ketahui lebih detail?",
      
      concreteRoof: {
        types: "Concrete Roof kami terdiri dari:\n\n1. Genteng Neo (Premium)\n   - Flat Tile\n   - Dual Slate\n   - Floral\n\n2. Victoria Series\n   - Onyx\n   - Multiline\n   - Slate\n   - Pine\n   - Classic\n\n3. Genteng Gelombang\n   - New Royal\n   - Oriental\n   - Majestic\n\n4. Solusi Bocor\n   - Dry System\n   - CIS Flashing\n\n5. Cat Genteng\n   - Water Base\n   - Solvent Base\n\n6. Panel Surya\n\nTipe mana yang ingin Anda ketahui?",
        neo: {
          general: "Genteng Neo (Premium):\n- Material: Beton berkualitas tinggi\n- Ketahanan: Tahan cuaca ekstrim\n- Garansi: 10 tahun\n\nTersedia dalam varian:\n- Flat Tile\n- Dual Slate\n- Floral\n\nVarian mana yang Anda minati?",
          flatTile: "Genteng Neo Flat Tile:\n- Ketebalan: 10mm\n- Dimensi: 420x330mm\n- Berat: 4.5kg/pcs\n- Warna: 8 pilihan\n- Harga: Rp 18.000/pcs (min. order 100pcs)",
          dualSlate: "Genteng Neo Dual Slate:\n- Ketebalan: 11mm\n- Dimensi: 425x335mm\n- Berat: 4.8kg/pcs\n- Warna: 6 pilihan\n- Harga: Rp 21.000/pcs",
          floral: "Genteng Neo Floral:\n- Ketebalan: 12mm\n- Dimensi: 430x340mm\n- Berat: 5.2kg/pcs\n- Warna: 5 pilihan\n- Harga: Rp 25.000/pcs"
        },
        victoria: {
          general: "Victoria Series:\n- Material: Beton premium\n- Ketahanan: Anti lumut\n- Garansi: 15 tahun\n\nTersedia dalam varian:\n- Onyx\n- Multiline\n- Slate\n- Pine\n- Classic\n\nVarian mana yang Anda minati?",
          onyx: "Victoria Onyx:\n- Ketebalan: 9mm\n- Dimensi: 424x337mm\n- Berat: 4.5kg/pcs\n- Warna: 8 pilihan\n- Harga: Rp 18.000/pcs",
          multiline: "Victoria Multiline:\n- Ketebalan: 10mm\n- Dimensi: 426x340mm\n- Berat: 4.8kg/pcs\n- Warna: 5 pilihan\n- Harga: Rp 21.000/pcs",
          slate: "Victoria Slate:\n- Ketebalan: 11mm\n- Dimensi: 430x345mm\n- Berat: 5.2kg/pcs\n- Warna: 4 pilihan\n- Harga: Rp 25.000/pcs",
          pine: "Victoria Pine:\n- Ketebalan: 12mm\n- Dimensi: 435x350mm\n- Berat: 5.5kg/pcs\n- Warna: 3 pilihan\n- Harga: Rp 28.000/pcs",
          classic: "Victoria Classic:\n- Ketebalan: 8mm\n- Dimensi: 420x330mm\n- Berat: 4.2kg/pcs\n- Warna: 6 pilihan\n- Harga: Rp 15.000/pcs"
        },
        wave: {
          general: "Genteng Gelombang:\n- Desain: Bergelombang untuk drainase optimal\n- Kekuatan: K300\n\nTersedia dalam varian:\n- New Royal\n- Oriental\n- Majestic\n\nVarian mana yang Anda minati?",
          newRoyal: "New Royal:\n- Dimensi: 1800x1050mm\n- Berat: 45kg/pcs\n- Warna: Grey, Red, Brown\n- Harga: Rp 120.000/pcs",
          oriental: "Oriental:\n- Dimensi: 1750x1000mm\n- Berat: 42kg/pcs\n- Warna: Grey, Red\n- Harga: Rp 110.000/pcs",
          majestic: "Majestic:\n- Dimensi: 1700x950mm\n- Berat: 40kg/pcs\n- Warna: Grey\n- Harga: Rp 100.000/pcs"
        },
        leakSolution: {
          general: "Solusi Bocor:\n1. Dry System\n   - Sistem pemasangan anti bocor\n   - Harga: Rp 15.000/m\n\n2. CIS Flashing\n   - Pelindung sambungan atap\n   - Harga: Rp 12.000/m\n\nProduk mana yang ingin Anda ketahui?"
        },
        roofPaint: {
          general: "Cat Genteng:\n1. Water Base\n   - Ramah lingkungan\n   - Harga: Rp 85.000/kg\n\n2. Solvent Base\n   - Tahan lama\n   - Harga: Rp 75.000/kg\n\nTipe mana yang Anda butuhkan?"
        },
        solarPanel: "Panel Surya:\n- Daya: 100Wp - 300Wp\n- Garansi: 25 tahun\n- Harga: Rp 1.500.000 - Rp 4.000.000/unit\n- Cocok dipasang dengan genteng beton kami"
      },
      
      pavingBlock: {
        types: "Paving Block kami terdiri dari:\n\n1. Square Set\n2. Classic Set\n3. Altstadt\n4. Others\n5. Guiding Pave\n6. Grass Block\n7. Concrete Tile\n8. Guiding Tiles\n9. Kanstein Wet Process\n10. Kanstein Dry Process\n11. Tali Air\n\nTipe mana yang Anda butuhkan?",
        squareSet: "Square Set:\n- Dimensi: 200x100x60mm\n- Kekuatan: K300-K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 12.000/m² (min. order 50m²)",
        classicSet: "Classic Set:\n- Dimensi: 200x100x60mm\n- Kekuatan: K300-K400\n- Warna: Grey, Red, Brown\n- Harga: Rp 11.500/m²",
        altstadt: "Altstadt:\n- Dimensi: 200x100x80mm\n- Kekuatan: K400\n- Warna: Grey, Red\n- Harga: Rp 15.000/m²",
        grassBlock: "Grass Block:\n- Dimensi: 250x250x100mm\n- Lubang untuk tanaman\n- Harga: Rp 18.000/m²",
        kanstein: {
          general: "Kanstein tersedia dalam:\n1. Wet Process\n   - Kekuatan: K400\n   - Harga: Rp 20.000/m²\n\n2. Dry Process\n   - Kekuatan: K350\n   - Harga: Rp 18.000/m²\n\nProses mana yang Anda butuhkan?"
        }
      },
      
      concreteBlock: {
        types: "Concrete Block (Batako) kami terdiri dari:\n\n1. Standard\n2. Hollow\n3. Press\n4. Ventilation Block\n5. Ventilation Block 3D\n\nTipe mana yang Anda cari?",
        standard: "Batako Standard:\n- Dimensi: 40x20x10cm\n- Kekuatan: K175\n- Harga: Rp 5.000/pcs (min. order 100pcs)",
        hollow: "Batako Hollow:\n- Dimensi: 40x20x15cm\n- Kekuatan: K200\n- Harga: Rp 6.500/pcs",
        press: "Batako Press:\n- Dimensi: 40x20x10cm\n- Kekuatan: K250\n- Harga: Rp 7.000/pcs",
        ventilation: {
          general: "Ventilation Block tersedia dalam:\n1. Standard\n   - Dimensi: 40x20x15cm\n   - Harga: Rp 8.000/pcs\n\n2. 3D\n   - Desain modern\n   - Harga: Rp 10.000/pcs\n\nTipe mana yang Anda butuhkan?"
        }
      },
      
      utility: {
        types: "Utility Products kami meliputi:\n\n1. Concrete Pipe\n   - High Pressure\n   - Low Pressure\n\n2. U-Ditch\n3. Tutup\n4. Box Culvert\n5. Sumur Resapan\n\nProduk mana yang Anda butuhkan?",
        pipe: {
          general: "Concrete Pipe tersedia dalam:\n1. High Pressure\n   - Diameter: 30cm-100cm\n   - Harga: Rp 150.000 - Rp 500.000/pcs\n\n2. Low Pressure\n   - Diameter: 30cm-80cm\n   - Harga: Rp 120.000 - Rp 400.000/pcs\n\nTipe dan diameter mana yang Anda butuhkan?",
          highPressure: "Untuk info detail High Pressure Pipe:\n- Diameter 30cm: Rp 150.000/pcs\n- Diameter 50cm: Rp 250.000/pcs\n- Diameter 80cm: Rp 400.000/pcs\n- Diameter 100cm: Rp 500.000/pcs\n\n(min. order 10pcs)",
          lowPressure: "Untuk info detail Low Pressure Pipe:\n- Diameter 30cm: Rp 120.000/pcs\n- Diameter 50cm: Rp 200.000/pcs\n- Diameter 80cm: Rp 350.000/pcs\n\n(min. order 10pcs)"
        },
        uDitch: "U-Ditch:\n- Dimensi: 60x60x100cm\n- Kekuatan: K300\n- Harga: Rp 300.000/pcs\n(min. order 5pcs)",
        boxCulvert: "Box Culvert:\n- Dimensi: 100x50x50cm\n- Kekuatan: K350\n- Harga: Rp 450.000/pcs\n(min. order 5pcs)",
        sumurResapan: "Sumur Resapan:\n- Diameter: 80cm\n- Tinggi: 100cm\n- Harga: Rp 350.000/unit\n(min. order 3 unit)"
      }
    },
    order: [
      "Untuk pemesanan produk, silahkan hubungi Admin kami via WhatsApp:\n\n📞 0812-1498-3517\n\nAtau klik tombol 'Hubungi Admin' di bagian bawah chat ini.",
      "Saya akan menghubungkan Anda dengan tim penjualan kami. Silahkan hubungi:\n\n📞 0812-1498-3517 (WhatsApp)\n\nTim kami siap membantu proses pemesanan Anda."
    ],
    stock: [
      "Untuk informasi stok terkini, silahkan hubungi Admin kami via WhatsApp:\n\n📞 0812-1498-3517\n\nMohon seputkan produk dan jumlah yang dibutuhkan.",
      "Stok produk kami selalu berubah. Untuk info stok real-time, silahkan hubungi:\n\n📞 0812-1498-3517 (WhatsApp)\n\nKami akan berikan update stok terbaru."
    ],
    contacts: [
      "Kantor Pusat:\nJl. Haji Alpi No 107, Cijerah\nKota Bandung, Jawa Barat\n\n📞 (022) 6031588 (hunting)",
      "Email kami: info@cisangkan.com\n\nJam Operasional:\nSenin-Jumat: 08.00-17.00 WIB"
    ],
    pricing: "Harga dapat berubah sesuai:\n- Lokasi pengiriman\n- Jumlah pemesanan\n- Waktu pemesanan\n\nUntuk info harga terupdate, mohon seputkan:\n1. Produk yang diminta\n2. Jumlah yang dibutuhkan\n3. Alamat pengiriman",
    delivery: "Kami melayani pengiriman ke seluruh Indonesia dengan ketentuan:\n- Minimal order berbeda per produk\n- Ongkir ditanggung pembeli\n- Waktu pengiriman 3-14 hari kerja tergantung lokasi\n- Untuk area Jabodetabek biasanya 3-5 hari kerja",
    payment: "Metode Pembayaran:\n- Transfer Bank (BCA, Mandiri, BRI)\n- Cash On Delivery (COD) khusus area tertentu\n- Pembayaran 50% saat order, 50% sebelum pengiriman\n- Pembayaran lunas mendapat diskon 2%",
    default: [
      "Maaf, saya belum memahami pertanyaan Anda. Berikut hal yang bisa saya bantu:\n1. Info produk\n2. Harga\n3. Stok\n4. Pemesanan\n5. Kontak kami",
      "Boleh diulangi dengan kata lain? Atau Anda bisa menanyakan tentang:\n- Concrete Roof\n- Paving Block\n- Concrete Block\n- Utility Products"
    ]
  };

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      
      // Update user data with conversation history
      if (userData) {
        const updatedUserData = {
          ...userData,
          conversationHistory: messages,
          lastSeen: new Date().toISOString(),
          interests: extractInterests(messages)
        };
        setUserData(updatedUserData);
        localStorage.setItem('chatUserData', JSON.stringify(updatedUserData));
        
        // Send data to CRM (simulated)
        sendToCRM(updatedUserData);
      }
    }
  }, [messages]);

  // Extract user interests from conversation
  const extractInterests = (messages) => {
    const interests = [];
    const productKeywords = {
      concreteRoof: ['atap', 'genteng', 'roof', 'neo', 'victoria', 'gelombang'],
      pavingBlock: ['paving', 'block', 'konblok', 'jalan'],
      concreteBlock: ['batako', 'blok', 'ventilasi'],
      utility: ['pipa', 'uditch', 'culvert', 'sumur', 'resapan']
    };
    
    messages.forEach(msg => {
      if (msg.isUser) {
        const text = msg.text.toLowerCase();
        Object.keys(productKeywords).forEach(key => {
          if (productKeywords[key].some(word => text.includes(word)) && !interests.includes(key)) {
            interests.push(key);
          }
        });
      }
    });
    
    return interests;
  };

  // Simulate sending data to CRM
  const sendToCRM = (userData) => {
    console.log('Sending to CRM:', userData);
  };

  // Request user information if not available
  const requestUserInfo = (type) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let question;
      switch(type) {
        case 'name':
          question = "Sebelum melanjutkan, boleh saya tahu nama Anda?";
          break;
        case 'email':
          question = "Boleh saya tahu alamat email Anda untuk mengirim informasi detail?";
          break;
        case 'phone':
          question = "Untuk konsultasi lebih lanjut, boleh saya tahu nomor WhatsApp Anda?";
          break;
        default:
          question = "Boleh saya tahu nama Anda?";
      }
      
      addBotMessage(question);
      setUserData(prev => ({
        ...prev, 
        awaitingInput: type
      }));
    }, 1000);
  };

  // Process user information response
  const processUserInfo = (type, value) => {
    const updatedUserData = {...userData};
    
    switch(type) {
      case 'name':
        updatedUserData.firstName = value;
        const nameParts = value.split(' ');
        if (nameParts.length > 1) {
          updatedUserData.firstName = nameParts[0];
          updatedUserData.lastName = nameParts.slice(1).join(' ');
        }
        addBotMessage(`Senang berkenalan dengan Anda, ${updatedUserData.firstName}!`);
        break;
      case 'email':
        updatedUserData.email = value;
        addBotMessage("Terima kasih! Email Anda telah tersimpan.");
        break;
      case 'phone':
        updatedUserData.phone = value;
        addBotMessage("Terima kasih! Nomer WhatsApp Anda telah tersimpan.");
        break;
    }
    
    updatedUserData.awaitingInput = null;
    setUserData(updatedUserData);
    localStorage.setItem('chatUserData', JSON.stringify(updatedUserData));
    sendToCRM(updatedUserData);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        if (!userData?.firstName) {
          requestUserInfo('name');
        } else {
          addBotMessage(`Halo kembali ${userData.firstName}! Ada yang bisa saya bantu?`);
        }
      }, 500);
    }
    
    if (userData) {
      const updatedUserData = {
        ...userData,
        pageViews: (userData.pageViews || 0) + 1,
        lastSeen: new Date().toISOString()
      };
      setUserData(updatedUserData);
      localStorage.setItem('chatUserData', JSON.stringify(updatedUserData));
    }
  };

  const addBotMessage = (text) => {
    const newMessage = { text, isUser: false, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (userData?.awaitingInput) {
        const userMessage = { text: message, isUser: true, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        setMessage('');
        processUserInfo(userData.awaitingInput, message);
        return;
      }
      
      const userMessage = { text: message, isUser: true, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      setTimeout(() => {
        generateBotResponse(message);
      }, 1000 + Math.random() * 2000);
    }
  };

  // Enhanced response generation with lead qualification
  const generateBotResponse = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    let response;

    // Check if this might be a lead and request contact info
    const isPotentialLead = /(pesan|order|beli|pemesanan|pembelian|purchase|buy|butuh|memesan|membutuhkan).*(untuk|project|proyek|rumah|perumahan|kantor|gedung)|(project|proyek|rumah|perumahan|kantor|gedung).*(pesan|order|beli|pembelian)/i.test(lowerCaseMsg);

    // Berikan respons terlebih dahulu
    if (/halo|hai|hi|hello|selamat|pagi|siang|sore|malam/.test(lowerCaseMsg)) {
      response = botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } 
    else if (/bantuan|help|tolong|info|informasi|menu|option/.test(lowerCaseMsg)) {
      response = botResponses.help[Math.floor(Math.random() * botResponses.help.length)];
    }
    else if (/produk|barang|item|jenis|tipe|atap|roof|genteng/.test(lowerCaseMsg)) {
      if (/neo|premium/.test(lowerCaseMsg)) {
        if (/flat|datar/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.neo.flatTile;
          setConversationContext('genteng_neo_flat');
        } else if (/dual|slate/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.neo.dualSlate;
          setConversationContext('genteng_neo_dual');
        } else if (/floral/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.neo.floral;
          setConversationContext('genteng_neo_floral');
        } else {
          response = botResponses.products.concreteRoof.neo.general;
          setConversationContext('genteng_neo');
        }
      } 
      else if (/victoria|series/.test(lowerCaseMsg)) {
        if (/onyx/i.test(lowerCaseMsg)) {
           response = botResponses.products.concreteRoof.victoria.onyx;
           setConversationContext('genteng_victoria_onyx');
        } else if (/multiline/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoria.multiline;
          setConversationContext('genteng_victoria_multiline');
        } else if (/slate/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoria.slate;
          setConversationContext('genteng_victoria_slate');
        } else if (/pine/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoria.pine;
          setConversationContext('genteng_victoria_pine');
        } else if (/classic/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.victoria.classic;
          setConversationContext('genteng_victoria_classic');
        } else {
          response = botResponses.products.concreteRoof.victoria.general;
          setConversationContext('genteng_victoria');
        }
      }
      else if (/gelombang|wave|royal|oriental|majestic/.test(lowerCaseMsg)) {
        if (/royal/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.wave.newRoyal;
          setConversationContext('genteng_gelombang_royal');
        } else if (/oriental/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.wave.oriental;
          setConversationContext('genteng_gelombang_oriental');
        } else if (/majestic/.test(lowerCaseMsg)) {
          response = botResponses.products.concreteRoof.wave.majestic;
          setConversationContext('genteng_gelombang_majestic');
        } else {
          response = botResponses.products.concreteRoof.wave.general;
          setConversationContext('genteng_gelombang');
        }
      }
      else if (/bocor|leak|solusi bocor/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteRoof.leakSolution.general;
        setConversationContext('solusi_bocor');
      }
      else if (/cat|paint/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteRoof.roofPaint.general;
        setConversationContext('cat_genteng');
      }
      else if (/surya|panel|solar/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteRoof.solarPanel;
        setConversationContext('panel_surya');
      }
      else {
        response = botResponses.products.concreteRoof.types;
        setConversationContext('genteng');
      }
    }
    else if (/paving|block|konblok|jalan|lantai/.test(lowerCaseMsg)) {
      if (isPotentialLead) {
        response = "Untuk pemesanan paving block, saya dapat membantu!";
        setTimeout(() => {
          if (!userData.phone) {
            addBotMessage("Boleh saya tahu nomor WhatsApp Anda untuk konsultasi lebih lanjut?");
            setUserData(prev => ({...prev, awaitingInput: 'phone'}));
          }
        }, 1500);
      } else if (/square|set/.test(lowerCaseMsg)) {
        response = botResponses.products.pavingBlock.squareSet;
        setConversationContext('paving_square');
      } else if (/classic/.test(lowerCaseMsg)) {
        response = botResponses.products.pavingBlock.classicSet;
        setConversationContext('paving_classic');
      } else if (/altstadt/.test(lowerCaseMsg)) {
        response = botResponses.products.pavingBlock.altstadt;
        setConversationContext('paving_altstadt');
      } else if (/grass|rumput/.test(lowerCaseMsg)) {
        response = botResponses.products.pavingBlock.grassBlock;
        setConversationContext('paving_grass');
      } else if (/kanstein/.test(lowerCaseMsg)) {
        if (/wet/.test(lowerCaseMsg)) {
          response = "Kanstein Wet Process:\n- Kekuatan: K400\n- Harga: Rp 20.000/m²";
          setConversationContext('kanstein_wet');
        } else if (/dry/.test(lowerCaseMsg)) {
          response = "Kanstein Dry Process:\n- Kekuatan: K350\n- Harga: Rp 18.000/m²";
          setConversationContext('kanstein_dry');
        } else {
          response = botResponses.products.pavingBlock.kanstein.general;
          setConversationContext('kanstein');
        }
      } else {
        response = botResponses.products.pavingBlock.types;
        setConversationContext('paving');
      }
    }
    else if (/batako|concrete block|blok|ventilasi|ventilation/.test(lowerCaseMsg)) {
      if (/standard/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteBlock.standard;
        setConversationContext('batako_standard');
      } else if (/hollow/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteBlock.hollow;
        setConversationContext('batako_hollow');
      } else if (/press/.test(lowerCaseMsg)) {
        response = botResponses.products.concreteBlock.press;
        setConversationContext('batako_press');
      } else if (/ventilasi|ventilation/.test(lowerCaseMsg)) {
        if (/3d/.test(lowerCaseMsg)) {
          response = "Ventilation Block 3D:\n- Dimensi: 40x20x15cm\n- Desain modern\n- Harga: Rp 10.000/pcs";
          setConversationContext('ventilation_3d');
        } else {
          response = botResponses.products.concreteBlock.ventilation.general;
          setConversationContext('ventilation');
        }
      } else {
        response = botResponses.products.concreteBlock.types;
        setConversationContext('batako');
      }
    }
    else if (/utility|pipa|pipe|drainase|uditch|culvert|sumur|resapan/.test(lowerCaseMsg)) {
      if (/pipa|pipe/.test(lowerCaseMsg)) {
        if (/high|pressure|tinggi/.test(lowerCaseMsg)) {
          if (/30|tiga puluh/.test(lowerCaseMsg)) {
            response = "High Pressure Pipe Ø30cm:\n- Harga: Rp 150.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_high_30');
          } else if (/50|lima puluh/.test(lowerCaseMsg)) {
            response = "High Pressure Pipe Ø50cm:\n- Harga: Rp 250.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_high_50');
          } else if (/80|delapan puluh/.test(lowerCaseMsg)) {
            response = "High Pressure Pipe Ø80cm:\n- Harga: Rp 400.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_high_80');
          } else if (/100|seratus/.test(lowerCaseMsg)) {
            response = "High Pressure Pipe Ø100cm:\n- Harga: Rp 500.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_high_100');
          } else {
            response = botResponses.products.utility.pipe.highPressure;
            setConversationContext('pipe_high');
          }
        } else if (/low|pressure|rendah/.test(lowerCaseMsg)) {
          if (/30|tiga puluh/.test(lowerCaseMsg)) {
            response = "Low Pressure Pipe Ø30cm:\n- Harga: Rp 120.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_low_30');
          } else if (/50|lima puluh/.test(lowerCaseMsg)) {
            response = "Low Pressure Pipe Ø50cm:\n- Harga: Rp 200.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_low_50');
          } else if (/80|delapan puluh/.test(lowerCaseMsg)) {
            response = "Low Pressure Pipe Ø80cm:\n- Harga: Rp 350.000/pcs\n- Min. order: 10pcs";
            setConversationContext('pipe_low_80');
          } else {
            response = botResponses.products.utility.pipe.lowPressure;
            setConversationContext('pipe_low');
          }
        } else {
          response = botResponses.products.utility.pipe.general;
          setConversationContext('pipe');
        }
      } else if (/uditch|ditch/.test(lowerCaseMsg)) {
        response = botResponses.products.utility.uDitch;
        setConversationContext('uditch');
      } else if (/culvert|box/.test(lowerCaseMsg)) {
        response = botResponses.products.utility.boxCulvert;
        setConversationContext('box_culvert');
      } else if (/sumur|resapan/.test(lowerCaseMsg)) {
        response = botResponses.products.utility.sumurResapan;
        setConversationContext('sumur_resapan');
      } else {
        response = botResponses.products.utility.types;
        setConversationContext('utility');
      }
    }
    else if (/pesan|order|beli|pemesanan|pembelian|purchase|buy/.test(lowerCaseMsg)) {
      response = botResponses.order[Math.floor(Math.random() * botResponses.order.length)];
    }
    else if (/stok|stock|tersedia|ready/.test(lowerCaseMsg)) {
      response = botResponses.stock[Math.floor(Math.random() * botResponses.stock.length)];
    }
    else if (/kontak|alamat|kantor|telpon|telepon|email|lokasi/.test(lowerCaseMsg)) {
      response = botResponses.contacts[Math.floor(Math.random() * botResponses.contacts.length)];
    }
    else if (/harga|price|biaya|cost|berapa|rp|rupiah/.test(lowerCaseMsg)) {
      // Handle harga berdasarkan konteks
      if (conversationContext === 'genteng_neo_flat') {
        response = botResponses.products.concreteRoof.neo.flatTile;
      } else if (conversationContext === 'genteng_neo_dual') {
        response = botResponses.products.concreteRoof.neo.dualSlate;
      } else if (conversationContext === 'genteng_neo_floral') {
        response = botResponses.products.concreteRoof.neo.floral;
      } else {
        response = botResponses.pricing;
      }
    }
    else if (/kirim|pengiriman|ongkos|ongkir|delivery|pengantaran|jasa|ekspedisi/.test(lowerCaseMsg)) {
      response = botResponses.delivery;
    }
    else if (/bayar|pembayaran|payment|dp|uang muka|cash|transfer|cod/.test(lowerCaseMsg)) {
      response = botResponses.payment;
    }
    else if (/warna|varian|color/.test(lowerCaseMsg)) {
      // Handle pertanyaan warna berdasarkan konteks
      if (conversationContext === 'genteng_neo_flat') {
        response = "Genteng Neo Flat Tile tersedia dalam 8 pilihan warna: Merah, Hitam, Coklat, Hijau, Biru, Abu-abu, Terakota, dan Mixed";
      } else if (conversationContext === 'genteng_neo_dual') {
        response = "Genteng Neo Dual Slate tersedia dalam 6 pilihan warna: Merah, Coklat, Hijau, Biru, Abu-abu, Terakota";
      } else if (conversationContext === 'genteng_neo_floral') {
        response = "Genteng Neo Floral tersedia dalam 5 pilihan warna: Merah, Coklat, Hijau, Abu-abu, Terakota";
      } else {
        response = botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
      }
    }
    else {
      response = botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }

    // Kirim respons
    if (response) {
      addBotMessage(response);
    }

    // Setelah memberikan respons, check jika perlu meminta informasi kontak
    if (isPotentialLead && !userData.phone && !userData?.awaitingInput) {
      setTimeout(() => {
        if (!userData.firstName) {
          addBotMessage("Untuk informasi yang lebih akurat, boleh saya tahu nama Anda?");
          setUserData(prev => ({...prev, awaitingInput: 'name'}));
        } else if (!userData.phone) {
          addBotMessage("Terima kasih! Untuk konsultasi lebih lanjut, boleh saya tahu nomor WhatsApp Anda?");
          setUserData(prev => ({...prev, awaitingInput: 'phone'}));
        }
      }, 1500);
    }

    // Follow-up question for engagement
    if (Math.random() > 0.5 && !isTyping) {
      setTimeout(() => {
        const followUps = [
          "Apakah ada hal lain yang ingin Anda ketahui?",
          "Bisa saya bantu dengan informasi lainnya?",
          "Apakah informasi yang saya berikan sudah jelas?"
        ];
        addBotMessage(followUps[Math.floor(Math.random() * followUps.length)]);
      }, 2000);
    }
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
          className="bg-[#2957A4] text-white p-3 2xl:p-4 rounded-full shadow-lg hover:bg-[#0B1F3A] hover:scale-105 transition-transform duration-300"
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
          {/* Notification badge if user has interests */}
          {userData?.interests && userData.interests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {userData.interests.length}
            </span>
          )}
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