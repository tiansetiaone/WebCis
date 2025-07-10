import { saveToGoogleSheet } from '../../lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { document, name, email, phone } = req.body;
    
    if (!document || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to Google Sheet
    await saveToGoogleSheet({
      document,
      name,
      email,
      phone: phone || ''
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving download data:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

// import { saveDownloadData } from '../../lib/downloads';

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { document, name, email, phone } = req.body;
      
//       if (!document || !name || !email) {
//         return res.status(400).json({ error: 'Data tidak lengkap' });
//       }

//       const savedData = saveDownloadData({
//         document,
//         name,
//         email, 
//         phone,
//         timestamp: new Date().toISOString()
//       });

//       return res.status(200).json({ 
//         success: true,
//         data: savedData
//       });

//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ error: error.message });
//     }
//   }

//   return res.status(405).json({ error: 'Method not allowed' });
// }