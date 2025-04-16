export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  img: string;
  category: 'medical' | 'architectural' | 'product' | 'art' | 'industrial';
} 