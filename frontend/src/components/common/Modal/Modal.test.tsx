import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Modal from './index'

describe('Modal', () => {
	it('renders when open', () => {
		render(
			<Modal isOpen={true} onClose={() => {}} title="Test">
				<div>Content</div>
			</Modal>
		)
		expect(screen.getByText('Content')).toBeInTheDocument()
	})

	it('does not render when closed', () => {
		render(
			<Modal isOpen={false} onClose={() => {}} title="Test">
				<div>Content</div>
			</Modal>
		)
		expect(screen.queryByText('Content')).not.toBeInTheDocument()
	})

	it('close button triggers onClose', () => {
		const onClose = vi.fn()
		render(
			<Modal isOpen={true} onClose={onClose} title="Test">
				<div>Content</div>
			</Modal>
		)
		const closeBtn = screen.getByRole('button', { name: /close modal/i })
		fireEvent.click(closeBtn)
		expect(onClose).toHaveBeenCalledTimes(1)
	})
})
