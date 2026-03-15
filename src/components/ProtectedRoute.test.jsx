import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

global.localStorage = localStorageMock

// Mock AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    loading: false
  })
}))

describe('ProtectedRoute', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  const TestChild = () => <div data-testid="protected-content">Protected Content</div>

  it('renders children when authenticated', () => {
    const { useAuth } = require('../context/AuthContext')
    useAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false
    })
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
  })

  it('redirects when not authenticated', () => {
    const { useAuth } = require('../context/AuthContext')
    useAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false
    })
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <TestChild />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    )
    
    // When not authenticated, should navigate to login
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('shows loading when loading', () => {
    const { useAuth } = require('../context/AuthContext')
    useAuth.mockReturnValue({
      isAuthenticated: false,
      loading: true
    })
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </BrowserRouter>
    )
    
    // When loading, should not show children
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })
})
