import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, ArrowRight, Check, Loader2, RotateCcw } from 'lucide-react'
import { contactPage, profile } from '../data/content.js'
import { EXPO } from '../lib/motion.js'

const FIELD =
  'w-full rounded-xl border bg-cream/[0.03] px-4 py-3 text-cream placeholder:text-cream-mut/70 outline-none transition-colors focus:border-ember/60 focus:bg-cream/[0.05]'
const OK = 'border-cream/12'
const BAD = 'border-ember/70'

const EMPTY = { name: '', email: '', company: '', projectType: '', budget: '', message: '', website: '' }

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please tell me your name.'
  if (!isEmail(v.email)) e.email = 'A valid email so I can reply.'
  if (v.message.trim().length < 10) e.message = 'A sentence or two about the problem helps.'
  return e
}

// No backend configured → open a pre-filled email instead of dropping the message.
function mailtoFallback(v) {
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.company && `Company: ${v.company}`,
    v.projectType && `Project type: ${v.projectType}`,
    v.budget && `Budget: ${v.budget}`,
    '',
    v.message,
  ]
    .filter(Boolean)
    .join('\n')
  const subject = `New project enquiry from ${v.name}`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-mut">{label}</span>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ember-soft"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [delivery, setDelivery] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const set = (k) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [k]: value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    setErrorMessage('')

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    if (!contactPage.endpoint) {
      mailtoFallback(values)
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const { website, ...payload } = values
      const res = await fetch(contactPage.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      const errorDetail =
        typeof data.error === 'string'
          ? data.error
          : data.error?.message || (data.error ? JSON.stringify(data.error) : '')
      if (!res.ok) throw new Error(errorDetail || `Request failed: ${res.status}`)
      if (data.ok !== true) throw new Error('The mail server did not confirm the message.')
      setDelivery(data)
      setStatus('sent')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : error && typeof error === 'object'
          ? error.message || JSON.stringify(error)
          : 'The message could not be sent.'
      setErrorMessage(message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EXPO }}
        className="u-card flex flex-col items-start p-8 sm:p-10"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ember/15 text-ember">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="u-display mt-5 text-3xl text-cream">Message on its way.</h3>
        <p className="mt-3 max-w-[52ch] text-cream-dim">
          Thanks{values.name ? `, ${values.name.split(' ')[0]}` : ''}. I’ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY)
            setErrors({})
            setDelivery(null)
            setErrorMessage('')
            setStatus('idle')
          }}
          className="u-btn-ghost mt-7"
        >
          <RotateCcw className="h-4 w-4" /> Send another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="u-card relative p-6 sm:p-8">
      {/* Honeypot - hidden from humans, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={set('website')}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name *" error={errors.name}>
          <input
            name="name"
            value={values.name}
            onChange={set('name')}
            placeholder="Jane Cooper"
            autoComplete="name"
            className={`${FIELD} ${errors.name ? BAD : OK}`}
          />
        </Field>

        <Field label="Email *" error={errors.email}>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={set('email')}
            placeholder="jane@company.com"
            autoComplete="email"
            className={`${FIELD} ${errors.email ? BAD : OK}`}
          />
        </Field>

        <Field label="Company" className="sm:col-span-2">
          <input
            name="company"
            value={values.company}
            onChange={set('company')}
            placeholder="Optional"
            autoComplete="organization"
            className={`${FIELD} ${OK}`}
          />
        </Field>

        <Field label="What do you need?">
          <select name="projectType" value={values.projectType} onChange={set('projectType')} className={`${FIELD} ${OK}`}>
            <option value="">Choose one…</option>
            {contactPage.projectTypes.map((t) => (
              <option key={t} value={t} className="bg-base-850">
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget">
          <select name="budget" value={values.budget} onChange={set('budget')} className={`${FIELD} ${OK}`}>
            <option value="">Choose one…</option>
            {contactPage.budgets.map((b) => (
              <option key={b} value={b} className="bg-base-850">
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project details *" error={errors.message} className="sm:col-span-2">
          <textarea
            name="message"
            rows={6}
            value={values.message}
            onChange={set('message')}
            placeholder="What’s the repetitive task, who does it today, and how many hours a week does it eat?"
            className={`${FIELD} resize-y ${errors.message ? BAD : OK}`}
          />
        </Field>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-5 flex items-start gap-2 rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-cream-dim"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>
              {errorMessage && `${errorMessage} `}
              That didn’t go through. Email me at{' '}
              <a href={`mailto:${profile.email}`} className="text-cream underline decoration-ember/60 underline-offset-4">
                {profile.email}
              </a>{' '}
              and I’ll pick it up from there.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={status === 'sending' ? undefined : { scale: 1.02 }}
          whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.2, ease: EXPO }}
          className="u-btn-primary w-full px-7 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="h-5 w-5" />
            </>
          )}
        </motion.button>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-mut">{contactPage.responseTime}</p>
      </div>
    </form>
  )
}
