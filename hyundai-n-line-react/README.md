# Hyundai VENUE N Line — React landing page

## Run locally

1. Copy `.env.example` to a file named exactly `.env`.
2. Add the Google App Password generated for the same Google account used in `GMAIL_USER`.
3. Run:

```bash
npm install
npm run dev
```

The Vite development server now includes a local `/api/enquire` endpoint, so enquiry email can be tested directly from `http://localhost:5174` (or whichever port Vite prints).

**Important:** restart `npm run dev` after changing `.env`.

You can also test Gmail without filling the website form:

```bash
npm run test:email
```

If that prints `✅ Test email sent successfully.`, Gmail SMTP is configured correctly.

### Gmail settings

Example:

```env
GMAIL_USER=kamkanamlage394@gmail.com
GMAIL_APP_PASSWORD=your_16_character_google_app_password
ENQUIRY_TO_EMAIL=kamkanamlage394@gmail.com
EMAIL_FROM_NAME=Hyundai Website
```

The Google App Password's label/name can be `Hyundai Website`; that label itself is not used as a credential. The generated 16-character App Password is what goes in `GMAIL_APP_PASSWORD`.

If Gmail returns an authentication error, confirm that:
- 2-Step Verification is enabled on the Google account.
- The App Password was generated from the same account specified by `GMAIL_USER`.
- You are using the generated App Password, not the normal Gmail password.

## Vercel

The production endpoint remains `/api/enquire` as a Vercel Function. Local `.env` files are intentionally ignored by Git and should not be relied on after deployment.

Add these values in **Vercel → Project → Settings → Environment Variables** and redeploy:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `ENQUIRY_TO_EMAIL`
- `EMAIL_FROM_NAME`

Build settings are already configured in `vercel.json`.

## Header

The header now includes the requested Search, Share, and Account outline icons on desktop and mobile. They are intentionally visual-only for now.
