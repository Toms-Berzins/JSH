export const emailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'your-email@gmail.com', // Replace with your Gmail address
  pass: 'your-app-password', // Replace with your Gmail App Password
  to: 'berzins.toms@gmail.com', // The email that will receive contact form submissions
  recaptcha: {
    siteKey: 'your-recaptcha-site-key', // Replace with your reCAPTCHA site key
    secretKey: 'your-recaptcha-secret-key', // Replace with your reCAPTCHA secret key
    minScore: 0.5, // Minimum score required to pass reCAPTCHA verification
  },
}; 