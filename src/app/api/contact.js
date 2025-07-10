import { saveContactToSheet } from '../../../lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Request received:', req.body); // Log request body

  try {
    const { name, email, phone, address, message, formType = 'General' } = req.body;
    
    // Validasi data
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi' });
    }

    const sheetName = formType === 'Kiosk' ? 'KioskContacts' : 'StoreContacts';
    console.log(`Attempting to save to sheet: ${sheetName}`);

    // Simpan ke Google Sheets
    const result = await saveContactToSheet({
      name,
      email,
      phone: phone || '',
      address: address || '',
      message
    }, sheetName);

    console.log('Save result:', result);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}