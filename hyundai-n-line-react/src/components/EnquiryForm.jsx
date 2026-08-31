import { useState } from 'react'
import { SITE } from '../config.js'

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  model: SITE.modelName,
  showroom: SITE.showroom,
  message: '',
  consent: false,
  website: '',
}

export default function EnquiryForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((old) => ({ ...old, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!form.consent) {
      setStatus({
        type: 'error',
        message: 'Please accept the consent checkbox before submitting.',
      })
      return
    }

    // Honeypot field: silently stop obvious bot submissions.
    if (form.website) {
      setStatus({
        type: 'success',
        message: 'Thank you. Your enquiry has been sent successfully.',
      })
      setForm(initial)
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      setStatus({
        type: 'error',
        message: 'Enquiry service is not configured yet.',
      })
      return
    }

    setSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const payload = {
        access_key: accessKey,
        subject: `New ${form.model || 'Hyundai N Line'} Enquiry - ${form.firstName} ${form.lastName}`,
        from_name: 'Hyundai Website',
        email: form.email,
        'First Name': form.firstName,
        'Last Name': form.lastName,
        'Mobile Number': form.mobile,
        'Interested Model': form.model,
        'Preferred Showroom': form.showroom,
        'Marketing Consent': form.consent ? 'Yes' : 'No',
        Message: form.message || '(No message provided)',
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.success !== true) {
        console.error('Web3Forms submission failed:', {
          status: response.status,
          data,
        })

        throw new Error(
          data.message ||
            (response.status === 403
              ? 'This website domain is not currently allowed by the enquiry service.'
              : 'Unable to send your enquiry right now.')
        )
      }

      setStatus({
        type: 'success',
        message: 'Thank you. Your enquiry has been sent successfully.',
      })
      setForm(initial)
    } catch (error) {
      console.error('Enquiry submission error:', error)
      setStatus({
        type: 'error',
        message: error?.message || 'Unable to send your enquiry right now. Please try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <input
        className="hp-field"
        name="website"
        value={form.website}
        onChange={update}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="form-grid two">
        <label>
          FIRST NAME
          <input required name="firstName" value={form.firstName} onChange={update} placeholder="John" />
        </label>
        <label>
          LAST NAME
          <input required name="lastName" value={form.lastName} onChange={update} placeholder="Doe" />
        </label>
      </div>

      <div className="form-grid two">
        <label>
          EMAIL ADDRESS
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder="john.doe@example.com"
          />
        </label>
        <label>
          MOBILE NUMBER
          <input
            required
            name="mobile"
            value={form.mobile}
            onChange={update}
            placeholder="+94 XXX XXXX"
          />
        </label>
      </div>

      <div className="form-grid two">
        <label>
          INTERESTED MODEL
          <select name="model" value={form.model} onChange={update}>
            <option>{SITE.modelName}</option>
          </select>
        </label>
        <label>
          PREFERRED SHOWROOM
          <select name="showroom" value={form.showroom} onChange={update}>
            <option>{SITE.showroom}</option>
          </select>
        </label>
      </div>

      <label>
        MESSAGE (OPTIONAL)
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          rows="5"
          placeholder="Tell us what you'd like to know"
          maxLength="2000"
        />
      </label>

      <label className="consent-row">
        <input type="checkbox" name="consent" checked={form.consent} onChange={update} />
        <span>
          I consent to Hyundai Sri Lanka (Abans Auto) contacting me regarding this enquiry and other marketing communications.
        </span>
      </label>

      {status.message && (
        <div className={`form-status ${status.type}`} role="status">
          {status.message}
        </div>
      )}

      <button className="submit-btn" type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
