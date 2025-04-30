import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  // Form validation state
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    projectType?: string;
  }>({});

  const [activeField, setActiveField] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
      projectType?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    }

    if (!formData.projectType) {
      newErrors.projectType = t('contact.validation.projectTypeRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({ submitting: true, submitted: false, error: false });
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add reCAPTCHA token
      formDataToSend.append('g-recaptcha-response', recaptchaToken);
      
      // Add honeypot field
      formDataToSend.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/xkgroyzr', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus({ submitting: false, submitted: true, error: false });
        // Reset form after successful submission
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
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ submitting: false, submitted: false, error: true });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('contact.description')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {formStatus.submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-2xl shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-semibold mb-4">{t('contact.success.title')}</h3>
                <p className="text-lg">{t('contact.success.message')}</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  <div className="relative group">
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === 'name' || formData.name 
                          ? '-top-3 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.name 
                          ? 'border-red-500' 
                          : activeField === 'name' 
                            ? 'border-primary-500' 
                            : 'border-gray-200 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-transparent outline-none transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative group">
                    <label 
                      htmlFor="email" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === 'email' || formData.email 
                          ? '-top-3 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email 
                          ? 'border-red-500' 
                          : activeField === 'email' 
                            ? 'border-primary-500' 
                            : 'border-gray-200 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-transparent outline-none transition-all duration-300`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative group">
                    <label 
                      htmlFor="phone" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === 'phone' || formData.phone 
                          ? '-top-3 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
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
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:border-transparent outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <label 
                      htmlFor="projectType" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === 'projectType' || formData.projectType 
                          ? '-top-3 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                          : 'top-3 text-gray-500 opacity-0'
                      } z-10`}
                    >
                      {t('contact.fields.projectType.label')}
                    </label>
                    <div className="relative">
                      <select 
                        id="projectType" 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        onFocus={() => setActiveField('projectType')}
                        onBlur={() => setActiveField(null)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          activeField === 'projectType' 
                            ? 'border-primary-500' 
                            : 'border-gray-200 dark:border-gray-700'
                        } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-transparent outline-none transition-all duration-300 appearance-none text-gray-700 dark:text-gray-200 [&>option]:py-3 [&>option]:px-4 [&>option]:cursor-pointer`}
                        style={{
                          paddingBlock: '0.75rem',
                        }}
                      >
                        <option value="" className="text-gray-400 py-3">
                          Izvēlieties pakalpojumu
                        </option>
                        <option value="scan" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          3D Skenēšana
                        </option>
                        <option value="model" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          3D Modelēšana
                        </option>
                        <option value="print" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          3D Drukāšana
                        </option>
                        <option value="postprocess" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Pēcapstrāde
                        </option>
                        <option value="finish" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Individuāla Apdare
                        </option>
                        <option value="custom" className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Cits / Pielāgots projekts
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.projectType && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.projectType}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative group">
                    <label 
                      htmlFor="message" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === 'message' || formData.message 
                          ? '-top-3 text-sm bg-white dark:bg-gray-800 px-2 text-primary-500' 
                          : 'top-3 text-gray-500'
                      } z-10`}
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
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.message 
                          ? 'border-red-500' 
                          : activeField === 'message' 
                            ? 'border-primary-500' 
                            : 'border-gray-200 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-transparent outline-none transition-all duration-300 resize-none pt-6`}
                      placeholder={activeField === 'message' ? t('contact.fields.message.placeholder') : ''}
                    ></textarea>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {formStatus.error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl"
                    >
                      <p>{t('contact.error.message')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={formStatus.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                    formStatus.submitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-primary-600 hover:to-primary-700'
                  }`}
                >
                  {formStatus.submitting ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      {t('contact.submitting')}
                    </motion.span>
                  ) : (
                    t('contact.send')
                  )}
                </motion.button>

                <p className="text-xs text-center text-gray-500">
                  {t('contact.privacyNote')}
                </p>
              </motion.form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">{t('contact.info.call.title')}</h3>
              <div className="flex flex-col items-center space-y-2">
                <a 
                  href="tel:+37120123456" 
                  className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  +371 20 123 456
                </a>
                <a 
                  href="https://wa.me/37120123456" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">{t('contact.info.email.title')}</h3>
              <div className="flex flex-col items-center space-y-2">
                <a 
                  href="mailto:info@riga3d.lv" 
                  className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  info@riga3d.lv
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 md:col-span-2"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">{t('contact.info.address.title')}</h3>
              <div className="flex flex-col items-center space-y-2">
                <a 
                  href="https://www.google.com/maps/place/Riga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Riga, Latvia
                </a>
                <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17408.1252012001!2d24.1055005!3d56.9496487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfb0e5073ded%3A0x400cfcd68f2fe30!2sRiga%2C%20Latvia!5e0!3m2!1sen!2slv!4v1645541234567!5m2!1sen!2slv" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 