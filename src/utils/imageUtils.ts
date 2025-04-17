import cloudinary from '../config/cloudinary';

export interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'crop';
  gravity?: 'auto' | 'face' | 'center';
}

export interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading: 'lazy' | 'eager';
}

export const generateAltText = (imageName: string, context: string): string => {
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
    format = 'webp',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  const transformations = [
    { width },
    { quality },
    { fetch_format: format },
    { crop },
    { gravity }
  ];

  const optimizedPath = cloudinary.url(imagePath, {
    transformation: transformations,
    secure: true
  });

  const altText = generateAltText(imagePath, context);

  return {
    src: optimizedPath,
    alt: altText,
    width,
    height: Math.round((width * 9) / 16),
    loading: 'lazy'
  };
}; 