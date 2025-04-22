# API Documentation

## External Integrations

### Cloudinary CDN
Used for image optimization and delivery.

#### Configuration
```typescript
{
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
}
```

#### Image Transformation Parameters
- Format: WebP
- Quality: 80%
- Loading: Lazy
- Responsive: true

### Contact Form API
Handles form submissions and email notifications.

#### Endpoint
```
POST /api/contact
```

#### Request Body
```typescript
{
  name: string;
  email: string;
  message: string;
  service?: string;
}
```

#### Response
```typescript
{
  success: boolean;
  message: string;
}
```

## Internal APIs

### i18n API
Handles internationalization and translations.

#### Supported Languages
- Latvian (lv)
- Russian (ru)
- English (en)

#### Usage
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
t('key.path');
```

### SEO API
Manages meta tags and structured data.

#### Components
- MetaTags
- SchemaOrg
- OpenGraph
- TwitterCards

## Error Handling

### HTTP Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Error Response Format
```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per IP

## Security
- CORS enabled
- API key authentication
- Request validation
- Input sanitization

## Monitoring
- Request logging
- Error tracking
- Performance metrics
- Usage analytics 