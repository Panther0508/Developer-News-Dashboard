# DevPulse Deployment Guide

## Live Demo

**Frontend**: [https://developer-news-dashboard.onrender.com](https://developer-news-dashboard.onrender.com)
**Backend**: [https://developer-news-dashboard-backend.onrender.com](https://developer-news-dashboard-backend.onrender.com)

---

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

1. **AI Chat Endpoint**: Updated to use HuggingFace models
2. **Gzip Compression**: Added middleware for response compression
3. **Error Handling**: Improved graceful degradation when AI services aren't configured
4. **CORS Middleware**: Added custom middleware to support wildcard domains for preview deployments

---

## Render Deployment Instructions

### Prerequisites

- A [Render](https://render.com) account
- GitHub repository with the code

### Option 1: Deploy via Blueprint

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
   - After deployment, add environment variables to each service as needed

### Option 2: Manual Deployment

#### Backend Service

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Name**: `your-app-backend`
   - **Root Directory**: `/` (or leave empty)
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.11
4. Add Environment Variables:
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://your-app.onrender.com,https://your-app-backend.onrender.com`)
   - `PYTHON_VERSION`: `3.11.0`
   - `HF_TOKEN`: (Optional) Your HuggingFace API token for AI features

#### Frontend Service

1. Create another Web Service for the frontend
2. Configure:
   - **Name**: `your-app-frontend`
   - **Root Directory**: `/`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l $PORT`
   - **Environment**: Node 18
3. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your backend service URL (e.g., `https://your-app-backend.onrender.com`)

---

## Environment Variables Reference

### Backend (Python)

| Variable          | Required | Description                                   |
| ----------------- | -------- | --------------------------------------------- |
| `ALLOWED_ORIGINS` | Yes      | Comma-separated list of allowed frontend URLs |
| `PYTHON_VERSION`  | Yes      | Python version (e.g., 3.11.0)                 |
| `HF_TOKEN`        | No       | HuggingFace API token for AI features         |

### Frontend

| Variable            | Required | Description         |
| ------------------- | -------- | ------------------- |
| `VITE_API_BASE_URL` | Yes      | Backend service URL |

---

## Security Configuration

The following security measures are in place:

- **CORS**: Configured via `ALLOWED_ORIGINS` environment variable
- **Gzip Compression**: Enabled for all responses
- **Input Validation**: All endpoints use Pydantic validation
- **Error Handling**: Custom exception handlers with logging

---

## Performance Features

- **In-Memory Caching**: 15-minute cache for API responses
- **Async Operations**: All external API calls are async
- **Connection Pooling**: Using httpx with connection reuse

---

## Production Checklist

- [x] Set `ALLOWED_ORIGINS` to your production domain
- [ ] Configure `HF_TOKEN` for AI features (optional)
- [x] Enable auto-deploy for both services
- [x] Verify all endpoints respond correctly
- [x] Test error handling (invalid inputs, timeouts)

---

## Troubleshooting

### News data not loading in production

If the frontend displays but news data doesn't load:

1. **Check CORS Configuration**:
   - Verify `ALLOWED_ORIGINS` in backend includes your frontend's domain
   - Check browser console for CORS errors

2. **Verify API Base URL**:
   - Ensure `VITE_API_BASE_URL` is set correctly in frontend environment
   - Should point to your backend service URL

3. **Check Backend Health**:
   - Visit `/api/health` endpoint on your backend
   - Should return `{"status":"healthy",...}`

4. **Cold Start Issues**:
   - Free tier services may spin down after inactivity
   - First request after idle may be slow or fail
   - Wait 30-60 seconds and retry

### CORS errors

- Check that `ALLOWED_ORIGINS` includes your frontend URL
- Format: comma-separated list (no spaces)
- Example: `https://your-app.onrender.com,https://your-app-backend.onrender.com`

### Slow responses

- The first request may be slow due to cold start
- Subsequent requests benefit from caching

### Backend returns 500 error

1. Check backend logs in Render dashboard
2. Verify external API calls aren't blocked
3. Ensure `HF_TOKEN` is set for AI features (optional)
4. Check if third-party APIs (HN, Dev.to, Reddit) are accessible from Render

### Getting a HuggingFace Token

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token (read access is sufficient)
3. Add the token to your backend's environment variables as `HF_TOKEN`

---

## Support

For issues or questions, please open a GitHub issue.
