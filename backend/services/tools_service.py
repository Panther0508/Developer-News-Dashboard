def get_curated_tools():
    """Returns a curated list of developer tools"""
    tools = [
        {
            "id": 1,
            "name": "Cursor",
            "description": "AI-powered code editor built on VS Code",
            "category": "IDE",
            "url": "https://cursor.sh",
            "tags": ["AI", "Editor"]
        },
        {
            "id": 2,
            "name": "Postman",
            "description": "API platform for building and testing APIs",
            "category": "Development Tools",
            "url": "https://postman.com",
            "tags": ["API", "Testing"]
        },
        {
            "id": 3,
            "name": "Docker",
            "description": "Container platform for developers",
            "category": "DevOps",
            "url": "https://docker.com",
            "tags": ["Containers", "DevOps"]
        },
        {
            "id": 4,
            "name": "Supabase",
            "description": "The open source Firebase alternative",
            "category": "Backend",
            "url": "https://supabase.com",
            "tags": ["Database", "Auth"]
        },
        {
            "id": 5,
            "name": "Vercel",
            "description": "Platform for frontend frameworks and static sites",
            "category": "Deployment",
            "url": "https://vercel.com",
            "tags": ["Frontend", "Cloud"]
        },
        {
            "id": 6,
            "name": "Figma",
            "description": "Collaborative interface design tool",
            "category": "Design",
            "url": "https://figma.com",
            "tags": ["Design", "UI/UX"]
        },
        {
            "id": 7,
            "name": "V0",
            "description": "AI UI generator from text prompts",
            "category": "Design",
            "url": "https://v0.dev",
            "tags": ["AI", "UI"]
        },
        {
            "id": 8,
            "name": "Linear",
            "description": "The issue tracker you'll actually use",
            "category": "Management",
            "url": "https://linear.app",
            "tags": ["Productivity", "Agile"]
        }
    ]
    return tools
