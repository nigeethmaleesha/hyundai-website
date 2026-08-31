import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { EnquiryError, sendEnquiry } from './server/sendEnquiry.js'

function localEnquiryApi() {
  return {
    name: 'local-enquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/enquire', async (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ message: 'Method not allowed.' }))
          return
        }

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString('utf8')
          const body = raw ? JSON.parse(raw) : {}
          const result = await sendEnquiry(body)

          res.statusCode = 200
          res.end(JSON.stringify(result))
        } catch (error) {
          const status = error instanceof EnquiryError ? error.status : error instanceof SyntaxError ? 400 : 500
          const message = error instanceof EnquiryError
            ? error.message
            : error instanceof SyntaxError
              ? 'Invalid request body.'
              : 'Unable to send the enquiry. Please try again shortly.'

          res.statusCode = status
          res.end(JSON.stringify({ message }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Vite reads .env for the browser, but our local mail endpoint runs in Node.
  // Load all values and copy them to process.env so nodemailer can read them.
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), localEnquiryApi()],
    build: {
      target: 'es2020',
    },
  }
})
