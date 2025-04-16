import React from 'react';

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription?: string;
  benefits?: string[];
  applications?: string[];
  processSummary?: string;
} 