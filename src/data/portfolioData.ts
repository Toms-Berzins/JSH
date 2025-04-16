import { PortfolioItem } from '../types/portfolio.types';

export const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: "Medical Device Prototype", 
    description: "3D scanning and printing of a custom medical device prototype for a local clinic", 
    size: "large", 
    img: "/images/medical-device.jpg",
    category: "medical"
  },
  { 
    id: 2, 
    title: "Architectural Model", 
    description: "Detailed 3D model and printed scale model of a historic building in Riga", 
    size: "medium", 
    img: "/images/architectural-model.jpg",
    category: "architectural"
  },
  { 
    id: 3, 
    title: "Product Design Iteration", 
    description: "Multiple iterations of a product prototype through 3D scanning and printing", 
    size: "small", 
    img: "/images/product-design.jpg",
    category: "product"
  },
  { 
    id: 4, 
    title: "Custom Art Reproduction", 
    description: "3D scanning and printing of a delicate artwork for preservation", 
    size: "medium", 
    img: "/images/art-reproduction.jpg",
    category: "art"
  },
  { 
    id: 5, 
    title: "Industrial Part Reverse Engineering", 
    description: "3D scanning and reproduction of a complex industrial component", 
    size: "medium", 
    img: "/images/industrial-part.jpg",
    category: "industrial"
  }
]; 