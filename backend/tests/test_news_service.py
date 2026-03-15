"""
Unit tests for the news service
"""
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.news_service import (
    fetch_hackernews,
    fetch_devto,
    fetch_reddit_programming,
    get_aggregated_news
)


class TestFetchHackernews:
    """Test cases for fetch_hackernews function"""
    
    @pytest.mark.asyncio
    async def test_fetch_hackernews_returns_list(self):
        """Test that fetch_hackernews returns a list"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = {"hits": []}
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_hackernews()
            assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_fetch_hackernews_parses_hits(self):
        """Test that fetch_hackernews parses hits correctly"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = {
                "hits": [
                    {
                        "objectID": "123",
                        "title": "Test Article",
                        "author": "testuser",
                        "url": "https://example.com",
                        "created_at": "2024-01-01T00:00:00Z",
                        "story_text": "Test description",
                        "_tags": ["tag1", "tag2"]
                    }
                ]
            }
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_hackernews()
            assert len(result) == 1
            assert result[0]["title"] == "Test Article"
            assert result[0]["source"] == "Hacker News"
            assert result[0]["id"] == "hn-123"
    
    @pytest.mark.asyncio
    async def test_fetch_hackernews_uses_category(self):
        """Test that fetch_hackernews uses category parameter"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = {"hits": []}
            mock_response.raise_for_status = MagicMock()
            
            mock_get = AsyncMock(return_value=mock_response)
            mock_client.return_value.__aenter__.return_value.get = mock_get
            
            await fetch_hackernews("python", 10)
            
            # Check that the query was called with correct params
            call_args = mock_get.call_args
            assert "python" in str(call_args)
    
    @pytest.mark.asyncio
    async def test_fetch_hackernews_handles_timeout(self):
        """Test that fetch_hackernews handles timeout gracefully"""
        import httpx
        
        with patch('httpx.AsyncClient') as mock_client:
            mock_client.return_value.__aenter__.side_effect = httpx.TimeoutException("Timeout")
            
            result = await fetch_hackernews()
            assert result == []
    
    @pytest.mark.asyncio
    async def test_fetch_hackernews_handles_error(self):
        """Test that fetch_hackernews handles errors gracefully"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_client.return_value.__aenter__.side_effect = Exception("Network error")
            
            result = await fetch_hackernews()
            assert result == []


class TestFetchDevto:
    """Test cases for fetch_devto function"""
    
    @pytest.mark.asyncio
    async def test_fetch_devto_returns_list(self):
        """Test that fetch_devto returns a list"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = []
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_devto()
            assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_fetch_devto_parses_articles(self):
        """Test that fetch_devto parses articles correctly"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = [
                {
                    "id": 123,
                    "title": "Test Article",
                    "user": {"name": "Test User"},
                    "url": "https://dev.to/test",
                    "published_at": "2024-01-01T00:00:00Z",
                    "description": "Test description",
                    "tag_list": ["tag1", "tag2"]
                }
            ]
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_devto()
            assert len(result) == 1
            assert result[0]["title"] == "Test Article"
            assert result[0]["source"] == "Dev.to"
            assert result[0]["id"] == "devto-123"


class TestFetchRedditProgramming:
    """Test cases for fetch_reddit_programming function"""
    
    @pytest.mark.asyncio
    async def test_fetch_reddit_returns_list(self):
        """Test that fetch_reddit returns a list"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = {"data": {"children": []}}
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_reddit_programming()
            assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_fetch_reddit_parses_posts(self):
        """Test that fetch_reddit parses posts correctly"""
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = MagicMock()
            mock_response.json.return_value = {
                "data": {
                    "children": [
                        {
                            "data": {
                                "id": "abc123",
                                "title": "Test Post",
                                "author": "testuser",
                                "permalink": "/r/programming/comments/abc123",
                                "created_utc": 1704067200,
                                "selftext": "Post content"
                            }
                        }
                    ]
                }
            }
            mock_response.raise_for_status = MagicMock()
            
            mock_client.return_value.__aenter__.return_value.get = AsyncMock(
                return_value=mock_response
            )
            
            result = await fetch_reddit_programming()
            assert len(result) == 1
            assert result[0]["title"] == "Test Post"
            assert result[0]["source"] == "Reddit Programming"
            assert result[0]["id"] == "reddit-abc123"


class TestGetAggregatedNews:
    """Test cases for get_aggregated_news function"""
    
    @pytest.mark.asyncio
    async def test_get_aggregated_news_returns_list(self):
        """Test that get_aggregated_news returns a list"""
        with patch('services.news_service.fetch_hackernews', new_callable=AsyncMock) as mock_hn:
            with patch('services.news_service.fetch_devto', new_callable=AsyncMock) as mock_devto:
                with patch('services.news_service.fetch_reddit_programming', new_callable=AsyncMock) as mock_reddit:
                    mock_hn.return_value = []
                    mock_devto.return_value = []
                    mock_reddit.return_value = []
                    
                    result = await get_aggregated_news()
                    assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_get_aggregated_news_combines_sources(self):
        """Test that get_aggregated_news combines sources"""
        with patch('services.news_service.fetch_hackernews', new_callable=AsyncMock) as mock_hn:
            with patch('services.news_service.fetch_devto', new_callable=AsyncMock) as mock_devto:
                with patch('services.news_service.fetch_reddit_programming', new_callable=AsyncMock) as mock_reddit:
                    mock_hn.return_value = [
                        {"title": "HN Article", "published_date": "2024-01-02", "source": "Hacker News"}
                    ]
                    mock_devto.return_value = [
                        {"title": "Dev.to Article", "published_date": "2024-01-01", "source": "Dev.to"}
                    ]
                    mock_reddit.return_value = [
                        {"title": "Reddit Post", "published_date": "2024-01-03", "source": "Reddit"}
                    ]
                    
                    result = await get_aggregated_news()
                    assert len(result) == 3
    
    @pytest.mark.asyncio
    async def test_get_aggregated_news_limits_results(self):
        """Test that get_aggregated_news limits results to 30"""
        with patch('services.news_service.fetch_hackernews', new_callable=AsyncMock) as mock_hn:
            with patch('services.news_service.fetch_devto', new_callable=AsyncMock) as mock_devto:
                with patch('services.news_service.fetch_reddit_programming', new_callable=AsyncMock) as mock_reddit:
                    # Create 40 items per source (120 total)
                    mock_hn.return_value = [
                        {"title": f"HN {i}", "published_date": f"2024-01-{i:02d}", "source": "Hacker News"}
                        for i in range(1, 41)
                    ]
                    mock_devto.return_value = [
                        {"title": f"Dev {i}", "published_date": f"2024-01-{i:02d}", "source": "Dev.to"}
                        for i in range(1, 41)
                    ]
                    mock_reddit.return_value = [
                        {"title": f"Reddit {i}", "published_date": f"2024-01-{i:02d}", "source": "Reddit"}
                        for i in range(1, 41)
                    ]
                    
                    result = await get_aggregated_news()
                    # Should be limited to 30
                    assert len(result) <= 30
