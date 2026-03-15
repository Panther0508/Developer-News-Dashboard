"""
Pytest configuration and fixtures
"""
import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@pytest.fixture
def mock_hackernews_response():
    """Mock response for Hacker News API"""
    return {
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


@pytest.fixture
def mock_devto_response():
    """Mock response for Dev.to API"""
    return [
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


@pytest.fixture
def mock_reddit_response():
    """Mock response for Reddit API"""
    return {
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


@pytest.fixture
def mock_github_response():
    """Mock response for GitHub API"""
    return {
        "items": [
            {
                "id": 123,
                "name": "test-repo",
                "full_name": "user/test-repo",
                "description": "A test repository",
                "html_url": "https://github.com/user/test-repo",
                "stargazers_count": 100,
                "language": "Python"
            }
        ]
    }


@pytest.fixture
def sample_news_article():
    """Sample news article"""
    return {
        "id": "hn-123",
        "title": "Test Article",
        "author": "testuser",
        "url": "https://example.com",
        "source": "Hacker News",
        "published_date": "2024-01-01T00:00:00Z",
        "description": "Test description",
        "tags": ["tag1", "tag2"]
    }


@pytest.fixture
def sample_tool():
    """Sample developer tool"""
    return {
        "id": 1,
        "name": "Test Tool",
        "description": "A test tool",
        "category": "Development Tools",
        "url": "https://example.com",
        "tags": ["test"]
    }
