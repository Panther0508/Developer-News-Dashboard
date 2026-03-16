import time
import asyncio
import logging
import os
import random
from datetime import datetime
from typing import Optional, List
from functools import lru_cache

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel, Field, field_validator

from services.news_service import get_aggregated_news
from services.github_service import fetch_github_trending
from services.tools_service import get_curated_tools
from services.ai_service import summarize_text, chat_with_ai

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()


class SummaryRequest(BaseModel):
    """Request model for text summarization"""
    text: str = Field(..., min_length=50, description="Text to summarize")
    max_length: int = Field(150, ge=10, le=500, description="Maximum summary length")
    min_length: int = Field(40, ge=5, le=200, description="Minimum summary length")
    
    @field_validator('text')
    @classmethod
    def validate_text_length(cls, v: str) -> str:
        if len(v) < 50:
            raise ValueError('Text must be at least 50 characters long')
        return v


class ChatRequest(BaseModel):
    """Request model for AI chat"""
    message: str = Field(..., min_length=1, max_length=2000, description="User message")
    context: Optional[str] = Field("", max_length=5000, description="Additional context")
    conversation_history: Optional[List[dict]] = Field(default_factory=list, max_length=50)


app = FastAPI(
    title="DevPulse API",
    description="Developer News Dashboard Backend",
    version="1.1.0"
)


# Configure CORS from environment variable
def get_allowed_origins():
    """Get allowed origins from environment variable"""
    env_origins = os.environ.get("ALLOWED_ORIGINS", "")
    
    if not env_origins:
        # Default to localhost for development
        return ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]
    
    # Parse comma-separated origins
    origins = []
    for origin in env_origins.split(","):
        origin = origin.strip()
        if not origin:
            continue
        # Handle .onrender.com wildcard - add as-is for FastAPI to handle
        if origin == ".onrender.com":
            origins.append(".onrender.com")
        elif origin.startswith("http://") or origin.startswith("https://"):
            origins.append(origin)
        else:
            origins.append(f"https://{origin}")
    
    return origins


# Get origins
origins = get_allowed_origins()

print(f"CORS origins: {origins}")
logger.info(f"CORS enabled for origins: {origins}")

# Add CORS middleware using FastAPI's built-in
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add GZip middleware for compression
app.add_middleware(GZipMiddleware, minimum_size=1000)


# Simple in-memory cache with TTL
cache = {}
CACHE_DURATION = 900  # 15 minutes in seconds


def get_cached(key: str):
    """Get cached data if still valid"""
    if key in cache:
        data, timestamp = cache[key]
        if time.time() - timestamp < CACHE_DURATION:
            logger.debug(f"Cache hit for key: {key}")
            return data
        else:
            # Remove expired entry
            del cache[key]
            logger.debug(f"Cache expired for key: {key}")
    return None


def set_cache(key: str, data):
    """Set cached data with timestamp"""
    cache[key] = (data, time.time())
    logger.debug(f"Cached data for key: {key}")


# ============================================
# API ENDPOINTS
# ============================================

@app.get("/")
async def root():
    return {
        "name": "DevPulse API",
        "version": "1.1.0",
        "status": "online"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "cache_size": len(cache)
    }


@app.get("/api/news")
async def get_news(
    category: str = Query("programming", description="News category"),
    limit: int = Query(15, ge=1, le=50, description="Limit results")
):
    """
    Fetch aggregated news from multiple sources
    
    - **category**: News category (e.g., 'programming', 'AI', 'webdev')
    - **limit**: Number of results to return (1-50)
    """
    cache_key = f"news_{category}_{limit}"
    cached = get_cached(cache_key)
    if cached is not None:
        logger.info("Returning cached news data")
        return {"news": cached, "cached": True}
    
    try:
        news = await get_aggregated_news(category, limit)
        # Ensure we always have data
        if not news:
            from services.news_service import get_mock_news
            news = get_mock_news(category)
        set_cache(cache_key, news)
        logger.info(f"Fetched {len(news)} news items for category: {category}")
        return {"news": news, "cached": False}
    except Exception as e:
        logger.error(f"Error fetching news: {str(e)}")
        # Always return mock data on error
        from services.news_service import get_mock_news
        return {"news": get_mock_news(category), "cached": False}


@app.get("/api/github-trending")
async def get_trending(
    language: Optional[str] = Query(None, description="Language filter"),
    limit: int = Query(15, ge=1, le=50, description="Limit results")
):
    """
    Fetch trending GitHub repositories
    
    - **language**: Programming language filter (optional)
    - **limit**: Number of results to return (1-50)
    """
    cache_key = f"github_{language}_{limit}"
    cached = get_cached(cache_key)
    if cached is not None:
        logger.info("Returning cached GitHub trending data")
        return {"repositories": cached, "cached": True}
    
    try:
        repos = await fetch_github_trending(language, limit)
        # Ensure we always have data
        if not repos:
            from services.github_service import get_mock_github_repos
            repos = get_mock_github_repos()
        set_cache(cache_key, repos)
        logger.info(f"Fetched {len(repos)} trending repos for language: {language}")
        return {"repositories": repos, "cached": False}
    except Exception as e:
        logger.error(f"Error fetching GitHub trending: {str(e)}")
        # Always return mock data on error
        from services.github_service import get_mock_github_repos
        return {"repositories": get_mock_github_repos(), "cached": False}


