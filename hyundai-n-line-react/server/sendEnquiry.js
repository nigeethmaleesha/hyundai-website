import nodemailer from 'nodemailer'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class EnquiryError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'EnquiryError'
    this.status = status
  }
}

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max)
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]))
}

export async function sendEnquiry(rawBody = {}) {
  const body = rawBody || {}

  // Honeypot. Silently accept bots without sending mail.
  if (clean(body.website, 200)) return { ok: true }

  const enquiry = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 160),
    mobile: clean(body.mobile, 60),
    model: clean(body.model, 120),
    showroom: clean(body.showroom, 160),
    message: clean(body.message, 2000),
    consent: body.consent === true,
  }

  if (!enquiry.firstName || !enquiry.lastName || !enquiry.email || !enquiry.mobile || !enquiry.consent) {
    throw new EnquiryError('Please complete all required fields.', 400)
  }

  if (!EMAIL_PATTERN.test(enquiry.email)) {
    throw new EnquiryError('Please enter a valid email address.', 400)
  }

  const gmailUser = clean(process.env.GMAIL_USER || 'kamkanamlage394@gmail.com', 200)
  // Google displays app passwords in groups. Removing spaces makes either pasted format work.
  const gmailPassword = String(process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')
  const recipient = clean(process.env.ENQUIRY_TO_EMAIL || 'kamkanamlage394@gmail.com', 200)
  const fromName = clean(process.env.EMAIL_FROM_NAME || 'Hyundai Website', 100)

  if (!gmailPassword) {
    throw new EnquiryError('Email service is not configured. Add GMAIL_APP_PASSWORD to the .env file and restart the dev server.', 503)
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  })

  const subject = `New ${enquiry.model || 'Hyundai N Line'} enquiry — ${enquiry.firstName} ${enquiry.lastName}`
  const text = [
    'New website enquiry',
    '',
    `Name: ${enquiry.firstName} ${enquiry.lastName}`,
    `Email: ${enquiry.email}`,
    `Mobile: ${enquiry.mobile}`,
    `Interested model: ${enquiry.model}`,
    `Preferred showroom: ${enquiry.showroom}`,
    `Marketing consent: ${enquiry.consent ? 'Yes' : 'No'}`,
    '',
    'Message:',
    enquiry.message || '(No message provided)',
  ].join('\n')

  const rows = [
    ['Name', `${enquiry.firstName} ${enquiry.lastName}`],
    ['Email', enquiry.email],
    ['Mobile', enquiry.mobile],
    ['Interested model', enquiry.model],
    ['Preferred showroom', enquiry.showroom],
    ['Marketing consent', enquiry.consent ? 'Yes' : 'No'],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#1b2733">
      <h2 style="color:#002c5f">New Hyundai N Line Enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows.map(([key, value]) => `
          <tr>
            <td style="padding:9px;border-bottom:1px solid #eee;font-weight:700;width:180px">${escapeHtml(key)}</td>
            <td style="padding:9px;border-bottom:1px solid #eee">${escapeHtml(value)}</td>
          </tr>`).join('')}
      </table>
      <h3 style="margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap">${escapeHtml(enquiry.message || '(No message provided)')}</p>
    </div>`

  try {
    await transporter.sendMail({
      from: `"${fromName.replace(/"/g, '')}" <${gmailUser}>`,
      to: recipient,
      replyTo: enquiry.email,
      subject,
      text,
      html,
    })
  } catch (error) {
    console.error('Enquiry email error:', {
      code: error?.code,
      command: error?.command,
      responseCode: error?.responseCode,
      response: error?.response,
      message: error?.message,
    })

    if (error?.code === 'EAUTH' || error?.responseCode === 535) {
      throw new EnquiryError('Gmail rejected the login. Check that GMAIL_USER is the same Google account that created the App Password, then check GMAIL_APP_PASSWORD.', 503)
    }

    throw new EnquiryError('Unable to send the enquiry email right now. Please try again shortly.', 500)
  }

  return { ok: true }
}
