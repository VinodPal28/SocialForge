import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for focus trigger

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white relative">
      {/* Sticky Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Main Single Page Sections */}
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <ContactForm />
      </main>

      {/* Footer Block */}
      <Footer />
    </div>
  );
}
