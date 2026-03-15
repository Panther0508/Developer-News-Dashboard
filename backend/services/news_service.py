import httpx
from datetime import datetime
import asyncio

async def fetch_hackernews(category: str = "programming", limit: int = 15):
    """Fetch news from Hacker News Algolia API"""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                f"https://hn.algolia.com/api/v1/search_by_date",
                params={
                    "query": category,
                    "tags": "story",
                    "hitsPerPage": limit
                }
            )
            data = response.json()
            
            articles = []
            for hit in data.get("hits", []):
                articles.append({
                    "id": f"hn-{hit.get('objectID')}",
                    "title": hit.get("title", ""),
                    "author": hit.get("author", "Unknown"),
                    "url": hit.get("url", f"https://news.ycombinator.com/item?id={hit.get('objectID')}"),
                    "source": "Hacker News",
                    "published_date": hit.get("created_at", ""),
                    "description": hit.get("story_text", ""),
                    "tags": hit.get("_tags", [])
                })
            return articles
    except Exception as e:
        print(f"Hacker News API error: {e}")
        return []

async def fetch_devto(tag: str = None, limit: int = 15):
    """Fetch articles from Dev.to API"""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            url = "https://dev.to/api/articles"
            params = {"per_page": limit}
            if tag and tag != "programming":
                params["tag"] = tag
            
            response = await client.get(url, params=params)
            data = response.json()
            
            articles = []
            for item in data:
                articles.append({
                    "id": f"devto-{item.get('id')}",
                    "title": item.get("title", ""),
                    "author": item.get("user", {}).get("name", "Unknown"),
                    "url": item.get("url"),
                    "source": "Dev.to",
                    "published_date": item.get("published_at", ""),
                    "description": item.get("description", ""),
                    "tags": item.get("tag_list", [])
                })
            return articles
    except Exception as e:
        print(f"Dev.to API error: {e}")
        return []

async def fetch_reddit_programming(limit: int = 15):
    """Fetch news from Reddit Programming subreddit"""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            headers = {"User-Agent": "DevPulse/1.0.0"}
            response = await client.get("https://www.reddit.com/r/programming.json", params={"limit": limit}, headers=headers)
            data = response.json()
            
            articles = []
            for post in data.get("data", {}).get("children", []):
                item = post.get("data", {})
                published_date = datetime.fromtimestamp(item.get("created_utc", 0)).isoformat()
                articles.append({
                    "id": f"reddit-{item.get('id')}",
                    "title": item.get("title", ""),
                    "author": item.get("author", "Unknown"),
                    "url": f"https://reddit.com{item.get('permalink')}",
                    "source": "Reddit Programming",
                    "published_date": published_date,
                    "description": item.get("selftext", ""),
                    "tags": ["reddit", "programming"]
                })
            return articles
    except Exception as e:
        print(f"Reddit API error: {e}")
        return []

async def get_aggregated_news(category: str = "programming", limit: int = 15):
    """Aggregate news from multiple sources"""
    hn_task = fetch_hackernews(category, limit)
    devto_task = fetch_devto(category, limit)
    reddit_task = fetch_reddit_programming(limit)
    
    results = await asyncio.gather(hn_task, devto_task, reddit_task)
    
    all_news = []
    for source_news in results:
        all_news.extend(source_news)
        
    # Sort by published date
    all_news.sort(key=lambda x: x.get("published_date", ""), reverse=True)
    
    return all_news[:30]
