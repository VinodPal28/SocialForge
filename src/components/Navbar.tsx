import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: '#home' },
    { label: 'Services', id: '#services' },
    { label: 'Portfolio', id: '#portfolio' },
    { label: 'Testimonials', id: '#testimonials' },
    { label: 'Contact', id: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      // Offset slightly for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/80 py-4 shadow-xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('#home')}
          className="cursor-pointer focus:outline-none"
          id="btn-nav-home"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = `#${activeSection}` === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`btn-nav-${item.label.toLowerCase()}`}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 rounded-lg cursor-pointer hover:text-amber-500 ${
                  isActive 
                    ? 'text-amber-500 bg-zinc-900/50' 
                    : 'text-zinc-400 hover:bg-zinc-900/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Call to Action button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('#contact')}
            id="btn-nav-cta"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest bg-amber-500 text-black shadow-lg shadow-amber-500/10 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]"
          >
            Forge with Us <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="btn-mobile-nav-toggle"
          className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        id="mobile-drawer"
        className={`md:hidden fixed top-[72px] left-0 w-full bg-[#0a0a0ab]/95 backdrop-blur-lg border-b border-zinc-800 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = `#${activeSection}` === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`btn-mobile-nav-${item.label.toLowerCase()}`}
                className={`w-full text-left py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-amber-500 bg-zinc-900/50 font-bold' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('#contact')}
            id="btn-mobile-nav-cta"
            className="w-full text-center py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-amber-500 text-black shadow-md shadow-amber-500/10 cursor-pointer mt-4 hover:bg-white hover:text-black transition-colors"
          >
            Forge Your Channel Growth
          </button>
        </div>
      </div>
    </nav>
  );
}
