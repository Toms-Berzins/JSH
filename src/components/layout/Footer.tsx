import React from 'react';
import { Mail, MessageSquare, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {/* Replace # with actual links */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><MessageSquare className="h-6 w-6" /></a> {/* Example: Contact/Blog Link */}
          <a href="mailto:your.email@example.com" className="hover:text-white transition-colors"><Mail className="h-6 w-6" /></a>
        </div>

        <div className="mb-4 space-x-4 text-sm">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        {/* Optional: Add Privacy Policy/Terms links if needed */}
      </div>
    </footer>
  );
};

export default Footer; 