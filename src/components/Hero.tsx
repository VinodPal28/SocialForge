import React from 'react';
import { ArrowDown, TrendingUp, Play, Sparkles } from 'lucide-react';
import { AGENCY_STATS } from '../data';

export default function Hero() {

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToPortfolio = () => {
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      const headerOffset = 80;
      const elementPosition = portfolioSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none" />
      
      {/* Premium background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Top Tagline Badge */}
        <div className="flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-amber-500 uppercase mb-8 shadow-inner animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Elite Creator Growth Agency
          </div>
        </div>

        {/* Primary Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[0.95] uppercase">
              WE FORGE <br/>
              <span className="text-zinc-500 italic font-light lowercase">high-retention</span> <span className="font-semibold text-white">identities.</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              We help elite creators and brands claim their fair share of the algorithm. Harness tactical video post-production, high-CTR psychology, and bespoke content hook blueprints designed to print views.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
              <button
                onClick={handleScrollToContact}
                id="btn-hero-scroll-contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-amber-500 text-black shadow-xl shadow-amber-500/10 cursor-pointer transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
              >
                Start Forging
              </button>
              
              <button
                onClick={handleScrollToPortfolio}
                id="btn-hero-scroll-portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-zinc-900/50 border border-zinc-800 text-zinc-300 hover:bg-zinc-850 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> View Masterpieces
              </button>
            </div>
          </div>

          {/* Interactive Right-side Grid Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[32px] p-[1px] bg-gradient-to-b from-zinc-800 via-zinc-800/20 to-zinc-900 shadow-2xl relative group">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="bg-[#0c0c0e]/95 backdrop-blur-xl rounded-[31px] p-8 flex flex-col gap-6 border border-zinc-800/40">
                
                {/* Header card indicator */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Scale Rates</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>

                {/* Progress bar simulation with elegant look */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-300">Client retention score</span>
                    <span className="text-xs font-mono text-amber-500">+84% spike</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full w-4/5" />
                  </div>
                </div>

                {/* Stat metric grids inside hero */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 flex flex-col gap-1 transition-all duration-300 hover:border-amber-500/30">
                    <span className="text-xs text-zinc-500">Total Views Driven</span>
                    <span className="text-2xl font-bold text-white font-display">{AGENCY_STATS.viewsCount}</span>
                  </div>
                  
                  <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 flex flex-col gap-1 transition-all duration-300 hover:border-amber-500/30">
                    <span className="text-xs text-zinc-500">Avg Channel CTR</span>
                    <span className="text-2xl font-bold text-white font-display">{AGENCY_STATS.ctrAverage}</span>
                  </div>
                </div>

                {/* Growth trend block */}
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 px-4 py-3.5 rounded-2xl">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-500">Algorithm Acceleration</h4>
                    <p className="text-sm font-semibold text-zinc-300">Compound subscriber compounding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="flex justify-center mt-12 animate-bounce">
          <button 
            onClick={handleScrollToPortfolio}
            id="btn-hero-scroll-indicator"
            className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-full border border-zinc-800 text-zinc-500 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll to Portfolio"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
