# Personal Portfolio Website

A modern, responsive personal portfolio website built with React and Tailwind CSS, showcasing skills, projects, and contact information.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript-ESLint

## Features

- Responsive design adapting to all screen sizes
- Modern minimalist UI/UX following latest trends
- Interactive UI elements with smooth animations (Framer Motion)
- Service showcase section (e.g., Web Development, UI/UX Design)
- Portfolio section with Bento Grid layout
- FAQ section with animated accordion
- Contact form section (requires backend/service integration)
- Subtle skeuomorphic design elements (shadows, blurs)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

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

- **Content**: Update the content in `src/App.tsx`, including text, portfolio items, FAQ entries, and social links.
- **Styling**: Modify Tailwind CSS classes in `src/App.tsx` or add custom styles in `src/index.css`.
- **Shadows**: For the intended `shadow-subtle` and `shadow-inner-subtle` effects, add the following to your `tailwind.config.js`:
  ```js
  module.exports = {
    // ... other config
    theme: {
      extend: {
        boxShadow: {
          'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          'inner-subtle': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }
      }
    }
  }
  ```
- **Contact Form**: Integrate a form submission service (e.g., Formspree, Netlify Forms, Vercel Functions) to handle messages from the contact form in `src/App.tsx`.