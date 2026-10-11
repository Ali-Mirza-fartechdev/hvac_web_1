// Vercel serverless function: POST /api/estimate
// Validates the form and logs it. To receive requests by email, add one of the
// "delivery" options below (Resend, Formspree, a CRM webhook) and set the env vars in Vercel.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max)
  const data = {
    zip: clean(body.zip, 20),
    property: clean(body.property, 80),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    details: clean(body.details),
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email) || !data.zip) {
    return res.status(400).json({ ok: false, error: 'ZIP code and a valid email are required.' })
  }

  // --- delivery option: Resend (set RESEND_API_KEY, ESTIMATE_TO, ESTIMATE_FROM) ---
  if (process.env.RESEND_API_KEY && process.env.ESTIMATE_TO && process.env.ESTIMATE_FROM) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ESTIMATE_FROM,
        to: process.env.ESTIMATE_TO,
        reply_to: data.email,
        subject: `New AERIS estimate request (${data.zip})`,
        text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'),
      }),
    })
    if (!r.ok) return res.status(502).json({ ok: false, error: 'Could not deliver the request.' })
  } else {
    console.log('Estimate request (no delivery configured):', data)
  }

  return res.status(200).json({ ok: true })
}

function safeParse(s) { try { return JSON.parse(s) } catch { return {} } }
