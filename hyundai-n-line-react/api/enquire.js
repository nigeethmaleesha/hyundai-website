import { EnquiryError, sendEnquiry } from '../server/sendEnquiry.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const result = await sendEnquiry(body)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.status(400).json({ message: 'Invalid request body.' })
    }

    const status = error instanceof EnquiryError ? error.status : 500
    const message = error instanceof EnquiryError ? error.message : 'Unable to send the enquiry. Please try again shortly.'
    return res.status(status).json({ message })
  }
}
