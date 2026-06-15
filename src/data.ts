import { PortfolioItem, Testimonial, ServiceItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Retention-First Video Editing',
    description: 'We craft high-retention video flows designed to capture fleeting viewer attention. From micro-animations and sound design to pacing engineering and narrative blocks, we keep viewers hooked.',
    features: [
      'Stutter-free pacing & rhythm alignment',
      'Advanced kinetic typography & captioning',
      'Atmospheric SFX & soundscapes',
      'B-roll selection & custom motion graphics'
    ],
    iconName: 'Video'
  },
  {
    id: 's2',
    title: 'High-CTR Thumbnail Design',
    description: 'A masterpiece video means nothing without the click. We craft attention-grabbing, highly-psychological thumbnails backed by real focus-point tracking and color-theory tests.',
    features: [
      'High-contrast composition modeling',
      'Expressive typography & character isolation',
      'A/B testing-ready asset bundles',
      'Source files & visual kit delivery'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 's3',
    title: 'Channel Narrative Architecture',
    description: 'We don\'t just edit videos; we forge legacy channels. Our comprehensive strategic consulting covers content ideation, structural hooks, audience scripting, and titles optimization.',
    features: [
      'Intense Hook & Intro scripting analyses',
      'Competitor visual profiling',
      'Metadata & SEO blueprinting',
      'Multi-platform distribution strategies (TikTok, Reels, YT)'
    ],
    iconName: 'TrendingUp'
  },
  {
    id: 's4',
    title: 'Creator Brand Identity',
    description: 'Equip your channel with a unified, elite brand. We forge custom logo designs, typography guides, banner setups, merchandise foundations, and streamer-ready stream-kits.',
    features: [
      'Custom vector logos & modern icons',
      'Custom color harmony palettes',
      'Social media banner packages',
      'Comprehensive brand guidelines guide'
    ],
    iconName: 'Layers'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Devon Carter',
    handle: '@DevonInvests',
    role: 'Finance Creator (1.4M Subs)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    quote: 'Before working with Social Forge, my retention was hovering around 42%. Within just two months of their structural editing, my average viewer duration spiked to 68%, pushing my videos directly onto the homepage algorithm. Absolutely game-changing.',
    metricsText: '+1.2M Monthly Views'
  },
  {
    id: 't2',
    name: 'Sarah Lawson',
    handle: '@TechSavant',
    role: 'Tech & Lifestyle Reviewer (850k Subs)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    quote: 'The team at Social Forge is ridiculously talented. Their thumbnail designs increased my click-through rate from 4.8% to a staggering 9.2%! My revenue has literally doubled. They truly understand consumer psychology.',
    metricsText: '11.2% Average CTR'
  },
  {
    id: 't3',
    name: 'Marcus Chen',
    handle: '@GrowthForge',
    role: 'Business & Startup Education',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    quote: 'They are absolute perfectionists. The sound engineering and custom 3D animations they added to our case study videos made us look like a multi-million dollar production company. Responsive, strategic, and professional.',
    metricsText: '+180k Subscribers'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'How AI is Re-Writing the Stock Market',
    clientName: 'Devon Investments',
    category: 'longform',
    // Embed code for a high-quality finance video
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: '4.8M Views',
    ctrText: '9.4% CTR',
    retentionText: '62% Retention',
    description: 'Complete high-retention post-production edit. Leveraged complex 2D motion tracking and historical chart animations to keep tedious financial explanations highly visual and engaging.',
    tags: ['Motion Graphics', 'Sound Design', 'Finance', 'A/B Tested']
  },
  {
    id: 'p2',
    title: 'I Spent 100 Hours Inside the Apple Vision Pro',
    clientName: 'Savant Reviews',
    category: 'longform',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: '2.1M Views',
    ctrText: '11.1% CTR',
    retentionText: '58% Retention',
    description: 'A dynamic, fast-paced hardware review. Focused heavily on transition design, custom spatial layout overlays, and custom voiceover sound-matching to capture premium tech aesthetic vibes.',
    tags: ['Sound Engineering', 'Intro Design', 'Gear Review', 'Cinematic']
  },
  {
    id: 'p3',
    title: 'How I Built a 7-Figure Hustle from My Dorm',
    clientName: 'HustleUniversity',
    category: 'thumbnails',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=450',
    ctrText: '12.4% CTR',
    viewsText: '1.2M Impressions',
    description: 'High CTR thumbnail design utilizing advanced focal illumination, vibrant neon separation, and an ultra-readable typography hierarchy to maximize mobile-screen thumb stops.',
    tags: ['Color Grading', 'Thumb Stop', 'Typography', 'Psychology']
  },
  {
    id: 'p4',
    title: 'My Morning Routine is Killing My Focus',
    clientName: 'BioHacker Pro',
    category: 'shorts',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: '8.4M Views',
    retentionText: '114% Retention',
    description: 'Kinetic caption-driven vertical video. Designed native mobile layouts, dynamic high-frequency sound effects, and strategic loops that achieved a massive loop completion rate above 100%.',
    tags: ['Kinetic Captions', 'Shorts', 'Sound Loops', 'Biohacking']
  },
  {
    id: 'p5',
    title: 'The Design System behind Top 10 Creators',
    clientName: 'DesignForge',
    category: 'branding',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: 'Brand Identity',
    ctrText: 'Logo & Typography',
    description: 'Complete branding guidelines sheet designed for a growing tech creator. Provided custom custom icons, distinct gradients patterns, and stream graphics that united their audience experience.',
    tags: ['Logo Design', 'Brand Book', 'Social Banners', 'Typography']
  },
  {
    id: 'p6',
    title: 'The Dark Secret of Coffee Brands',
    clientName: 'Vance Explorer',
    category: 'shorts',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: '3.9M Views',
    retentionText: '102% Retention',
    description: 'Super-staccato short-form editing. Combined archival footage with snappy custom text, rhythmic music matching, and screen zooms to build a highly suspenseful historical mystery.',
    tags: ['History', 'Short-form', 'Sound Design', 'Archival Editing']
  },
  {
    id: 'p7',
    title: 'Escape the 9-5 Matrix: Ultimate Blueprint',
    clientName: 'Mindset Forge',
    category: 'thumbnails',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=450',
    ctrText: '14.1% CTR',
    viewsText: '900k Impressions',
    description: 'Sleek, high-intensity mental escape model. Uses strong emotional triggers, depth-of-field separation, and bright gold accents to capture premium productivity vibes.',
    tags: ['Visual Modeling', 'CTR Boost', 'High Contrast']
  },
  {
    id: 'p8',
    title: 'Neon Odyssey: Esports Visual Kit',
    clientName: 'Overwatch Arena',
    category: 'branding',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450',
    viewsText: 'Broadcast Identity',
    ctrText: 'Visual Overlays',
    description: 'High-energy esports visual package for stream overlays, dynamic lower-thirds, animated alerts, transition cards, and branded overlays inspired by high-contrast cyberpunk grids.',
    tags: ['Esports', 'Streaming', 'Overlays', 'Cyberpunk']
  }
];

export const AGENCY_STATS = {
  viewsCount: '380M+',
  subsAdded: '5M+',
  ctrAverage: '9.8%',
  satisfactionRate: '100%'
};
