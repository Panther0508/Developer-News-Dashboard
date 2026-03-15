"""
Integration tests for the FastAPI main application
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app


client = TestClient(app)


class TestRootEndpoint:
    """Test cases for root endpoint"""
    
    def test_root_returns_200(self):
        """Test that root endpoint returns 200"""
        response = client.get("/")
        assert response.status_code == 200
    
    def test_root_returns_correct_name(self):
        """Test that root returns correct API name"""
        response = client.get("/")
        data = response.json()
        assert data["name"] == "DevPulse API"
    
    def test_root_returns_version(self):
        """Test that root returns version"""
        response = client.get("/")
        data = response.json()
        assert "version" in data
        assert data["version"] == "1.1.0"
    
    def test_root_returns_status_online(self):
        """Test that root returns online status"""
        response = client.get("/")
        data = response.json()
        assert data["status"] == "online"


class TestHealthEndpoint:
    """Test cases for health check endpoint"""
    
    def test_health_returns_200(self):
        """Test that health endpoint returns 200"""
        response = client.get("/api/health")
        assert response.status_code == 200
    
    def test_health_returns_status(self):
        """Test that health returns status"""
        response = client.get("/api/health")
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy"
    
    def test_health_returns_timestamp(self):
        """Test that health returns timestamp"""
        response = client.get("/api/health")
        data = response.json()
        assert "timestamp" in data


class TestNewsEndpoint:
    """Test cases for news endpoint"""
    
    def test_news_returns_200(self):
        """Test that news endpoint returns 200"""
        response = client.get("/api/news")
        assert response.status_code == 200
    
    def test_news_returns_news_array(self):
        """Test that news returns news array"""
        response = client.get("/api/news")
        data = response.json()
        assert "news" in data
        assert isinstance(data["news"], list)
    
    def test_news_accepts_category_param(self):
        """Test that news accepts category parameter"""
        response = client.get("/api/news?category=python")
        assert response.status_code == 200
    
    def test_news_accepts_limit_param(self):
        """Test that news accepts limit parameter"""
        response = client.get("/api/news?limit=10")
        assert response.status_code == 200
    
    def test_news_limit_validation(self):
        """Test that news validates limit parameter"""
        response = client.get("/api/news?limit=0")
        assert response.status_code == 422  # Validation error
    
    def test_news_limit_max_validation(self):
        """Test that news validates max limit"""
        response = client.get("/api/news?limit=100")
        assert response.status_code == 422  # Validation error


class TestGitHubTrendingEndpoint:
    """Test cases for GitHub trending endpoint"""
    
    def test_github_trending_returns_200(self):
        """Test that GitHub trending returns 200"""
        response = client.get("/api/github-trending")
        assert response.status_code == 200
    
    def test_github_trending_returns_repositories(self):
        """Test that GitHub trending returns repositories"""
        response = client.get("/api/github-trending")
        data = response.json()
        assert "repositories" in data
        assert isinstance(data["repositories"], list)
    
    def test_github_trending_accepts_language_param(self):
        """Test that GitHub trending accepts language parameter"""
        response = client.get("/api/github-trending?language=python")
        assert response.status_code == 200


class TestDevToolsEndpoint:
    """Test cases for dev tools endpoint"""
    
    def test_dev_tools_returns_200(self):
        """Test that dev tools returns 200"""
        response = client.get("/api/dev-tools")
        assert response.status_code == 200
    
    def test_dev_tools_returns_tools_array(self):
        """Test that dev tools returns tools array"""
        response = client.get("/api/dev-tools")
        data = response.json()
        assert "tools" in data
        assert isinstance(data["tools"], list)
        assert len(data["tools"]) > 0


class TestAnalyticsEndpoint:
    """Test cases for analytics endpoint"""
    
    def test_analytics_returns_200(self):
        """Test that analytics returns 200"""
        response = client.get("/api/analytics")
        assert response.status_code == 200
    
    def test_analytics_returns_widgets(self):
        """Test that analytics returns widgets"""
        response = client.get("/api/analytics")
        data = response.json()
        assert "widgets" in data
        assert isinstance(data["widgets"], list)
        assert len(data["widgets"]) > 0


class TestTechTrendsEndpoint:
    """Test cases for tech trends endpoint"""
    
    def test_tech_trends_returns_200(self):
        """Test that tech trends returns 200"""
        response = client.get("/api/tech-trends")
        assert response.status_code == 200
    
    def test_tech_trends_returns_languages(self):
        """Test that tech trends returns languages"""
        response = client.get("/api/tech-trends")
        data = response.json()
        assert "languages" in data
        assert isinstance(data["languages"], list)
    
    def test_tech_trends_returns_categories(self):
        """Test that tech trends returns categories"""
        response = client.get("/api/tech-trends")
        data = response.json()
        assert "categories" in data
        assert isinstance(data["categories"], list)


class TestSearchEndpoint:
    """Test cases for search endpoint"""
    
    def test_search_returns_200_with_query(self):
        """Test that search returns 200 with valid query"""
        response = client.get("/api/search?q=python")
        assert response.status_code == 200
    
    def test_search_returns_results(self):
        """Test that search returns results"""
        response = client.get("/api/search?q=python")
        data = response.json()
        assert "results" in data
        assert "count" in data
        assert "query" in data
    
    def test_search_requires_query(self):
        """Test that search requires query parameter"""
        response = client.get("/api/search")
        assert response.status_code == 422  # Validation error
    
    def test_search_empty_query_rejected(self):
        """Test that empty query is rejected"""
        response = client.get("/api/search?q=")
        assert response.status_code == 422  # Validation error


class TestSummarizeEndpoint:
    """Test cases for summarize endpoint"""
    
    def test_summarize_returns_200(self):
        """Test that summarize returns 200"""
        response = client.post("/api/summarize", json={
            "text": "This is a test article that needs to be summarized. " * 5
        })
        assert response.status_code == 200
    
    def test_summarize_returns_summary(self):
        """Test that summarize returns summary"""
        response = client.post("/api/summarize", json={
            "text": "This is a test article that needs to be summarized. " * 5
        })
        data = response.json()
        assert "summary" in data
    
    def test_summarize_validates_min_length(self):
        """Test that summarize validates minimum text length"""
        response = client.post("/api/summarize", json={
            "text": "Short"
        })
        assert response.status_code == 422  # Validation error
    
    def test_summarize_validates_max_length(self):
        """Test that summarize validates max_length parameter"""
        response = client.post("/api/summarize", json={
            "text": "This is a test article that needs to be summarized. " * 5,
            "max_length": 1000  # Over max
        })
        assert response.status_code == 422  # Validation error


class TestChatEndpoint:
    """Test cases for chat endpoint"""
    
    def test_chat_returns_200(self):
        """Test that chat returns 200"""
        response = client.post("/api/chat", json={
            "message": "Hello, how are you?"
        })
        assert response.status_code == 200
    
    def test_chat_returns_response(self):
        """Test that chat returns response"""
        response = client.post("/api/chat", json={
            "message": "Hello, how are you?"
        })
        data = response.json()
        assert "response" in data
    
    def test_chat_validates_message_required(self):
        """Test that chat validates message is required"""
        response = client.post("/api/chat", json={})
        assert response.status_code == 422  # Validation error
    
    def test_chat_validates_message_length(self):
        """Test that chat validates message max length"""
        response = client.post("/api/chat", json={
            "message": "a" * 3000  # Over max
        })
        assert response.status_code == 422  # Validation error
