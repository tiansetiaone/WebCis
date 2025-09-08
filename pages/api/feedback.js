import { saveFeedbackToGoogleSheet } from '../../lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, document, relevance, stage } = req.query;
    
    if (!email) {
      return res.redirect('/feedback-thanks?error=missing_email');
    }

    // Simpan feedback ke Google Sheets
    await saveFeedbackToGoogleSheet({
      email: decodeURIComponent(email),
      document: document ? decodeURIComponent(document) : 'Tidak diketahui',
      relevance: relevance || '',
      stage: stage || '',
      timestamp: new Date().toISOString()
    });

    // Redirect ke halaman terima kasih dengan parameter yang relevan
    let redirectUrl = '/feedback-thanks?success=true';
    if (document) redirectUrl += `&document=${document}`;
    if (relevance) redirectUrl += `&relevance=${relevance}`;
    
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.redirect('/feedback-thanks?error=server_error');
  }
}