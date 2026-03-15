"""
Unit tests for the tools service
"""
import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.tools_service import get_curated_tools


class TestToolsService:
    """Test cases for tools service"""
    
    def test_get_curated_tools_returns_list(self):
        """Test that get_curated_tools returns a list"""
        tools = get_curated_tools()
        assert isinstance(tools, list)
        assert len(tools) > 0
    
    def test_get_curated_tools_has_required_fields(self):
        """Test that each tool has required fields"""
        tools = get_curated_tools()
        
        required_fields = ['id', 'name', 'description', 'category', 'url', 'tags']
        
        for tool in tools:
            for field in required_fields:
                assert field in tool, f"Tool missing required field: {field}"
    
    def test_get_curated_tools_has_valid_urls(self):
        """Test that all tools have valid URLs"""
        tools = get_curated_tools()
        
        for tool in tools:
            url = tool.get('url', '')
            assert url.startswith('http://') or url.startswith('https://'), \
                f"Tool {tool.get('name')} has invalid URL: {url}"
    
    def test_get_curated_tools_has_valid_ids(self):
        """Test that all tools have valid IDs"""
        tools = get_curated_tools()
        
        for tool in tools:
            assert isinstance(tool['id'], int), f"Tool ID should be integer, got {type(tool['id'])}"
            assert tool['id'] > 0, "Tool ID should be positive"
    
    def test_get_curated_tools_has_non_empty_names(self):
        """Test that all tools have non-empty names"""
        tools = get_curated_tools()
        
        for tool in tools:
            assert tool['name'], "Tool name should not be empty"
            assert len(tool['name']) > 0, "Tool name should not be empty"
    
    def test_get_curated_tools_has_valid_categories(self):
        """Test that tools have valid categories"""
        tools = get_curated_tools()
        valid_categories = ['IDE', 'Development Tools', 'DevOps', 'Backend', 
                          'Deployment', 'Design', 'Management']
        
        for tool in tools:
            assert tool['category'] in valid_categories, \
                f"Invalid category: {tool['category']}"
    
    def test_get_curated_tools_returns_expected_count(self):
        """Test that we get expected number of tools"""
        tools = get_curated_tools()
        # We know there should be 8 tools
        assert len(tools) == 8, f"Expected 8 tools, got {len(tools)}"
    
    def test_tools_are_sorted_by_id(self):
        """Test that tools are sorted by ID"""
        tools = get_curated_tools()
        ids = [tool['id'] for tool in tools]
        assert ids == sorted(ids), "Tools should be sorted by ID"
