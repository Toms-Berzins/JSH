export const emailConfig = {
  // Gmail SMTP settings
  host: import.meta.env.VITE_EMAIL_HOST || 'smtp.gmail.com',
  port: Number(import.meta.env.VITE_EMAIL_PORT) || 587,
  // Email credentials from environment variables
  user: import.meta.env.VITE_EMAIL_USER,
  pass: import.meta.env.VITE_EMAIL_PASS,
  // The email that will receive contact form submissions
  to: import.meta.env.VITE_EMAIL_TO || 'berzins.toms@gmail.com',
  // reCAPTCHA settings for form security
  recaptcha: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    secretKey: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
    minScore: 0.5,
  },
}; 