// Vercel serverless function: adds a signup to Brayden's Kit form.
// Needs two environment variables in Vercel: KIT_API_KEY and KIT_FORM_ID.

const KIT = 'https://api.kit.com/v4';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, company } = req.body || {};

  // Honeypot: real people never fill the hidden "company" field.
  if (company) return res.status(200).json({ ok: true });

  const address = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) || address.length > 254) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const { KIT_API_KEY, KIT_FORM_ID } = process.env;
  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error('Missing KIT_API_KEY or KIT_FORM_ID');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Kit-Api-Key': KIT_API_KEY,
  };

  try {
    // 1. Create the subscriber (or update the existing one).
    const created = await fetch(`${KIT}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: address }),
    });
    if (!created.ok) {
      console.error('Kit create subscriber failed', created.status, await created.text());
      return res.status(502).json({ error: 'Signup failed' });
    }

    // 2. Add them to the signup form so they get the form's confirmation/welcome flow.
    const added = await fetch(`${KIT}/forms/${KIT_FORM_ID}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email_address: address,
        referrer: req.headers.referer || 'https://braydenblackcoaching.com',
      }),
    });
    if (!added.ok) {
      console.error('Kit add to form failed', added.status, await added.text());
      return res.status(502).json({ error: 'Signup failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Kit request error', err);
    return res.status(502).json({ error: 'Signup failed' });
  }
};
