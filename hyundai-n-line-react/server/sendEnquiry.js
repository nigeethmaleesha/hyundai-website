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

export async function sendEnquiry(rawBody = {}) {
  const body = rawBody || {}

  // Honeypot spam protection
  if (clean(body.website, 200)) {
    return { ok: true }
  }

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

  if (
    !enquiry.firstName ||
    !enquiry.lastName ||
    !enquiry.email ||
    !enquiry.mobile ||
    !enquiry.consent
  ) {
    throw new EnquiryError(
      'Please complete all required fields.',
      400
    )
  }

  if (!EMAIL_PATTERN.test(enquiry.email)) {
    throw new EnquiryError(
      'Please enter a valid email address.',
      400
    )
  }

  const accessKey = String(
    process.env.WEB3FORMS_ACCESS_KEY || ''
  ).trim()

  if (!accessKey) {
    throw new EnquiryError(
      'Email service is not configured.',
      503
    )
  }

  const payload = {
    access_key: accessKey,

    subject:
      `New ${enquiry.model || 'Hyundai N Line'} Enquiry - ` +
      `${enquiry.firstName} ${enquiry.lastName}`,

    from_name: 'Hyundai Website',

    email: enquiry.email,

    'First Name': enquiry.firstName,
    'Last Name': enquiry.lastName,
    'Mobile Number': enquiry.mobile,
    'Interested Model': enquiry.model,
    'Preferred Showroom': enquiry.showroom,
    'Marketing Consent': enquiry.consent ? 'Yes' : 'No',
    Message: enquiry.message || '(No message provided)',
  }

  try {
    const response = await fetch(
      'https://api.web3forms.com/submit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.success) {
      console.error('Web3Forms error:', data)

      throw new EnquiryError(
        data.message ||
          'Unable to send the enquiry right now.',
        500
      )
    }

    return {
      ok: true,
      message: 'Enquiry sent successfully.',
    }
  } catch (error) {
    console.error('Enquiry email error:', error)

    if (error instanceof EnquiryError) {
      throw error
    }

    throw new EnquiryError(
      'Unable to send the enquiry right now. Please try again shortly.',
      500
    )
  }
}