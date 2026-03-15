import httpx
from datetime import datetime, timedelta
import logging
from typing import Optional, List, Dict

logger = logging.getLogger(__name__)


async def fetch_github_trending(language: Optional[str] = None, limit: int = 15) -> List[Dict]:
    """
    Fetch trending repositories from GitHub API sorted by stars
    
    Args:
        language: Programming language filter (optional)
        limit: Maximum number of results
        
    Returns:
        List of trending repositories
    """
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            # For trending, we'll look at repos created in the last 7 days with most stars
            last_week = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
            query = f"created:>{last_week}"
            if language:
                query += f" language:{language}"
            
            response = await client.get(
                "https://api.github.com/search/repositories",
                params={"q": query, "sort": "stars", "order": "desc", "per_page": limit},
                headers={"Accept": "application/vnd.github.v3+json"}
            )
            response.raise_for_status()
            data = response.json()
            
            repos = []
            for item in data.get("items", []):
                repos.append({
                    "id": item.get("id"),
                    "repo_name": item.get("name"),
                    "full_name": item.get("full_name"),
                    "description": item.get("description", ""),
                    "repo_url": item.get("html_url"),
                    "stars": item.get("stargazers_count", 0),
                    "language": item.get("language", "Unknown"),
                    "stars_today": item.get("stargazers_count", 0)  # Simplification for MVP
                })
            
            logger.info(f"Fetched {len(repos)} trending GitHub repos (language: {language})")
            return repos
            
    except httpx.TimeoutException:
        logger.warning(f"Timeout fetching GitHub trending for language: {language}")
        return []
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching GitHub: {e.response.status_code}")
        return []
    except Exception as e:
        logger.error(f"Error fetching GitHub trending: {str(e)}")
        return []
