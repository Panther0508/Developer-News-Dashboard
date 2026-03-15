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

## 📖 Project Overview

DevPulse is a premium, full-stack Developer News Dashboard built with React and FastAPI. It aggregates developer-related news from multiple public APIs and displays them in a modern, dark-themed interface designed specifically for programmers.

The dashboard features a sophisticated BLACK & GOLD theme with glass-like cards, smooth animations, and a distraction-free reading experience.

## ✨ Features

### Core Features

- 📰 **Aggregated News** - News from Hacker News and Dev.to in one place
- 🔍 **Smart Search** - Search across all news sources
- 📊 **Tech Trends Charts** - Visual representation of popular programming languages
- 🛠️ **Developer Tools** - Curated list of trending developer tools
- 📈 **GitHub Trending** - Latest trending repositories

### User Features

- 🔐 **Authentication** - Login/Register with protected routes
- 👤 **User Profile** - Customize your profile
- ⚙️ **Settings** - Theme and notification preferences
- 🔖 **Bookmarks** - Save articles for later (coming soon)

### UI/UX Features

- 🌙 **Dark Theme** - Premium black and gold color scheme
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Loading** - Skeleton loaders and caching

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

### APIs Used

- Hacker News API (Algolia)
- Dev.to API
- GitHub API

## 📁 Project Structure

```
Developer-News-Dashboard/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── services/           # API services
│       ├── news_service.py
│       ├── github_service.py
│       └── tools_service.py
├── public/
│   └── favicon.svg         # App icon
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── RepoCard.jsx
│   │   ├── ToolCard.jsx
│   │   ├── TrendChart.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/           # React context
│   │   └── AuthContext.jsx
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Search.jsx
│   │   ├── About.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .gitignore
├── LICENSE
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

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
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Usage

### Development Mode

1. Start the backend: `cd backend && python main.py`
2. Start the frontend: `npm run dev`
3. Open http://localhost:5173 in your browser

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

## 🔧 Configuration

### Backend

The backend uses in-memory caching with a 15-minute duration. To modify, edit `CACHE_DURATION` in `backend/main.py`.

### Frontend

TailwindCSS is configured with custom colors in `tailwind.config.js`:

- Primary: `#D4AF37` (Gold)
- Background: `#000000` (Black)
- Cards: `#111111`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hacker News API](https://hn.algolia.com/api)
- [Dev.to API](https://docs.dev.to/api/)
- [GitHub API](https://api.github.com)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## 📱 Screenshots

![Dashboard](docs/dashboard.png)
![Search](docs/search.png)
![Profile](docs/profile.png)

---

<p align="center">
  Made with ❤️ for developers
</p>

<p align="center">
  <a href="https://github.com/Panther0508/Developer-News-Dashboard">View on GitHub</a>
</p>
