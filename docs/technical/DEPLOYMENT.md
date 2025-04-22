# Deployment Guide

## Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Cloudinary account
- Vercel account (recommended)

## Environment Setup

### Required Environment Variables
```env
# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your_ga_id

# Contact Form
VITE_CONTACT_FORM_ENDPOINT=your_endpoint
```

## Build Process

### Development Build
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the project
2. Upload `dist` directory to your hosting provider
3. Configure server to serve `index.html` for all routes

## Server Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dist

    <Directory /path/to/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Enable rewrite engine
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

## Performance Optimization

### Build Optimization
- Enable compression
- Minify assets
- Generate source maps
- Split code chunks

### Runtime Optimization
- Enable caching
- Configure CDN
- Enable HTTP/2
- Enable Brotli compression

## Monitoring

### Performance Monitoring
- Core Web Vitals
- First Contentful Paint
- Time to Interactive
- Largest Contentful Paint

### Error Monitoring
- JavaScript errors
- API errors
- 404 errors
- Performance errors

## Security

### SSL/TLS
- Enable HTTPS
- Configure HSTS
- Use secure cookies
- Enable CSP

### Headers
```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'";
```

## Backup and Recovery

### Backup Strategy
- Daily database backups
- Weekly full backups
- Monthly archives

### Recovery Process
1. Stop the application
2. Restore from backup
3. Verify integrity
4. Restart services

## Maintenance

### Regular Tasks
- Update dependencies
- Monitor performance
- Check error logs
- Backup data
- Update SSL certificates

### Emergency Procedures
1. Identify the issue
2. Apply hotfix if needed
3. Rollback if necessary
4. Notify stakeholders
5. Document the incident 