import axios from 'axios'

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

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

export default api
