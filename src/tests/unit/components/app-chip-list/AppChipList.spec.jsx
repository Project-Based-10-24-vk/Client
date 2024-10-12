import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import AppChipList from '~/components/app-chips-list/AppChipList'

// Замокируем компоненты
vi.mock('~/components/app-chip/AppChip', () => {
  const MockComponent = (props) => (
    <div data-testid='app-chip' {...props}>
      {props.children}
    </div>
  )
  MockComponent.displayName = 'MockAppChip'
  return MockComponent
})

vi.mock('~/components/app-popover/AppPopover', () => {
  const MockComponent = ({ children }) => (
    <div data-testid='app-popover'>{children}</div>
  )
  MockComponent.displayName = 'MockAppPopover'
  return MockComponent
})

describe('AppChipList', () => {
  const defaultItems = [
    'chip1',
    'chip2',
    'chip3',
    'chip4',
    'chip5',
    'chip6',
    'chip7',
    'chip8',
    'chip9',
    'chip10'
  ]

  it('should show chips', () => {
    render(<AppChipList defaultQuantity={5} items={defaultItems} />)

    const chips = screen.getAllByTestId('app-chip')
    expect(chips.length).toBe(5)
    expect(screen.queryByTestId('amount-of-chips')).toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    render(<AppChipList defaultQuantity={7} items={defaultItems} />)

    const chips = screen.getAllByTestId('app-chip')
    expect(chips.length).toBe(7)

    const showMoreChip = screen.getByTestId('amount-of-chips')
    expect(showMoreChip).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={7} items={defaultItems} />)

    const chips = screen.getAllByTestId('app-chip')
    expect(chips.length).toBe(7)
    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('should show only 10 chips', () => {
    render(<AppChipList defaultQuantity={10} items={defaultItems} />)

    const chips = screen.getAllByTestId('app-chip')
    expect(chips.length).toBe(10)
    expect(screen.queryByTestId('amount-of-chips')).toBeNull()
  })

  it('should delete 1 chip', () => {
    const handleChipDelete = vi.fn()

    render(
      <AppChipList
        defaultQuantity={5}
        handleChipDelete={handleChipDelete}
        items={defaultItems}
      />
    )

    const chips = screen.getAllByTestId('app-chip')
    expect(chips.length).toBe(5)

    fireEvent.click(chips[0])

    expect(handleChipDelete).toHaveBeenCalledWith('chip1')
  })
})
