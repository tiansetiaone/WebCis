import { saveContactToSheet } from '../../../../lib/googleSheets';

export async function POST(request) {
  try {
    const { name, email, phone, address, message, formType = 'General' } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: 'Nama, email, dan pesan wajib diisi'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const sheetName = formType === 'Kiosk' ? 'KioskContacts' : 'StoreContacts';
    
    await saveContactToSheet({
      name,
      email,
      phone: phone || '',
      address: address || '',
      message
    }, sheetName);

    return new Response(JSON.stringify({
      success: true,
      message: 'Data berhasil disimpan'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: 'Terjadi kesalahan server',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Explicitly define other HTTP methods
export async function GET() {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405
  });
}

export async function PUT() {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405
  });
}