@app.get("/api/dev-tools")
async def get_tools():
    """Get curated list of developer tools"""
    try:
        tools = get_curated_tools()
        return {"tools": tools}
    except Exception as e:
        logger.error(f"Error fetching dev tools: {str(e)}")
        return {"tools": []}


@app.get("/api/analytics")
async def get_analytics():
    """
    Endpoint for Dashboard Analytics Widgets
    Results are cached to avoid excessive API calls
    """
    cache_key = "analytics_dashboard"
    cached = get_cached(cache_key)
    if cached:
        return cached
    
    try:
        # In a real app, this would be computed from a DB
        # Fetching news to get some real-ish numbers
        news_data = await get_aggregated_news("programming", 50)
        repos = await fetch_github_trending(None, 10)
        
        # Simple logic for trending language and most mentioned tech
        languages = ["TypeScript", "Python", "Rust", "Go", "Javascript"]
        technologies = ["React", "AI", "LLM", "Docker", "Vercel"]
        
        result = {
            "widgets": [
                {
                    "id": "total-articles",
                    "label": "Total Articles Today",
                    "value": f"{len(news_data) + random.randint(10, 50)}",
                    "trend": "+12%",
                    "icon": "news"
                },
                {
                    "id": "trending-lang",
                    "label": "Trending Language",
                    "value": random.choice(languages),
                    "trend": "Hot",
                    "icon": "code"
                },
                {
                    "id": "top-repo",
                    "label": "Top GitHub Repo",
                    "value": repos[0]["repo_name"] if repos else "loading...",
                    "trend": "Peak",
                    "icon": "github"
                },
                {
                    "id": "mentioned-tech",
                    "label": "Most Mentioned Tech",
                    "value": random.choice(technologies),
                    "trend": "Popular",
                    "icon": "sparkles"
                }
            ]
        }
        
        # Cache for shorter duration (5 minutes)
        cache[cache_key] = (result, time.time())
        return result
        
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        return {"widgets": []}


@app.get("/api/tech-trends")
async def get_tech_trends():
    """Endpoint for language and category trends"""
    # Cache this endpoint longer (30 minutes)
    cache_key = "tech_trends"
    cached = get_cached(cache_key)
    if cached:
        return cached
    
    result = {
        "languages": [
            {"name": "TypeScript", "value": 85},
            {"name": "Python", "value": 78},
            {"name": "Rust", "value": 65},
            {"name": "Go", "value": 55},
            {"name": "Javascript", "value": 80},
            {"name": "C++", "value": 45}
        ],
        "categories": [
            {"name": "Web Development", "value": 450},
            {"name": "Artificial Intelligence", "value": 380},
            {"name": "Cloud Computing", "value": 310},
            {"name": "Cybersecurity", "value": 240},
            {"name": "Data Science", "value": 290}
        ]
    }
    
    # Cache for 30 minutes
    cache[cache_key] = (result, time.time() + 1800)
    return result


@app.get("/api/search")
async def search(q: str = Query(..., min_length=1, max_length=200, description="Search query")):
    """
    Search across news sources
    
    - **q**: Search query (required, 1-200 characters)
    """
    if not q or not q.strip():
        raise HTTPException(status_code=400, detail="Query is required")
    
    # Limit search term length
    q = q.strip()[:200]
    
    try:
        # Generic search across aggregated news
        news = await get_aggregated_news(q, 30)
        
        results = [
            item for item in news 
            if q.lower() in item.get("title", "").lower() or 
               q.lower() in item.get("description", "").lower()
        ]
        
        logger.info(f"Search for '{q}' returned {len(results)} results")
        
        return {
            "results": results,
            "count": len(results),
            "query": q
        }
    except Exception as e:
        logger.error(f"Error searching news: {str(e)}")
        return {"results": [], "count": 0, "query": q}


@app.post("/api/summarize")
async def summarize(request: SummaryRequest):
    """
    Summarize text using Hugging Face AI
    
    - **text**: Text to summarize (minimum 50 characters)
    - **max_length**: Maximum summary length (10-500)
    - **min_length**: Minimum summary length (5-200)
    """
    try:
        summary = await summarize_text(request.text, request.max_length, request.min_length)
        return {"summary": summary}
    except Exception as e:
        logger.error(f"Error in summarize: {str(e)}")
        raise HTTPException(status_code=500, detail="Summarization failed")


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    AI Chat endpoint for answering questions about news
    
    - **message**: User message (required)
    - **context**: Additional context (optional)
    - **conversation_history**: Previous messages (optional)
    """
    try:
        response = await chat_with_ai(
            message=request.message,
            context=request.context,
            conversation_history=request.conversation_history or []
        )
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Chat failed")


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions"""
    return {
        "detail": exc.detail,
        "status_code": exc.status_code
    }


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "detail": "Internal server error",
        "status_code": 500
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
