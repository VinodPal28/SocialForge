import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Send, CheckCircle2, ListFilter, Trash2, ShieldCheck, Mail, Users, ExternalLink } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [budget, setBudget] = useState('$3,000 - $5,000 / mo');
  const [serviceType, setServiceType] = useState('Full Channel Growth Strategy');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCRM, setShowCRM] = useState(false);
  const [pageViews, setPageViews] = useState(0);

  // Load inquiries and retrieve/increment page views from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('social_forge_inquiries');
    if (stored) {
      try {
        setSubmittedInquiries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }

    // Retrieve and increment visitor page views count
    const storedViews = localStorage.getItem('social_forge_site_views');
    const views = storedViews ? parseInt(storedViews, 10) : 0;
    const newViews = views + 1;
    localStorage.setItem('social_forge_site_views', newViews.toString());
    setPageViews(newViews);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate elite server agency submission speed
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: 'inq_' + Date.now(),
        name,
        email,
        companyName,
        socialLink,
        budget,
        serviceType,
        message,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'new'
      };

      const updated = [newInquiry, ...submittedInquiries];
      setSubmittedInquiries(updated);
      localStorage.setItem('social_forge_inquiries', JSON.stringify(updated));

      // Reset Form fields
      setName('');
      setEmail('');
      setCompanyName('');
      setSocialLink('');
      setMessage('');
      setIsSubmitting(false);
      setShowSuccess(true);

      // Dismiss success screen after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = submittedInquiries.filter(inq => inq.id !== id);
    setSubmittedInquiries(filtered);
    localStorage.setItem('social_forge_inquiries', JSON.stringify(filtered));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-800/85 bg-zinc-900/40 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
            Growth Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            FORGE YOUR <span className="text-zinc-500 italic font-light lowercase">channel growth.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-light">
            Ready to claim the views you merit? Let's design your high-retention content formula. Complete our intake sheet below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card Left: Contact Form details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0c0c0e]/95 border border-zinc-850 p-8 rounded-3xl flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-display font-medium text-white">
                Contact Strategy Desk
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Us Directly</h4>
                    <p className="text-sm text-zinc-400 mt-1">partner@socialforge.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Growth Consultation Hours</h4>
                    <p className="text-sm text-zinc-400 mt-1">Monday – Friday, 9AM – 6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-xl text-amber-500 border border-zinc-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Confidentiality Assured</h4>
                    <p className="text-sm text-zinc-400 mt-1">No metadata leaks. No code hacks. Total IP rights reserved.</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Desk Metrics */}
              <div className="border-t border-zinc-800/60 pt-6 flex flex-col gap-4">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Live Strategy Desk Activity</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl flex flex-col gap-1 transition-all hover:border-amber-500/20">
                    <span className="text-[10px] text-zinc-500 font-mono">Visitor Views</span>
                    <span className="text-lg font-bold text-white font-display flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {pageViews}
                    </span>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-xl flex flex-col gap-1 transition-all hover:border-amber-500/20">
                    <span className="text-[10px] text-zinc-500 font-mono">My Inquiries</span>
                    <span className="text-lg font-bold text-amber-500 font-display">
                      {submittedInquiries.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* View CRM toggle */}
              <div className="border-t border-zinc-800 pt-6 mt-2">
                <button
                  onClick={() => setShowCRM(!showCRM)}
                  id="btn-crm-toggle"
                  className="w-full flex items-center justify-between px-4 py-3 border border-zinc-800 bg-zinc-900/50 text-xs font-mono font-bold tracking-wide uppercase text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer hover:border-amber-500/50"
                >
                  <span>{showCRM ? 'Hide Inquiry Desk' : `View Inquiry Desk (${submittedInquiries.length})`}</span>
                  <ListFilter className="w-4 h-4 text-amber-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Card Right: Live Interactive Form Sheets */}
          <div className="lg:col-span-8">
            <div className="bg-[#0c0c0e]/95 border border-zinc-850 p-8 md:p-10 rounded-[32px] relative animate-fade-in">
              
              {/* Floating success popup banner */}
              {showSuccess && (
                <div 
                  id="form-success-banner"
                  className="absolute top-4 left-4 right-4 z-25 flex items-center gap-3 bg-emerald-950/90 border border-emerald-500/50 p-4 rounded-2xl backdrop-blur-md text-emerald-300 shadow-xl"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Forge Inquiry Submitted successfully!</h4>
                    <p className="text-xs text-emerald-400/90 mt-0.5">We review intake forms within 4 operating hours. Your details have been locally processed.</p>
                  </div>
                </div>
              )}

              {/* CRM Mode */}
              {showCRM ? (
                <div className="flex flex-col gap-6" id="crm-panel">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <h3 className="text-xl font-display font-medium text-white">Your Sent Inquiries</h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500">Saved Locally</span>
                  </div>

                  {submittedInquiries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-zinc-900 rounded-3xl text-center gap-5">
                      <div className="p-4 bg-zinc-900/50 rounded-2xl text-zinc-650 border border-zinc-800">
                        <Users className="w-8 h-8 animate-pulse text-amber-500/70" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-white font-semibold text-sm">No Active Inquiries Found</h4>
                        <p className="text-xs text-zinc-500 max-w-sm font-light leading-relaxed">
                          Submit the strategy form on the right. Once sent, details are added dynamically and your live inquiries counter will increment in real-time.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCRM(false)}
                        className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white rounded-xl text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
                      >
                        Return to Intake Form
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-2">
                      {submittedInquiries.map((inq) => (
                        <div key={inq.id} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-3 group">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="font-semibold text-white text-base">{inq.name}</h4>
                              <span className="text-xs text-zinc-500">{inq.email}</span>
                            </div>
                            
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              id={`btn-crm-delete-${inq.id}`}
                              className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              aria-label="Delete submitted inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-zinc-800/80">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] text-zinc-500 font-mono">Service Goal</span>
                              <span className="text-xs text-zinc-300">{inq.serviceType}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 font-mono">
                              <span className="text-[9px] text-zinc-500">Budget Range</span>
                              <span className="text-xs text-amber-500">{inq.budget}</span>
                            </div>
                          </div>

                          {inq.socialLink && (
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-zinc-500 font-mono">Channel/Link:</span>
                              <a 
                                href={inq.socialLink.startsWith('http') ? inq.socialLink : `https://${inq.socialLink}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs text-amber-500 flex items-center gap-0.5 hover:underline"
                              >
                                {inq.socialLink} <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}

                          <p className="text-sm text-zinc-400 font-light mt-1">
                            "{inq.message}"
                          </p>

                          <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono mt-2 pt-2 border-t border-zinc-800">
                            <span>ID: {inq.id}</span>
                            <span>{inq.createdAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => setShowCRM(false)}
                      id="btn-crm-close"
                      className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-xs font-semibold cursor-pointer transition-all text-zinc-300"
                    >
                      Return to Submission Form
                    </button>
                    {submittedInquiries.length > 0 && (
                      <button
                        onClick={() => {
                          localStorage.removeItem('social_forge_inquiries');
                          setSubmittedInquiries([]);
                          setShowCRM(false);
                        }}
                        id="btn-crm-clear-all"
                        className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 cursor-pointer transition-all"
                      >
                        Reset All Local Records
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6" id="intake-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Full Name / Representative <span className="text-amber-500">*</span>
                      </label>
                      <input 
                        required
                        type="text" 
                        id="input-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Carter"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Secure Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input 
                        required
                        type="email" 
                        id="input-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@carter.com"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Brand / Channel Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-company" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Channel / Business Brand Name
                      </label>
                      <input 
                        type="text" 
                        id="input-company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="DevonInvests"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>

                    {/* Social Link Handlers */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-social" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Channel Handle or Current Link
                      </label>
                      <input 
                        type="text" 
                        id="input-social"
                        value={socialLink}
                        onChange={(e) => setSocialLink(e.target.value)}
                        placeholder="youtube.com/c/devoninvests"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Desired Service Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-service" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Requested Forge Expertise
                      </label>
                      <select 
                        id="input-service"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Full Channel Growth Strategy">Full Channel Growth Strategy</option>
                        <option value="Retention Video Production">Retention Video Production</option>
                        <option value="High-CTR Thumbnail Squad">High-CTR Thumbnail Squad</option>
                        <option value="Creator Visual Branding">Creator Visual Branding</option>
                        <option value="Multiple Shorts / TikTok packages">Multiple Shorts / TikTok packages</option>
                      </select>
                    </div>

                    {/* Budget Scale Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="input-budget" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Estimated Monthly Budget (INR / USD)
                      </label>
                      <select 
                        id="input-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Under $1,500 / mo">Under $1,500 / mo (Launch)</option>
                        <option value="$1,500 - $3,000 / mo">$1,500 - $3,000 / mo (Growth)</option>
                        <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo (Elite Tier)</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo (Enterprise)</option>
                        <option value="$10,000+ / mo">$10,000+ / mo (Creator Core Legacy)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="input-message" className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Channel Assessment & Project Vision <span className="text-amber-500">*</span>
                    </label>
                    <textarea 
                      required
                      id="input-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Give us a brief overview of your current retention rates, upload frequency, content type, and what needs forging..."
                      className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-form-submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-amber-500 text-black shadow-xl shadow-amber-500/10 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Forging Content Blueprint...
                      </>
                    ) : (
                      <>
                        Request Free Channel Audit <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
