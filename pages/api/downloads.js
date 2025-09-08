import { saveToGoogleSheet } from '../../lib/googleSheets';
import nodemailer from 'nodemailer';
// import { Client } from 'whatsapp-web.js'; // opsional kalau mau WA


// Fungsi untuk mendapatkan base URL dengan fallback
function getBaseUrl(req) {
  // Gunakan BASE_URL dari environment variables jika ada
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  // Fallback: Gunakan Vercel URL jika tersedia
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback untuk development: Gunakan host dari request
  if (process.env.NODE_ENV === 'development' && req) {
    const host = req.headers.host;
    return `http://${host}`;
  }
  
  // Fallback terakhir
  return 'https://cisangkan.com';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { document, name, email, phone } = req.body;
    
    if (!document || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save to Google Sheet
    await saveToGoogleSheet({ document, name, email, phone: phone || '' });

    // 2. Kirim email feedback otomatis dengan template HTML
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false, // bypass SSL self-signed
      }
    });

    // Template HTML email
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Terima Kasih Telah Mengunduh</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                background-color: #f5f7f9;
                color: #333;
                line-height: 1.6;
            }
            
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .email-header {
                background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            
            .email-body {
                padding: 30px;
            }
            
            .email-footer {
                background-color: #f1f5f9;
                padding: 20px;
                text-align: center;
                font-size: 14px;
                color: #64748b;
            }
            
            h1 {
                font-size: 28px;
                margin-bottom: 15px;
            }
            
            h2 {
                font-size: 22px;
                color: #2563eb;
                margin: 25px 0 15px;
            }
            
            p {
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .button {
                display: inline-block;
                background-color: #2563eb;
                color: white;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 600;
                margin: 20px 0;
                transition: background-color 0.3s;
            }
            
            .button:hover {
                background-color: #1e40af;
            }
            
            .question-container {
                background-color: #f8fafc;
                border-left: 4px solid #2563eb;
                padding: 20px;
                margin: 25px 0;
                border-radius: 0 5px 5px 0;
            }
            
            .options {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin: 15px 0;
            }
            
            .option-button {
                background-color: #e2e8f0;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .option-button:hover {
                background-color: #cbd5e1;
            }
            
            .option-button.selected {
                background-color: #2563eb;
                color: white;
            }
            
            .divider {
                height: 1px;
                background-color: #e2e8f0;
                margin: 25px 0;
            }
            
            .contact-info {
                text-align: center;
                margin-top: 20px;
            }
            .logo-cisangkan {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
            
            .logo-cisangkan img {
              max-width: 300px;
              width: 100%;
              align-items: center;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 0;
                    border-radius: 0;
                }
                
                .options {
                    flex-direction: column;
                }
                
                .option-button {
                    width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Terima Kasih Telah Mengunduh</h1>
                <p>Kami menghargai minat Anda pada konten kami</p>
            </div>
            
            <div class="email-body">
              <div class="logo-cisangkan">
                <img src="https://uploads.onecompiler.io/43q35qej6/43w3g2kmw/logo.png" alt="logo-cisangkan" />
              </div>
                <p>Halo ${name},</p>
                
                <p>Terima kasih telah mengunduh <strong>${document}</strong> dari kami. Kami harap Anda menemukan informasi yang berharga di dalamnya.</p>
                
                <div class="question-container">
                    <h2>Bantu kami memahami kebutuhan Anda</h2>
                    <p>Untuk memberikan konten yang lebih relevan di masa depan, dapatkah Anda menjawab pertanyaan singkat berikut?</p>
                    
                    <div class="divider"></div>
                    
                    <h3>Seberapa relevan informasi dalam dokumen ini dengan kebutuhan Anda saat ini?</h3>
                    <div class="options">
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodedEmail}&document=${encodedDocument}&relevance=sangat" class="option-button">Sangat Relevan</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=cukup" class="option-button">Cukup Relevan</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=kurang" class="option-button">Kurang Relevan</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=tidak" class="option-button">Tidak Relevan</a>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <h3>Dalam tahap apa Anda berada terkait dengan topik ini?</h3>
                    <div class="options">
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=riset" class="option-button">Riset Awal</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=evaluasi" class="option-button">Evaluasi Opsi</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=keputusan" class="option-button">Pengambilan Keputusan</a>
                        <a href="${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=implementasi" class="option-button">Implementasi</a>
                    </div>
                </div>
                
                <p>Dengan memahami kebutuhan Anda lebih baik, kami dapat menyediakan konten dan solusi yang lebih tepat untuk bisnis Anda.</p>
                
                <div style="text-align: center;">
                    <a href="${process.env.BASE_URL}/feedback-form?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}" class="button">Jawab Pertanyaan</a>
                </div>
                
                <p>Atau balas email ini dengan pertanyaan atau kebutuhan spesifik Anda - kami senang dapat membantu!</p>
            </div>
            
            <div class="email-footer">
                <p>© 2025 PT Cisangkan. Semua hak dilindungi.</p>
                <p>Jl. Haji Alpi No 107, Cijerah, Bandung 40221</br>
                    Telp. (022) 6031588 (hunting) | Fax. (022) 6030467</p>
                <p><a href="${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #2563eb;">Berhenti berlangganan</a> | <a href="${process.env.BASE_URL}/email-preferences?email=${encodeURIComponent(email)}" style="color: #2563eb;">Preferensi Email</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Versi teks biasa untuk klien email yang tidak mendukung HTML
    const textVersion = `
Halo ${name},

Terima kasih telah mengunduh "${document}" dari PT Cisangkan. Kami harap Anda menemukan informasi yang berharga di dalamnya.

Bantu kami memahami kebutuhan Anda:
1. Seberapa relevan informasi dalam dokumen ini dengan kebutuhan Anda saat ini?
   - Sangat Relevan: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=sangat
   - Cukup Relevan: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=cukup
   - Kurang Relevan: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=kurang
   - Tidak Relevan: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&relevance=tidak

2. Dalam tahap apa Anda berada terkait dengan topik ini?
   - Riset Awal: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=riset
   - Evaluasi Opsi: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=evaluasi
   - Pengambilan Keputusan: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=keputusan
   - Implementasi: ${process.env.BASE_URL}/api/feedback?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}&stage=implementasi

Atau kunjungi halaman berikut untuk menjawab semua pertanyaan sekaligus:
${process.env.BASE_URL}/feedback-form?email=${encodeURIComponent(email)}&document=${encodeURIComponent(document)}

Dengan memahami kebutuhan Anda lebih baik, kami dapat menyediakan konten dan solusi yang lebih tepat untuk bisnis Anda.

Hormat kami,
Tim PT Cisangkan
Jl. Haji Alpi No 107, Cijerah, Bandung 40221
Telp. (022) 6031588 | Fax. (022) 6030467

Berhenti berlangganan: ${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}
`;

    await transporter.sendMail({
      from: `"PT Cisangkan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Terima kasih telah mengunduh ${document}`,
      html: htmlTemplate,
      text: textVersion
    });

    // 3. (Opsional) Kirim WhatsApp feedback
    // if (phone) {
    //   await sendWhatsAppMessage(phone, `Halo ${name}, terima kasih sudah mengunduh dokumen "${document}". Tim kami akan segera menghubungi Anda.`);
    // }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving download data:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}