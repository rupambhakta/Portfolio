// Vercel serverless function behind POST /api/contact — the production
// counterpart to the /api/contact branch in server.js, which only runs locally
// under `npm start`. Both delegate to lib/contact.js.
//
// Vercel parses a JSON request body into req.body for us. The SMTP_* and
// TO_EMAIL vars must be set in the Vercel project settings; without them this
// answers 500 rather than attempting to send.
import { handleEnquiry } from '../lib/contact.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { status, body } = await handleEnquiry(req.body || {})
  return res.status(status).json(body)
}
