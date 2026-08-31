import { sendEnquiry } from './sendEnquiry.js'

try {
  await sendEnquiry({
    firstName: 'Website',
    lastName: 'Test',
    email: process.env.GMAIL_USER || 'kamkanamlage394@gmail.com',
    mobile: '+94 TEST',
    model: 'Venue N Line',
    showroom: 'Abans Auto — Colombo',
    message: 'This is a Hyundai Website SMTP test email. If you received this, the Gmail App Password configuration is working.',
    consent: true,
    website: '',
  })
  console.log('✅ Test email sent successfully.')
} catch (error) {
  console.error(`❌ ${error.message}`)
  process.exitCode = 1
}
