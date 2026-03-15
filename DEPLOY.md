# DevPulse Deployment Guide

## Local Testing Results

All API endpoints have been tested locally and are fully functional:

| Endpoint                   | Status     | Description                               |
| -------------------------- | ---------- | ----------------------------------------- |
| `GET /`                    | ✅ Working | Root endpoint returning API info          |
| `GET /api/health`          | ✅ Working | Health check with cache status            |
| `GET /api/news`            | ✅ Working | Aggregated news from HN, Dev.to, Reddit   |
| `GET /api/github-trending` | ✅ Working | GitHub trending repositories              |
| `GET /api/dev-tools`       | ✅ Working | Curated developer tools list              |
| `GET /api/analytics`       | ✅ Working | Dashboard analytics widgets               |
| `GET /api/tech-trends`     | ✅ Working | Language and category trends              |
| `GET /api/search`          | ✅ Working | Search across news sources                |
| `POST /api/summarize`      | ✅ Working | AI text summarization (requires HF_TOKEN) |
| `POST /api/chat`           | ✅ Working | AI chat (requires HF_TOKEN)               |

## Fixes Applied

1. **AI Chat Endpoint**: Updated to use a valid HuggingFace model (`mistralai/Mistral-7B-Instruct-v0.2`)
2. **Gzip Compression**: Added middleware for response compression
3. **Error Handling**: Improved graceful degradation when AI services aren't configured

## Render Deployment Instructions

### Prerequisites

- A [Render](https://render.com) account
- GitHub repository with the code

### Option 1: Quick Deploy via Blueprint

1. **Push code to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy via Render Blueprint**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Select your GitHub repository
   - Import the `render.yaml` file
   - Click "Apply"

3. **Configure Environment Variables**:
   - In the Render dashboard, go to your backend service
   - Add the following environment variables:
     - `ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://devpulse.onrender.com`)
     - `HF_TOKEN`: (Optional) Your HuggingFace API token for AI features

### Option 2: Manual Deployment

#### Backend Service

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.11

#### Frontend Service

1. Create another Web Service for the frontend
2. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l $PORT`
   - **Environment**: Node 18
3. Add environment variable:
   - `VITE_API_BASE_URL`: Your backend service URL

## Security Configuration

The following security measures are in place:

- **CORS**: Configured via `ALLOWED_ORIGINS` environment variable
- **Gzip Compression**: Enabled for all responses
- **Input Validation**: All endpoints use Pydantic validation
- **Error Handling**: Custom exception handlers with logging

## Performance Features

- **In-Memory Caching**: 15-minute cache for API responses
- **Async Operations**: All external API calls are async
- **Connection Pooling**: Using httpx with connection reuse

## Production Checklist

- [ ] Set `ALLOWED_ORIGINS` to your production domain
- [ ] Configure `HF_TOKEN` for AI features (optional)
- [ ] Enable auto-deploy for both services
- [ ] Verify all endpoints respond correctly
- [ ] Test error handling (invalid inputs, timeouts)

## Troubleshooting

### AI features not working

- Ensure `HF_TOKEN` is set in environment variables
- Get a token from [HuggingFace Settings](https://huggingface.co/settings/tokens)

### CORS errors

- Check that `ALLOWED_ORIGINS` includes your frontend URL
- Format: comma-separated list (no spaces)

### Slow responses

- The first request may be slow due to cold start
- Subsequent requests benefit from caching
