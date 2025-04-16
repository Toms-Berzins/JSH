import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan as Scan3d, Printer as Printer3d, Settings2, ChevronRight, Users, Sun, Moon, Cuboid as Cube, Building2, Stethoscope, Factory, Upload, MessageSquare, ChevronDown } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Cube className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold">Riga3D Solutions</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="text-primary-600 dark:text-primary-400">Scan.</span>{" "}
            <span className="text-primary-500 dark:text-primary-300">Print.</span>{" "}
            <span className="text-primary-400 dark:text-primary-200">Ready.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300"
          >
            Transform your ideas into reality with our professional 3D scanning and printing services
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 px-8 py-4 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Request a Scan
          </motion.button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Scan3d className="h-8 w-8" />, title: "3D Scanning", description: "High-precision photogrammetry scanning using smartphones and Polycam" },
              { icon: <Settings2 className="h-8 w-8" />, title: "Model Refinement", description: "Professional post-processing and optimization of 3D models" },
              { icon: <Printer3d className="h-8 w-8" />, title: "3D Printing", description: "Both FDM and resin printing with premium materials" }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">From Idea to Reality</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary-200 dark:bg-primary-800 -translate-y-1/2"></div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { number: "01", title: "Upload or Scan", description: "Send us your 3D model or request a scanning session" },
                { number: "02", title: "Review & Refine", description: "We optimize your model for perfect printing results" },
                { number: "03", title: "Print & Deliver", description: "Receive your high-quality 3D printed product" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-700 shadow-lg relative"
                >
                  <div className="absolute -top-4 left-6 bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  {index < 2 && (
                    <ChevronRight className="absolute top-1/2 -right-4 text-primary-600 dark:text-primary-400 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Segments */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Who We Serve</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="h-8 w-8" />, title: "Hobbyists", description: "Perfect for DIY enthusiasts and collectors" },
              { icon: <Building2 className="h-8 w-8" />, title: "Architects", description: "Architectural models and prototypes" },
              { icon: <Stethoscope className="h-8 w-8" />, title: "Medical", description: "Custom medical models and prosthetics" },
              { icon: <Factory className="h-8 w-8" />, title: "Manufacturers", description: "Industrial parts and prototypes" }
            ].map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-700 shadow-lg text-center"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4 flex justify-center">{segment.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{segment.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{segment.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Get an Instant Quote</h2>
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors">
                <Upload className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Drop your 3D model here or click to upload</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Supported formats: STL, OBJ, FBX</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Print Quality</label>
                  <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                    <option>Draft (0.2mm)</option>
                    <option>Standard (0.1mm)</option>
                    <option>Ultra (0.05mm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Material</label>
                  <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                    <option>PLA</option>
                    <option>PETG</option>
                    <option>Resin</option>
                  </select>
                </div>
              </div>
              <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Calculate Price
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Portfolio</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1631733571075-845c0234ee0e?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1638356435991-4c79b00ebef3?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1631733571075-845c0234ee0e?auto=format&fit=crop&w=800&q=80"
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <img
                  src={image}
                  alt={`Portfolio item ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-primary-600/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button className="px-6 py-2 bg-white text-primary-600 rounded-full font-medium">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: "What file formats do you accept?", answer: "We accept STL, OBJ, and FBX files for 3D printing. For scanning services, no files are needed - just bring your object!" },
              { question: "How long does the process take?", answer: "Typical turnaround time is 2-5 business days depending on the complexity and size of your project." },
              { question: "What's your pricing structure?", answer: "Pricing is based on material volume, print quality, and complexity. Use our quote calculator above for an instant estimate." }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md"
              >
                <button className="w-full px-6 py-4 text-left flex items-center justify-between">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Cube className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">Riga3D Solutions</span>
              </div>
              <p className="text-gray-400">Transforming ideas into reality through advanced 3D technology</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: info@riga3d.lv</p>
              <p className="text-gray-400">Phone: +371 20 123 456</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Location</h3>
              <p className="text-gray-400">Riga, Latvia</p>
              <p className="text-gray-400">EU VAT: LV12345678901</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <p className="text-gray-400">Privacy Policy</p>
              <p className="text-gray-400">Terms of Service</p>
              <p className="text-gray-400">GDPR Compliance</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Riga3D Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;