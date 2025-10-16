// pages/api/saveLead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, status } = req.body;

    // TODO: Simpan ke database atau Google Sheets
    console.log('Lead baru:', name, phone, email, status);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan data lead' });
  }
}
