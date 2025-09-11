// pages/api/verify-email.js
import dns from 'dns/promises';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.query;
  const domain = email.split('@')[1];

  try {
    const mxRecords = await dns.resolveMx(domain);
    const hasMailServer = mxRecords && mxRecords.length > 0;

    return res.status(200).json({ isValid: hasMailServer });
  } catch (err) {
    return res.status(200).json({ isValid: false });
  }
}



// app/api/verify-email/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email tidak ditemukan' }), {
      status: 400,
    });
  }

  // dummy check
  const isValid =
    email.endsWith('@gmail.com') || email.endsWith('@yahoo.com');

  return new Response(JSON.stringify({ isValid }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
