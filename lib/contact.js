// Contact-enquiry handling, shared by both runtimes: the local Node server
// (server.js, `npm start`) and the Vercel serverless function (api/contact.js).
// Neither one owns this logic, so the two can never drift apart.
//
// handleEnquiry() takes a parsed body and returns { status, body } — the caller
// only has to serialise it. Env vars come from .env locally and from the Vercel
// project settings in production.
import nodemailer from 'nodemailer'

export const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'TO_EMAIL']

export const missingEnv = () => requiredEnv.filter((key) => !process.env[key])

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

export function validate(body) {
  const errors = {}
  if (!body.name || String(body.name).trim().length < 2) errors.name = 'Name is required.'
  if (!isEmail(body.email)) errors.email = 'A valid email is required.'
  if (!body.message || String(body.message).trim().length < 10) errors.message = 'Message is too short.'
  return errors
}

function normalise(body) {
  return {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    company: String(body.company || '').trim(),
    projectType: String(body.projectType || '').trim(),
    budget: String(body.budget || '').trim(),
    message: String(body.message).trim(),
  }
}

function compose(enquiry) {
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

  const rows = [
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

  return {
    subject: `New project enquiry - ${enquiry.name}`,
    text,
    html: `
        <h2>New portfolio enquiry</h2>
        <table>${rows}</table>
        <h3>Project details</h3>
        <p style="white-space:pre-line">${escapeHtml(enquiry.message)}</p>
      `,
  }
}

export async function handleEnquiry(body = {}) {
  const missing = missingEnv()
  if (missing.length) {
    console.error(`Missing email environment variables: ${missing.join(', ')}`)
    return { status: 500, body: { error: 'Email service is not configured.' } }
  }

  const errors = validate(body)
  if (Object.keys(errors).length) {
    return { status: 422, body: { error: 'Validation failed.', fields: errors } }
  }

  const enquiry = normalise(body)
  const { subject, text, html } = compose(enquiry)

  // Built per request rather than at module load: on serverless the module can
  // be evaluated before the env vars are read, and a pooled connection would
  // not survive between invocations anyway.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  try {
    const info = await transporter.sendMail({
      from: { name: 'Portfolio Contact', address: process.env.SMTP_USER },
      to: process.env.TO_EMAIL,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject,
      text,
      html,
    })

    const accepted = info.accepted || []
    const rejected = info.rejected || []
    const acceptedRecipient = accepted.some(
      (email) => String(email).toLowerCase() === String(process.env.TO_EMAIL).toLowerCase(),
    )

    if (!acceptedRecipient) {
      console.error('Contact email was not accepted by SMTP:', { accepted, rejected, response: info.response })
      return {
        status: 502,
        body: { error: 'Recipient was not accepted by the email server.', accepted, rejected },
      }
    }

    console.log('Contact email accepted by SMTP:', {
      messageId: info.messageId,
      accepted,
      rejected,
      response: info.response,
    })
    return { status: 200, body: { ok: true, messageId: info.messageId, accepted, rejected } }
  } catch (error) {
    const message = getErrorMessage(error)
    console.error('Contact email failed:', message, error)
    return { status: 502, body: { error: message || 'Message could not be sent.' } }
  }
}
