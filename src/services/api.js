import axios from 'axios'

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens if needed
    const token = localStorage.getItem('devpulse_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          console.error('Bad request:', data.detail)
          break
        case 401:
          console.error('Unauthorized - please login')
          // Could redirect to login here
          break
        case 403:
          console.error('Forbidden - access denied')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error')
          break
        default:
          console.error('API error:', data.detail)
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received')
    } else {
      // Error setting up request
      console.error('Request setup error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// News API
export const fetchNews = async (category = 'programming', source = 'all') => {
  try {
    const response = await api.get('/api/news', {
      params: { category, source },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

// GitHub Trending API
export const fetchGithubTrending = async (language = null) => {
  try {
    const response = await api.get('/api/github-trending', {
      params: { language },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching GitHub trending:', error)
    throw error
  }
}

// Dev Tools API
export const fetchDevTools = async () => {
  try {
    const response = await api.get('/api/dev-tools')
    return response.data
  } catch (error) {
    console.error('Error fetching dev tools:', error)
    throw error
  }
}

// Analytics API
export const fetchAnalytics = async () => {
  try {
    const response = await api.get('/api/analytics')
    return response.data
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw error
  }
}

// Tech Trends API
export const fetchTechTrends = async () => {
  try {
    const response = await api.get('/api/tech-trends')
    return response.data
  } catch (error) {
    console.error('Error fetching tech trends:', error)
    return { languages: [], categories: [] }
  }
}

// Search API
export const searchNews = async (query) => {
  try {
    const response = await api.get('/api/search', {
      params: { q: query },
    })
    return response.data
  } catch (error) {
    console.error('Error searching news:', error)
    throw error
  }
}

// AI Summarization API
export const summarizeNews = async (text) => {
  try {
    const response = await api.post('/api/summarize', { text })
    return response.data
  } catch (error) {
    console.error('Error summarizing news:', error)
    throw error
  }
}

// AI Chat API
export const chatWithAI = async (message, context = '', conversationHistory = []) => {
  try {
    const response = await api.post('/api/chat', { 
      message, 
      context, 
      conversation_history: conversationHistory 
    })
    return response.data
  } catch (error) {
    console.error('Error chatting with AI:', error)
    throw error
  }
}

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}

export default api
