"""
FastAPI Backend for DevPulse
Premium Developer Intelligence Platform
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import time
import asyncio
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
from pydantic import BaseModel
from services.news_service import get_aggregated_news
from services.github_service import fetch_github_trending
from services.tools_service import get_curated_tools
from services.ai_service import summarize_text

class SummaryRequest(BaseModel):
    text: str
    max_length: int = 150
    min_length: int = 40

class ChatRequest(BaseModel):
    message: str
    context: str = ""
    conversation_history: list = []

app = FastAPI(title="DevPulse API", description="Developer News Dashboard Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory cache
cache = {}
CACHE_DURATION = 900  # 15 minutes in seconds

def get_cached(key: str):
    """Get cached data if still valid"""
    if key in cache:
        data, timestamp = cache[key]
        if time.time() - timestamp < CACHE_DURATION:
            return data
    return None

def set_cache(key: str, data):
    """Set cached data with timestamp"""
    cache[key] = (data, time.time())

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

@app.get("/api/news")
async def get_news(
    category: str = Query("programming", description="News category"),
    limit: int = Query(15, description="Limit results")
):
    cache_key = f"news_{category}_{limit}"
    cached = get_cached(cache_key)
    if cached:
        return {"news": cached}
    
    news = await get_aggregated_news(category, limit)
    set_cache(cache_key, news)
    return {"news": news}

@app.get("/api/github-trending")
async def get_trending(
    language: str = Query(None, description="Language filter"),
    limit: int = Query(15, description="Limit results")
):
    cache_key = f"github_{language}_{limit}"
    cached = get_cached(cache_key)
    if cached:
        return {"repositories": cached}
    
    repos = await fetch_github_trending(language, limit)
    set_cache(cache_key, repos)
    return {"repositories": repos}

@app.get("/api/dev-tools")
async def get_tools():
    tools = get_curated_tools()
    return {"tools": tools}

@app.get("/api/analytics")
async def get_analytics():
    """Endpoint for Dashboard Analytics Widgets"""
    # In a real app, this would be computed from a DB
    # Fetching news to get some real-ish numbers
    news = await get_aggregated_news("programming", 50)
    repos = await fetch_github_trending(None, 10)
    
    # Simple logic for trending language and most mentioned tech
    languages = ["TypeScript", "Python", "Rust", "Go", "Javascript"]
    technologies = ["React", "AI", "LLM", "Docker", "Vercel"]
    
    import random
    
    return {
        "widgets": [
            {
                "id": "total-articles",
                "label": "Total Articles Today",
                "value": f"{len(news) + random.randint(10, 50)}",
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

@app.get("/api/tech-trends")
async def get_tech_trends():
    """Endpoint for language and category trends"""
    return {
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

@app.get("/api/search")
async def search(q: str = Query(..., description="Search query")):
    if not q:
        raise HTTPException(status_code=400, detail="Query required")
    
    # Generic search across aggregated news
    news = await get_aggregated_news(q, 30)
    
    results = [
        item for item in news 
        if q.lower() in item["title"].lower() or q.lower() in item.get("description", "").lower()
    ]
    
    return {
        "results": results,
        "count": len(results),
        "query": q
    }

@app.post("/api/summarize")
async def summarize(request: SummaryRequest):
    """Summarize text using Hugging Face AI"""
    if not request.text or len(request.text) < 50:
        return {"summary": request.text}
    
    summary = await summarize_text(request.text, request.max_length, request.min_length)
    return {"summary": summary}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """AI Chat endpoint for answering questions about news"""
    from services.ai_service import chat_with_ai
    
    response = await chat_with_ai(
        message=request.message,
        context=request.context,
        conversation_history=request.conversation_history
    )
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
