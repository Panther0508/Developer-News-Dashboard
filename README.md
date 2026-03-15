# DevPulse - Developer News Dashboard

<p align="center">
  <img src="public/favicon.svg" alt="DevPulse Logo" width="100" />
</p>

<p align="center">
  <a href="https://github.com/Panther0508/Developer-News-Dashboard/stargazers">
    <img src="https://img.shields.io/github/stars/Panther0508/Developer-News-Dashboard?style=flat&color=gold" alt="Stars" />
  </a>
  <a href="https://github.com/Panther0508/Developer-News-Dashboard/issues">
    <img src="https://img.shields.io/github/issues/Panther0508/Developer-News-Dashboard?style=flat&color=gold" alt="Issues" />
  </a>
  <a href="https://github.com/Panther0508/Developer-News-Dashboard/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Panther0508/Developer-News-Dashboard?style=flat&color=gold" alt="License" />
  </a>
</p>

## 🚀 Live Demo

**Visit the live application:** [https://Developer-News-Dashboard.onrender.com](https://Developer-News-Dashboard.onrender.com)

---

## 📖 Project Overview

DevPulse is a premium, full-stack Developer News Dashboard built with React and FastAPI. It aggregates developer-related news from multiple public APIs and displays them in a modern, dark-themed interface designed specifically for programmers.

The dashboard features a sophisticated BLACK & GOLD theme with glass-like cards, smooth animations, and a distraction-free reading experience. DevPulse brings together the latest tech news, trending GitHub repositories, developer tools, and AI-powered features all in one place.

### Why DevPulse?

In the fast-paced world of software development, staying updated with the latest news, tools, and trends is crucial. DevPulse consolidates multiple data sources into a single, elegant interface, saving developers time and effort in finding relevant content. Whether you're looking for trending repositories, want to explore new developer tools, or need AI assistance in understanding complex topics, DevPulse has you covered.

---

## ✨ Features

### Core Features

- 📰 **Aggregated News** - News from Hacker News and Dev.to in one place
- 🔍 **Smart Search** - Search across all news sources
- 📊 **Tech Trends Charts** - Visual representation of popular programming languages
- 🛠️ **Developer Tools** - Curated list of trending developer tools
- 📈 **GitHub Trending** - Latest trending repositories
- 🤖 **AI News Assistant** - Get AI-powered summaries, analysis, and explanations

### User Features

- 🔐 **Authentication** - Login/Register with protected routes
- 👤 **User Profile** - Customize your profile
- ⚙️ **Settings** - Theme and notification preferences
- 🔖 **Bookmarks** - Save articles for later

### AI-Powered Features

The AI News Assistant is a powerful feature that helps developers stay informed efficiently:

- 📝 **Summarize Articles** - Get quick summaries of long articles
- 🔍 **Analyze Topics** - Deep dive into breaking news stories
- 💬 **Ask Questions** - Ask about current events and tech topics
- ⚖️ **Compare Articles** - Compare different articles on the same topic
- 📰 **Generate Briefings** - Create personalized news briefings
- 🎓 **Explain Topics** - Understand complex tech topics in simple terms
- 📈 **Trending Insights** - Discover what's trending in specific areas

### UI/UX Features

- 🌙 **Dark Theme** - Premium black and gold color scheme
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Loading** - Skeleton loaders and caching

---

## 🛠️ Technology Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Charts
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend

- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **HTTPX** - Async HTTP client
- **CORS** - Cross-origin support
- **In-memory caching** - 15-minute cache
- **AI Integration** - OpenAI-powered assistance

### APIs Used

- Hacker News API (Algolia)
- Dev.to API
- GitHub API
- OpenAI API (for AI Assistant)

---

## 📁 Project Structure

```
Developer-News-Dashboard/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile             # Deployment configuration
│   └── services/           # API services
│       ├── news_service.py  # News aggregation
│       ├── github_service.py # GitHub API integration
│       ├── tools_service.py # Developer tools data
│       └── ai_service.py    # AI assistant integration
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml       # Docker orchestration
├── render.yaml             # Render deployment config
├── DEPLOY.md               # Deployment guide
├── LICENSE
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/Panther0508/Developer-News-Dashboard.git
cd Developer-News-Dashboard
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
python main.py
```

The backend will start at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to project root
cd Developer-News-Dashboard

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

### Using Docker

```bash
# Start both frontend and backend with Docker Compose
docker-compose up --build
```

---

## 📝 Usage

### Development Mode

1. Start the backend: `cd backend && python main.py`
2. Start the frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173 in your browser

### Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

The frontend expects the API to be available at `http://localhost:8000`

---

## 🔧 Configuration

### Backend

The backend uses in-memory caching with a 15-minute duration. To modify, edit `CACHE_DURATION` in `backend/main.py`.

### Frontend

TailwindCSS is configured with custom colors in `tailwind.config.js`:

- Primary: `#D4AF37` (Gold)
- Background: `#000000` (Black)
- Cards: `#111111`

---

## 📱 Screenshots

### Main Dashboard

![Dashboard](docs/dashboard.png)
The main dashboard displays aggregated news from Hacker News and Dev.to with a sleek dark theme and gold accents. News cards show title, source, author, date, and reaction count.

### AI News Assistant

![AI Chat](docs/ai-chat.png)
The AI News Assistant provides intelligent assistance with features like summarizing articles, analyzing topics, comparing articles, and generating personalized briefings. Quick actions include Summarize Article, Analyze Topic, Compare Articles, Explain Topic, Daily Briefing, and What's Trending.

### Tech Trends

![Tech Trends](docs/tech-trends.png)
Visual representation of popular programming languages using interactive charts. Shows trends for Python, JavaScript, Go, Rust, TypeScript, and other popular languages over time.

### Developer Tools

![Developer Tools](docs/tools.png)
Curated list of trending developer tools including AI coding assistants, low-code platforms, and modern development tools like Cursor, v0, Bolt, Lovable, and more.

### GitHub Trending

![GitHub Trending](docs/github-trending.png)
Browse latest trending repositories from GitHub with detailed information including stars, forks, language, description, and topics.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Hacker News API](https://hn.algolia.com/api)
- [Dev.to API](https://docs.dev.to/api/)
- [GitHub API](https://api.github.com)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI](https://openai.com/)

---

<p align="center">
  Made with ❤️ for developers
</p>

<p align="center">
  <a href="https://github.com/Panther0508/Developer-News-Dashboard">View on GitHub</a>
</p>
