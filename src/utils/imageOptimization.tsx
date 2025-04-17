import React from 'react';
import { ImageOptimizationOptions } from './imageUtils';

interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading: 'lazy' | 'eager';
}

export const generateAltText = (imageName: string, context: string): string => {
  // Remove file extension and convert to readable text
  const baseName = imageName.replace(/\.[^/.]+$/, '');
  const readableName = baseName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return `${readableName} - ${context}`;
};

export const optimizeImage = (
  imagePath: string,
  context: string,
  options: ImageOptimizationOptions = {}
): OptimizedImage => {
  const {
    width = 1920,
    quality = 80,
    format = 'webp'
  } = options;

  // Generate optimized image path
  const optimizedPath = `${imagePath}?w=${width}&q=${quality}&fmt=${format}`;

  // Generate alt text from image path
  const altText = generateAltText(imagePath, context);

  return {
    src: optimizedPath,
    alt: altText,
    width,
    height: Math.round((width * 9) / 16), // Assuming 16:9 aspect ratio
    loading: 'lazy'
  };
};

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  className
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    loading="lazy"
    decoding="async"
  />
); 