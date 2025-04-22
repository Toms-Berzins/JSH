# Riga3D Solutions Website

A modern, responsive website for Riga3D Solutions, a professional 3D scanning and printing service based in Riga, Latvia. Built with React and Tailwind CSS, showcasing services, portfolio, and contact information.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript-ESLint
- **SEO**: React Helmet, Schema.org markup
- **Image Optimization**: Cloudinary CDN
- **Internationalization**: i18n

## Features

- Responsive design adapting to all screen sizes
- Modern minimalist UI/UX following latest trends
- Interactive UI elements with smooth animations (Framer Motion)
- Service showcase section (3D scanning, modeling, printing)
- Portfolio section with Bento Grid layout
- FAQ section with animated accordion
- Contact form section
- Multi-language support (Latvian, Russian, English)
  - Language-specific routing with SEO optimization
  - Tiered translation approach based on content priority
  - Language detection and preference saving
  - Consistent terminology across platforms
- Comprehensive SEO implementation
- Image optimization with Cloudinary
- Structured data for search engines

## SEO Implementation

The website implements a comprehensive SEO strategy including:

- Meta tags optimization with React Helmet
- Structured data (Schema.org) for services and products
- Image optimization with Cloudinary CDN
- Multi-language support with proper hreflang tags
- Performance optimization for Core Web Vitals
- Local SEO implementation for the Latvian market

For detailed SEO strategy, see [SEO Documentation](./docs/technical/SEO.md).

## Digital Marketing

The project uses a visual-first social media strategy to showcase 3D scanning and printing capabilities:

- Instagram for portfolio showcase and B2C engagement
- LinkedIn for B2B client acquisition 
- Case studies as core content that's repurposed across platforms
- Website pillar pages instead of extensive blogging

For detailed digital marketing approach, see [Social Media Strategy](./docs/technical/SOCIAL_MEDIA_STRATEGY.md).

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Cloudinary account (for image optimization)

### Installation

1. Clone the repository:
```sh
git clone <your-repository-url>
```
2. Navigate to the project directory:
```sh
cd <project-directory>
```
3. Install dependencies:
```sh
npm install
# or
yarn install
```
4. Set up environment variables:
```sh
# Create .env file with the following variables
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

### Building for Production

```sh
npm run build
# or
yarn build
```

This command builds the application for production, outputting the static files to the `dist` directory. These files are ready to be deployed to a static site host like Vercel.

## Deployment

This project is configured for easy deployment on platforms like Vercel or Netlify. Connect your Git repository to the platform, and it should automatically detect the Vite configuration and build/deploy the site.

## Customization

- **Content**: Update the content in the translation files and components
- **Styling**: Modify Tailwind CSS classes or add custom styles in `src/index.css`
- **SEO**: Update meta tags and structured data in the SEO component
- **Images**: Upload and optimize images through Cloudinary
- **Contact Form**: Integrate a form submission service to handle messages

## Project Context

For more information about the business context and goals, see [Business Documentation](./docs/business/context.md).