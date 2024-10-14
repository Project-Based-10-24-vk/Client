import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const tooltips = {
  left: { text: 'this one' },
  right: { text: 'another one' }
}

const props = {
  active: true,
  onChange: vi.fn(),
  switchOptions: tooltips,
  typographyVariant: 'h2',
  styles: { margin: '5px' }
}

describe('AppContentSwitcher', () => {
  beforeEach(() => {
    render(<AppContentSwitcher {...props} />)
  })

  it('should render with the correct props', () => {
    const switcher = screen.getByRole('checkbox')
    const headings = screen.getAllByRole('heading', { level: 2 })

    expect(switcher.checked).toEqual(props.active)
    expect(headings.length).toBeGreaterThan(0)
    expect(headings[0].parentElement).toHaveStyle('margin: 5px')
  })

  it('should call the onChange function when the switch is clicked', () => {
    const switcher = screen.getByRole('checkbox')
    fireEvent.click(switcher)

    expect(props.onChange).toHaveBeenCalled()
  })

  it('should renders tooltips when tooltip props are passed', () => {
    const leftTooltip = screen.getByText(tooltips.left.text)
    const rightTooltip = screen.getByText(tooltips.right.text)

    expect(leftTooltip).toBeInTheDocument()
    expect(rightTooltip).toBeInTheDocument()
  })
})
