# Cham Bank API Setup Guide

## Overview

This guide explains how to run the complete Cham Bank frontend and API setup. The project uses a **Mock API Server** to provide banking data instead of the original Strapi CMS, which had compatibility issues with the current Node.js environment.

## Architecture

```
Cham Bank Frontend (Next.js)
    ↓ HTTP Requests
Mock API Server (Express.js)
    ↓ Data
JSON Data Files (Banking Content)
```

## Quick Start

### 1. Start the API Server

```bash
cd cham-bank-frontend
set PORT=1337
node mock-api-server.js
```

The API server will start on **http://localhost:1337**

### 2. Start the Frontend (in a new terminal)

```bash
cd cham-bank-frontend
set PORT=3000
npm run dev
```

The frontend will start on **http://localhost:3000**

## API Endpoints

The mock API provides the following endpoints matching Strapi's structure:

### Banking Data

- `GET /api/services` - Get banking services
- `GET /api/products` - Get banking products
- `GET /api/products?category=accounts` - Get accounts
- `GET /api/products?category=finance` - Get finance products
- `GET /api/products?category=cards` - Get cards
- `GET /api/news` - Get news articles
- `GET /api/exchange-rates` - Get currency exchange rates
- `GET /api/branches` - Get branch locations

### Navigation & Content

- `GET /api/sliders` - Get hero slider content
- `GET /api/health` - Health check endpoint

### Localization

All endpoints support locale parameter:
- `?locale=ar` - Arabic content (default)
- `?locale=en` - English content

## Environment Configuration

The `.env.local` file contains:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NODE_ENV=development
APP_NAME=Cham Bank
APP_URL=http://localhost:3000
```

## Data Structure

The API returns data in Strapi-compatible format:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Service Title",
        "description": "Service Description",
        "icon": "IconName",
        "isActive": true
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 4,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

## Features Implemented

### ✅ Banking Services
- Mobile Banking
- Online Banking
- SMS Service
- E-Payment

### ✅ Banking Products
- **Accounts**: Current, Savings, Term Deposits
- **Finance**: Real Estate, Auto Finance
- **Cards**: Gold Card, Shopping Card

### ✅ Content Management
- Hero sliders with Islamic banking themes
- News articles in Arabic and English
- Exchange rates for major currencies
- Branch locations with contact information

### ✅ Islamic Banking Features
- Sharia-compliant product descriptions
- Arabic language support (RTL)
- Islamic financial terminology
- Cultural design elements

## Troubleshooting

### API Server Won't Start
1. Check if port 1337 is available
2. Ensure Node.js is installed
3. Verify all dependencies are installed: `npm install`

### Frontend Can't Connect to API
1. Verify API server is running on port 1337
2. Check `.env.local` configuration
3. Test API directly: `curl http://localhost:1337/api/health`

### Data Not Loading
1. Check browser console for errors
2. Verify API responses: `curl http://localhost:1337/api/services`
3. Ensure fallback data is working

## Testing the API

### Health Check
```bash
curl http://localhost:1337/api/health
```

### Get Services
```bash
curl http://localhost:1337/api/services
```

### Get Exchange Rates
```bash
curl http://localhost:1337/api/exchange-rates
```

### Get Products by Category
```bash
curl http://localhost:1337/api/products?category=accounts&locale=en
```

## Production Considerations

For production deployment:

1. **API Server**: Deploy the mock API server to a cloud provider (Heroku, Railway, etc.)
2. **Environment Variables**: Update URLs to point to production API
3. **Database**: Replace mock data with real database integration
4. **CORS**: Configure proper CORS settings for production
5. **SSL**: Enable HTTPS for both frontend and API

## Future Enhancements

1. **Real Database**: Replace mock data with SQLite/PostgreSQL
2. **Admin Panel**: Create admin interface for content management
3. **Authentication**: Add user authentication system
4. **Real-time Data**: Connect to actual banking APIs
5. **Mobile App**: Extend API for mobile application

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint documentation
3. Verify environment configuration
4. Test individual components

---

**Status**: ✅ **COMPLETED** - Full API integration working with frontend
**Last Updated**: December 17, 2025