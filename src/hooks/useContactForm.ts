import { useState } from 'react';
import { ContactFormData, submitContactForm, ApiResponse } from '../api/contact';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setResponse(null);

    try {
      const result = await submitContactForm(formData);
      setResponse(result);
    } catch (error) {
      console.error('Form submission error:', error);
      setResponse({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    response,
    handleSubmit
  };
}; 