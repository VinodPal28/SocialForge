import React from 'react';
import Logo from './Logo';
import { ArrowUp, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
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
    <footer id="footer" className="bg-[#080808] border-t border-zinc-800/80 py-12 relative overflow-hidden">
      
      {/* Decorative backing circle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main upper block row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-800/80">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo size="md" />
            <p className="text-zinc-500 text-xs font-light text-center md:text-left max-w-sm">
              We forge high-retention content blueprints that help creators and high-growth businesses dominate the algorithm.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <button 
              onClick={() => handleNavClick('#home')} 
              id="btn-footer-home"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('#services')} 
              id="btn-footer-services"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('#portfolio')} 
              id="btn-footer-portfolio"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleNavClick('#testimonials')} 
              id="btn-footer-testimonials"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavClick('#contact')} 
              id="btn-footer-contact"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Lower block: copyrights and scroll top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12">
          {/* Copyrights */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-[10px] text-zinc-500">
              &copy; {new Date().getFullYear()} Social Forge Agency. All rights, designs, and content IP protected.
            </p>
            <p className="text-[9px] text-zinc-650">
              Inspired by elite creator agency structures. Crafted with extreme precision.
            </p>
          </div>

          {/* Scroll top button */}
          <button
            onClick={handleScrollTop}
            id="btn-footer-scroll-top"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            Scroll to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
