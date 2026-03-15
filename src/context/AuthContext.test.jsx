import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

global.localStorage = localStorageMock

describe('AuthContext', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  const TestConsumer = () => {
    const { user, loading, login, register, logout, isAuthenticated } = useAuth()
    
    return (
      <div>
        <span data-testid="loading">{loading.toString()}</span>
        <span data-testid="user">{user ? user.email : 'no-user'}</span>
        <span data-testid="authenticated">{isAuthenticated.toString()}</span>
        <button data-testid="login-btn" onClick={() => login('test@example.com', 'password123')}>
          Login
        </button>
        <button data-testid="register-btn" onClick={() => register('Test User', 'test@example.com', 'password123')}>
          Register
        </button>
        <button data-testid="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    )
  }

  it('provides initial loading state', () => {
    localStorage.getItem.mockReturnValue(null)
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('starts with no user', () => {
    localStorage.getItem.mockReturnValue(null)
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('user').textContent).toBe('no-user')
    expect(screen.getByTestId('authenticated').textContent).toBe('false')
  })

  it('loads user from localStorage', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'T'
    }
    localStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('test@example.com')
      expect(screen.getByTestId('authenticated').textContent).toBe('true')
    })
  })

  it('performs login successfully', async () => {
    localStorage.getItem.mockReturnValue(null)
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
    })
    
    // Click login button
    screen.getByTestId('login-btn').click()
    
    // Should set user in localStorage
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  it('performs register successfully', async () => {
    localStorage.getItem.mockReturnValue(null)
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false')
    })
    
    // Click register button
    screen.getByTestId('register-btn').click()
    
    // Should set user in localStorage
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  it('performs logout', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'T'
    }
    localStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )
    
    // Wait for user to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('authenticated').textContent).toBe('true')
    })
    
    // Click logout button
    screen.getByTestId('logout-btn').click()
    
    // Should remove user from localStorage
    expect(localStorage.removeItem).toHaveBeenCalledWith('devpulse_user')
  })

  it('throws error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestConsumer />)
    }).toThrow('useAuth must be used within an AuthProvider')
    
    consoleSpy.mockRestore()
  })
})
