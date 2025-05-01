import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'error.nameRequired'),
  email: z.string().email('error.emailInvalid'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'error.projectTypeRequired'),
  message: z.string().min(10, 'error.messageRequired'),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess, className = '' }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize reCAPTCHA
    script.onload = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY!, { action: 'contact' })
          .then((token: string) => {
            setRecaptchaToken(token);
          })
          .catch((error: Error) => {
            console.error('reCAPTCHA error:', error);
          });
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = t(`contact.validation.${err.message}`);
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add reCAPTCHA token
      formDataToSend.append('g-recaptcha-response', recaptchaToken);
      
      // Add honeypot field
      formDataToSend.append('_gotcha', '');

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
        
        // Refresh reCAPTCHA token
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY!, { action: 'contact' })
            .then((token: string) => {
              setRecaptchaToken(token);
            })
            .catch((error: Error) => {
              console.error('reCAPTCHA error:', error);
            });
        });

        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    >
      <AnimatePresence>
        {formStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{t('contact.success.title')}</h3>
            <p>{t('contact.success.message')}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="relative group">
                <label 
                  htmlFor="name" 
                  className={`absolute left-3 transition-all duration-300 ${
                    activeField === 'name' || formData.name 
                      ? '-top-2 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  {t('contact.fields.name.label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative group">
                <label 
                  htmlFor="email" 
                  className={`absolute left-3 transition-all duration-300 ${
                    activeField === 'email' || formData.email 
                      ? '-top-2 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  {t('contact.fields.email.label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative group">
                <label 
                  htmlFor="phone" 
                  className={`absolute left-3 transition-all duration-300 ${
                    activeField === 'phone' || formData.phone 
                      ? '-top-2 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  {t('contact.fields.phone.label')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => setActiveField(null)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="relative group">
                <label 
                  htmlFor="projectType" 
                  className={`absolute left-3 transition-all duration-300 ${
                    activeField === 'projectType' || formData.projectType 
                      ? '-top-2 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  {t('contact.fields.projectType.label')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  onFocus={() => setActiveField('projectType')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.projectType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
                >
                  <option value="">{t('contact.fields.projectType.placeholder')}</option>
                  <option value="web">{t('contact.fields.projectType.options.web')}</option>
                  <option value="mobile">{t('contact.fields.projectType.options.mobile')}</option>
                  <option value="design">{t('contact.fields.projectType.options.design')}</option>
                  <option value="other">{t('contact.fields.projectType.options.other')}</option>
                </select>
                {errors.projectType && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
                )}
              </div>

              <div className="relative group">
                <label 
                  htmlFor="message" 
                  className={`absolute left-3 transition-all duration-300 ${
                    activeField === 'message' || formData.message 
                      ? '-top-2 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                      : 'top-3 text-gray-500'
                  }`}
                >
                  {t('contact.fields.message.label')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                formStatus === 'submitting'
                  ? 'bg-primary-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
              }`}
            >
              {formStatus === 'submitting' ? t('contact.submitting') : t('contact.send')}
            </button>

            {formStatus === 'error' && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                {t('contact.error.message')}
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 