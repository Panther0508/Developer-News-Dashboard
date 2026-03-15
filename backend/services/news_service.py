import httpx
from datetime import datetime
import asyncio
import logging

logger = logging.getLogger(__name__)


async def fetch_hackernews(category: str = "programming", limit: int = 15):
    """
    Fetch news from Hacker News Algolia API
    
    Args:
        category: Search category/tag
        limit: Maximum number of results
        
    Returns:
        List of news articles from Hacker News
    """
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
            response.raise_for_status()
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
            logger.info(f"Fetched {len(articles)} articles from Hacker News")
            return articles
    except httpx.TimeoutException:
        logger.warning(f"Timeout fetching Hacker News for category: {category}")
        return []
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching Hacker News: {e.response.status_code}")
        return []
    except Exception as e:
        logger.error(f"Error fetching Hacker News: {str(e)}")
        return []


async def fetch_devto(tag: str = None, limit: int = 15):
    """
    Fetch articles from Dev.to API
    
    Args:
        tag: Filter by tag (optional)
        limit: Maximum number of results
        
    Returns:
        List of articles from Dev.to
    """
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            url = "https://dev.to/api/articles"
            params = {"per_page": limit}
            if tag and tag != "programming":
                params["tag"] = tag
            
            response = await client.get(url, params=params)
            response.raise_for_status()
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
            logger.info(f"Fetched {len(articles)} articles from Dev.to")
            return articles
    except httpx.TimeoutException:
        logger.warning(f"Timeout fetching Dev.to for tag: {tag}")
        return []
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching Dev.to: {e.response.status_code}")
        return []
    except Exception as e:
        logger.error(f"Error fetching Dev.to: {str(e)}")
        return []


async def fetch_reddit_programming(limit: int = 15):
    """
    Fetch news from Reddit Programming subreddit
    
    Args:
        limit: Maximum number of results
        
    Returns:
        List of posts from Reddit r/programming
    """
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            headers = {"User-Agent": "DevPulse/1.0.0"}
            response = await client.get(
                "https://www.reddit.com/r/programming.json",
                params={"limit": limit},
                headers=headers
            )
            response.raise_for_status()
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
            logger.info(f"Fetched {len(articles)} posts from Reddit")
            return articles
    except httpx.TimeoutException:
        logger.warning("Timeout fetching Reddit programming")
        return []
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching Reddit: {e.response.status_code}")
        return []
    except Exception as e:
        logger.error(f"Error fetching Reddit: {str(e)}")
        return []


async def get_aggregated_news(category: str = "programming", limit: int = 15):
    """
    Aggregate news from multiple sources
    
    Args:
        category: News category
        limit: Maximum number of results per source
        
    Returns:
        Combined and sorted list of news articles
    """
    hn_task = fetch_hackernews(category, limit)
    devto_task = fetch_devto(category, limit)
    reddit_task = fetch_reddit_programming(limit)
    
    results = await asyncio.gather(hn_task, devto_task, reddit_task)
    
    all_news = []
    for source_news in results:
        all_news.extend(source_news)
        
    # Sort by published date (newest first)
    all_news.sort(key=lambda x: x.get("published_date", ""), reverse=True)
    
    logger.info(f"Aggregated {len(all_news)} total news items")
    
    return all_news[:30]
