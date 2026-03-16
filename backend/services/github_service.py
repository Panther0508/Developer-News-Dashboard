import httpx
from datetime import datetime, timedelta
import logging
import random

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
                    "stars_today": random.randint(50, 500) # Simulated daily stars
                })

            
            logger.info(f"Fetched {len(repos)} trending GitHub repos (language: {language})")
            return repos
            
    except httpx.TimeoutException:
        logger.warning(f"Timeout fetching GitHub trending for language: {language}")
        return get_mock_github_repos()
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error fetching GitHub: {e.response.status_code}")
        return get_mock_github_repos()
    except Exception as e:
        logger.error(f"Error fetching GitHub trending: {str(e)}")
        return get_mock_github_repos()


def get_mock_github_repos():
    """Return mock GitHub repos when external API fails"""
    return [
        {
            "id": 1,
            "repo_name": "awesome-chatgpt-plugins",
            "full_name": "awesome-chatgpt-plugins/awesome-chatgpt-plugins",
            "description": "Curated list of ChatGPT plugins",
            "repo_url": "https://github.com/awesome-chatgpt-plugins/awesome-chatgpt-plugins",
            "stars": 12500,
            "language": "Python",
            "stars_today": 450
        },
        {
            "id": 2,
            "repo_name": "llama-index",
            "full_name": "run-llama/llama-index",
            "description": "Data framework for LLM applications",
            "repo_url": "https://github.com/run-llama/llama-index",
            "stars": 28000,
            "language": "Python",
            "stars_today": 320
        },
        {
            "id": 3,
            "repo_name": "nextjs",
            "full_name": "vercel/next.js",
            "description": "The React Framework for the Web",
            "repo_url": "https://github.com/vercel/next.js",
            "stars": 115000,
            "TypeScript": "TypeScript",
            "stars_today": 180
        },
        {
            "id": 4,
            "repo_name": "rust",
            "full_name": "rust-lang/rust",
            "description": "Empowering everyone to build reliable and efficient software.",
            "repo_url": "https://github.com/rust-lang/rust",
            "stars": 89000,
            "language": "Rust",
            "stars_today": 95
        },
        {
            "id": 5,
            "repo_name": "react",
            "full_name": "facebook/react",
            "description": "The library for web and native user interfaces",
            "repo_url": "https://github.com/facebook/react",
            "stars": 218000,
            "language": "JavaScript",
            "stars_today": 120
        }
    ]
