export type CategoryType = 'shorts' | 'longform' | 'branding' | 'thumbnails';

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  category: CategoryType;
  videoUrl?: string; // YouTube embed token or video url
  imageUrl: string; 
  viewsText?: string;
  ctrText?: string;
  retentionText?: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarUrl: string;
  quote: string;
  metricsText?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  socialLink?: string;
  budget: string;
  serviceType: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted';
  browser?: string;
  os?: string;
  screenSize?: string;
  language?: string;
  timezone?: string;
}
