import httpx
from datetime import datetime, timedelta

async def fetch_github_trending(language: str = None, limit: int = 15):
    """Fetch trending repositories from GitHub API sorted by stars"""
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
                    "stars_today": item.get("stargazers_count", 0) # Simplification for MVP
                })
            return repos
    except Exception as e:
        print(f"GitHub API error: {e}")
        return []
