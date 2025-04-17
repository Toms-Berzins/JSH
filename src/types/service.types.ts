import React from 'react';

export interface ServiceItem {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription?: string;
  benefits?: string[];
  applications?: string[];
  processSummary?: string;
} 