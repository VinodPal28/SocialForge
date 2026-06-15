import React from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, Sparkles, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorative Spark */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-800/80 bg-zinc-900/40 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
            Proof of Work
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            LOVED BY ELITE <br/>
            <span className="text-zinc-500 italic font-light lowercase">creators.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-light">
            Hear from leading creators who partnered with Social Forge to transform their retention metrics and scale subscriber communities.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id}
              className="bg-[#0c0c0e]/95 border border-zinc-850 hover:border-amber-500/20 rounded-3xl p-8 relative flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group hover:-translate-y-0.5"
            >
              {/* Top Row: quote sign and rating representation */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Quote className="w-5 h-5 fill-amber-500/10" />
                </div>
                {test.metricsText && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold">
                    <Sparkles className="w-3 h-3" /> {test.metricsText}
                  </div>
                )}
              </div>

              {/* Quote text block */}
              <p className="text-zinc-300 text-sm md:text-base font-light italic leading-relaxed mb-8">
                "{test.quote}"
              </p>

              {/* Creator details row */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-850 mt-auto">
                <img 
                  referrerPolicy="no-referrer"
                  src={test.avatarUrl} 
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border border-zinc-800"
                />
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-white font-display group-hover:text-amber-500 transition-colors">
                    {test.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{test.handle}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="text-xs text-amber-500 font-medium">{test.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
