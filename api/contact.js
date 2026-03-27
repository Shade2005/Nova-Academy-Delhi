export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, course, message } = req.body;

  if (!name && !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey   = process.env.CALLMEBOT_API_KEY;
  const myPhone  = process.env.MY_PHONE_NUMBER || '918929243913'; // without +

  const text =
    `📋 *New Inquiry – Nova Academy*\n\n` +
    `👤 *Name:* ${name || '—'}\n` +
    `📞 *Phone:* ${phone || '—'}\n` +
    `📚 *Grade / Course:* ${course || '—'}\n` +
    `💬 *Message:* ${message || '—'}`;

  try {
    const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${myPhone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
    const waRes = await fetch(waUrl);

    if (!waRes.ok) {
      throw new Error(`CallMeBot responded with ${waRes.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('WhatsApp send error:', err);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
