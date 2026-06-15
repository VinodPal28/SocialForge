import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem, CategoryType } from '../types';
import { Play, Eye, Maximize2, X, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories: { label: string; value: CategoryType | 'all' }[] = [
    { label: 'All Work', value: 'all' },
    { label: 'Longform Videos', value: 'longform' },
    { label: 'Shorts & Reels', value: 'shorts' },
    { label: 'Click-Through Thumbnails', value: 'thumbnails' },
    { label: 'Creator Branding', value: 'branding' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(it => it.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 relative bg-[#0a0a0a] overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-800/80 bg-zinc-900/40 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
            Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight uppercase">
            ALGORITHM-CRUSHING <br/>
            <span className="text-zinc-500 italic font-light lowercase">masterpieces.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-light">
            A selective breakdown of custom projects designed, written, and engineered to claim millions of impressions.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              id={`tab-portfolio-${tab.value}`}
              className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                selectedCategory === tab.value 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/15 scale-[1.02]' 
                  : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              id={`portfolio-card-${item.id}`}
              className="group bg-[#0c0c0e]/95 border border-zinc-850 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/80 group">
                {/* Main image background */}
                <img 
                  referrerPolicy="no-referrer"
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Floating Metric Badge upper-left */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.viewsText && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold bg-[#0c0c0e]/90 hover:bg-[#0c0c0e] backdrop-blur-md text-white border border-zinc-800 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-amber-500" /> {item.viewsText}
                    </span>
                  )}
                  {item.ctrText && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold bg-[#0c0c0e]/90 hover:bg-[#0c0c0e] backdrop-blur-md text-white border border-zinc-800 shadow-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {item.ctrText}
                    </span>
                  )}
                </div>

                {/* Floating Action Button centers on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {item.videoUrl ? (
                    <div className="w-12 h-12 bg-amber-500 text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 animate-pulse">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-amber-500 text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Bottom Overlay Info Tag */}
                <span className="absolute bottom-4 left-4 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-500/90">
                  {item.category === 'longform' && 'Longform post-production'}
                  {item.category === 'shorts' && 'Snappy Shorts edit'}
                  {item.category === 'thumbnails' && 'Impression psychology'}
                  {item.category === 'branding' && 'Identity setup'}
                </span>
              </div>

              {/* Text Padding Area */}
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wide">{item.clientName}</span>
                  <h3 className="text-lg md:text-xl font-display font-medium text-white group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Tags bottom list */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tags.map(t => (
                    <span key={t} className="px-2 py-1 bg-zinc-900/50 border border-zinc-800/80 rounded-lg text-[9px] font-mono text-zinc-500">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Showcase Overlay Container */}
        {activeModalItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center max-h-screen overflow-y-auto px-4 py-8 bg-[#0a0a0a]/95 backdrop-blur-md"
            onClick={() => setActiveModalItem(null)}
            id="portfolio-lightbox-overlay"
          >
            <div 
              className="w-full max-w-4xl bg-[#0a0a0a] border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl shadow-amber-500/5 relative"
              onClick={(e) => e.stopPropagation()}
              id="portfolio-lightbox-card"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalItem(null)}
                id="btn-lightbox-close"
                className="absolute top-4 right-4 z-50 p-2.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white rounded-full transition-all focus:outline-none cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Media left-side block */}
                <div className="md:col-span-7 bg-black flex items-center justify-center min-h-[300px]">
                  {activeModalItem.videoUrl ? (
                    <div className="w-full aspect-video">
                      <iframe 
                        className="w-full h-full border-none"
                        src={activeModalItem.videoUrl} 
                        title={activeModalItem.title} 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video overflow-hidden">
                      <img 
                        referrerPolicy="no-referrer"
                        src={activeModalItem.imageUrl} 
                        alt={activeModalItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Details right-side description block */}
                <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800/80 bg-[#0c0c0e]/95">
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-amber-500 font-semibold tracking-wider uppercase">
                        {activeModalItem.clientName} Project Study
                      </span>
                      <h4 className="text-xl md:text-2xl font-display font-medium text-white">
                        {activeModalItem.title}
                      </h4>
                    </div>

                    {/* Numeric targets */}
                    <div className="grid grid-cols-3 gap-3 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                      {activeModalItem.viewsText && (
                        <div className="flex flex-col text-center">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Reach</span>
                          <span className="text-xs font-bold text-white mt-1 flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3 text-amber-500" />
                            {activeModalItem.viewsText}
                          </span>
                        </div>
                      )}
                      
                      {activeModalItem.ctrText && (
                        <div className="flex flex-col text-center border-l border-zinc-800">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Click-Thru</span>
                          <span className="text-xs font-bold text-white mt-1 flex items-center justify-center gap-1">
                            <BarChart3 className="w-3 h-3 text-emerald-400" />
                            {activeModalItem.ctrText}
                          </span>
                        </div>
                      )}

                      {activeModalItem.retentionText && (
                        <div className="flex flex-col text-center border-l border-zinc-800">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Retention</span>
                          <span className="text-xs font-bold text-white mt-1 flex items-center justify-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            {activeModalItem.retentionText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description text */}
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-mono">Growth Overview</h5>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {activeModalItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Footing info */}
                  <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap gap-2">
                    {activeModalItem.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-900/50 text-zinc-400 text-[10px] rounded-xl border border-zinc-800/80">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
