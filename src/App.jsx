import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import News from './pages/News'
import Trending from './pages/Trending'
import AIChat from './pages/AIChat'
import Search from './pages/Search'
import About from './pages/About'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black bg-pattern">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
