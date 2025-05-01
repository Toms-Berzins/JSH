import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ApiResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData);
    
    // Use FormData for services like Formspree
    const apiFormData = new FormData();
    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined) {
        apiFormData.append(key, value.toString());
      }
    });
    
    // Submit to form service
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: apiFormData,
      headers: {
        Accept: 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    };
  } catch (error) {
    console.error('Form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please correct the form errors',
        errors: error.errors.reduce((acc, err) => {
          const key = err.path[0] as string;
          acc[key] = acc[key] || [];
          acc[key].push(err.message);
          return acc;
        }, {} as Record<string, string[]>)
      };
    }
    
    return {
      success: false,
      message: 'There was an error submitting your form. Please try again.'
    };
  }
}; 