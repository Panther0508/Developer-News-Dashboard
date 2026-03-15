import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
  Home: () => <div data-testid="home-icon" />
}))

describe('ErrorBoundary', () => {
  afterEach(() => {
    cleanup()
  })

  const TestComponent = () => <div>Test Content</div>
  const ErrorComponent = () => {
    throw new Error('Test error')
  }

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    // We need to use state to trigger the error after render
    class ErrorThrower extends React.Component {
      constructor(props) {
        super(props)
        this.state = { shouldError: false }
      }
      
      render() {
        if (this.props.shouldError) {
          throw new Error('Test error')
        }
        return this.props.children
      }
    }
    
    const { container } = render(
      <ErrorBoundary>
        <ErrorThrower shouldError={true} />
      </ErrorBoundary>
    )
    
    // The error boundary should catch the error
    expect(container.querySelector('.text-red-500')).toBeInTheDocument()
  })

  it('shows error message', () => {
    const { container } = render(
      <ErrorBoundary showError={true}>
        {() => {
          throw new Error('Test error message')
        }}
      </ErrorBoundary>
    )
    
    // Check for error UI
    expect(container.querySelector('.bg-red-500')).toBeInTheDocument()
  })

  it('has refresh and home buttons', () => {
    const { container } = render(
      <ErrorBoundary>
        {() => {
          throw new Error('Test')
        }}
      </ErrorBoundary>
    )
    
    // Check for buttons
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})
