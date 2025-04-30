import { z } from 'zod';
import nodemailer from 'nodemailer';
import { emailConfig } from '../config/emailConfig';

// Define the contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// Function to verify reCAPTCHA token
const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${emailConfig.recaptcha.secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= emailConfig.recaptcha.minScore;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Function to handle contact form submission
export const handleContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate the form data
    contactFormSchema.parse(formData);

    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(formData.recaptchaToken);
    if (!isRecaptchaValid) {
      return {
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.',
      };
    }

    // Prepare email content
    const mailOptions = {
      from: `"${formData.name}" <${formData.email}>`,
      to: emailConfig.to,
      subject: `Contact Form: ${formData.subject}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending your message. Please try again later.',
    };
  }
}; 