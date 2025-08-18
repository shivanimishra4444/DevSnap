import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './index'

describe('Button Component', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const icon = <span data-testid="icon">🚀</span>
    render(<Button icon={icon}>Button with icon</Button>)
    
    expect(screen.getByRole('button', { name: /button with icon/i })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button loading={true} loadingText="Loading...">Submit</Button>)
    // Check for loading spinner instead of text
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('is disabled when loading', () => {
    render(<Button loading={true} loadingText="Loading...">Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled={true}>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
