import { PortfolioItem } from '../types/portfolio.types';

export const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: "Medical Device Prototype", 
    description: "3D scanning and printing of a custom medical device prototype for a local clinic", 
    size: "large", 
    img: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "medical"
  },
  { 
    id: 2, 
    title: "Architectural Model", 
    description: "Detailed 3D model and printed scale model of a historic building in Riga", 
    size: "medium", 
    img: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "architectural"
  },
  { 
    id: 3, 
    title: "Product Design Iteration", 
    description: "Multiple iterations of a product prototype through 3D scanning and printing", 
    size: "small", 
    img: "https://images.unsplash.com/photo-1573496527892-904f897eb744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "product"
  },
  { 
    id: 4, 
    title: "Custom Art Reproduction", 
    description: "3D scanning and printing of a delicate artwork for preservation", 
    size: "medium", 
    img: "https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "art"
  },
  { 
    id: 5, 
    title: "Industrial Part Reverse Engineering", 
    description: "3D scanning and reproduction of a complex industrial component", 
    size: "medium", 
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "industrial"
  }
]; 