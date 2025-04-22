export interface Service {
  key: string;
  title: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  applications: string[];
  processSummary: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
} 