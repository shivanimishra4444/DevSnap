import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Spinner from './index'

describe('Spinner', () => {
	it('renders without crashing', () => {
		render(<Spinner />)
	})
})
