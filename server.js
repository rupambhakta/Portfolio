import 'dotenv/config'
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const indexFile = path.join(distDir, 'index.html')
const port = Number(process.env.PORT || 3000)
const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'TO_EMAIL']

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(data))
}

function getErrorMessage(error) {
  if (!error) return 'An unknown error occurred.'
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  try {
    return String(error.message || error.error || JSON.stringify(error))
  } catch {
    return 'An unknown error occurred.'
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function isEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim())
}

function validate(body) {
  const errors = {}
  if (!body.name || String(body.name).trim().length < 2) errors.name = 'Name is required.'
  if (!isEmail(body.email)) errors.email = 'A valid email is required.'
  if (!body.message || String(body.message).trim().length < 10) errors.message = 'Message is too short.'
  return errors
}

async function readJson(req) {
  const chunks = []
  let size = 0

  for await (const chunk of req) {
    size += chunk.length
    if (size > 1024 * 32) throw Object.assign(new Error('Payload too large'), { status: 413 })
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

async function handleContact(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  const missing = requiredEnv.filter((key) => !process.env[key])
  if (missing.length) {
    console.error(`Missing email environment variables: ${missing.join(', ')}`)
    return json(res, 500, { error: 'Email service is not configured.' })
  }

  let body
  try {
    body = await readJson(req)
  } catch (error) {
    return json(res, error.status || 400, { error: 'Invalid request body.' })
  }

  const errors = validate(body)
  if (Object.keys(errors).length) return json(res, 422, { error: 'Validation failed.', fields: errors })

  const enquiry = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    company: String(body.company || '').trim(),
    projectType: String(body.projectType || '').trim(),
    budget: String(body.budget || '').trim(),
    message: String(body.message).trim(),
  }

  const subject = `New project enquiry - ${enquiry.name}`
  const text = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.company && `Company: ${enquiry.company}`,
    enquiry.projectType && `Project type: ${enquiry.projectType}`,
    enquiry.budget && `Budget: ${enquiry.budget}`,
    '',
    enquiry.message,
  ]
    .filter(Boolean)
    .join('\n')

  const htmlRows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Company', enquiry.company],
    ['Project type', enquiry.projectType],
    ['Budget', enquiry.budget],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  try {
    const info = await transporter.sendMail({
      from: { name: 'Portfolio Contact', address: process.env.SMTP_USER },
      to: process.env.TO_EMAIL,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject,
      text,
      html: `
        <h2>New portfolio enquiry</h2>
        <table>${htmlRows}</table>
        <h3>Project details</h3>
        <p style="white-space:pre-line">${escapeHtml(enquiry.message)}</p>
      `,
    })

    const accepted = info.accepted || []
    const rejected = info.rejected || []
    const acceptedRecipient = accepted.some(
      (email) => String(email).toLowerCase() === String(process.env.TO_EMAIL).toLowerCase(),
    )

    if (!acceptedRecipient) {
      console.error('Contact email was not accepted by SMTP:', { accepted, rejected, response: info.response })
      return json(res, 502, { error: 'Recipient was not accepted by the email server.', accepted, rejected })
    }

    console.log('Contact email accepted by SMTP:', {
      messageId: info.messageId,
      accepted,
      rejected,
      response: info.response,
    })
    return json(res, 200, { ok: true, messageId: info.messageId, accepted, rejected })
  } catch (error) {
    const message = getErrorMessage(error)
    console.error('Contact email failed:', message, error)
    return json(res, 502, { error: message || 'Message could not be sent.' })
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const decodedPath = decodeURIComponent(url.pathname)
  const safePath = path.normalize(decodedPath).replace(/^[/\\]+/, '')
  const requestedPath = path.resolve(distDir, safePath || 'index.html')
  const isStaticFile =
    requestedPath.startsWith(`${distDir}${path.sep}`) && existsSync(requestedPath) && statSync(requestedPath).isFile()
  const filePath = isStaticFile ? requestedPath : indexFile

  if (!existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Build output not found. Run `npm run build` before `npm start`.')
    return
  }

  const ext = path.extname(filePath)
  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'Cache-Control': filePath === indexFile ? 'no-cache' : 'public, max-age=31536000, immutable',
  })
  createReadStream(filePath).pipe(res)
}

createServer(async (req, res) => {
  if (req.url?.startsWith('/api/contact')) {
    await handleContact(req, res)
    return
  }

  serveStatic(req, res)
}).listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`)
})
