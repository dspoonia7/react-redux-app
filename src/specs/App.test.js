import React from 'react'
import { render } from '@testing-library/react'
import App from '../js/App'

test('renders React', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/React/i)
  expect(linkElement).toBeInTheDocument()
})
