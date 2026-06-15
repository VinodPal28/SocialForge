import React from 'react';
import { SERVICES } from '../data';
import * as Icons from 'lucide-react';

export default function Services() {
  
  // Icon mapper helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'Video':
        return <Icons.Video className="w-6 h-6 text-amber-500" />;
      case 'Sparkles':
        return <Icons.Sparkles className="w-6 h-6 text-amber-500" />;
      case 'TrendingUp':
        return <Icons.TrendingUp className="w-6 h-6 text-amber-500" />;
      case 'Layers':
        return <Icons.Layers className="w-6 h-6 text-amber-500" />;
      default:
        return <Icons.Briefcase className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Mesh Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-800/80 bg-zinc-900/40 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            OUR FORGE <br/>
            <span className="text-zinc-500 italic font-light lowercase">services.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-light">
            We operate at the nexus of cinema-quality technical craftsmanship and brutal search-recommendation mathematics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
          {SERVICES.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-3xl p-[1px] bg-zinc-850 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Main Card Content */}
              <div className="bg-[#0c0c0e]/95 backdrop-blur-xl rounded-[23px] p-8 md:p-10 flex flex-col gap-6 h-full border border-zinc-800/60 group-hover:border-transparent transition-colors duration-300">
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 flex items-center justify-center border border-zinc-800 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-300">
                  {getIcon(item.iconName)}
                </div>

                {/* Text Block */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-amber-500 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-zinc-800/80 group-hover:bg-amber-500/10 transition-colors duration-300" />

                {/* Features List */}
                <div className="flex flex-col gap-3 mt-auto">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded bg-amber-500/10 text-amber-500 mt-1">
                        <Icons.Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-zinc-300 font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
