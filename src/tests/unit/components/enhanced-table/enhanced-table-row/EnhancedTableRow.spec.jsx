import { fireEvent, render, screen } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import useMenu from '~/hooks/use-menu'

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

vi.mock('~/hooks/use-menu', () => ({
  default: vi.fn()
}))

describe('EnhancedTableRow', () => {
  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'age', label: 'Age' }
  ]
  const item = { _id: '1', name: 'John Doe', age: 30 }
  const rowActions = [
    { label: 'Edit', func: vi.fn() },
    { label: 'Delete', func: vi.fn() }
  ]
  const onRowClick = vi.fn()
  const select = {
    isSelected: vi.fn().mockReturnValue(false),
    handleSelectClick: vi.fn()
  }
  const selectedRows = []

  beforeEach(() => {
    useTranslation.mockReturnValue({ t: (key) => key })
    useNavigate.mockReturnValue(vi.fn())
    useMenu.mockReturnValue({
      openMenu: vi.fn(),
      renderMenu: (items) => items,
      closeMenu: vi.fn()
    })
  })

  it('renders table cells correctly', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        item={item}
        select={select}
        selectedRows={selectedRows}
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('calls onRowClick when row is clicked', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        item={item}
        onRowClick={onRowClick}
        select={select}
        selectedRows={selectedRows}
      />
    )

    fireEvent.click(screen.getByRole('row'))
    expect(onRowClick).toHaveBeenCalledWith(item)
  })

  it('handles selection checkbox correctly', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={item}
        select={select}
        selectedRows={selectedRows}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(select.handleSelectClick).toHaveBeenCalledWith(
      expect.any(Object),
      item._id
    )
  })

  it('renders table row with correct data', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        item={item}
        select={select}
        selectedRows={selectedRows}
      />
    )

    const row = screen.getByRole('row')
    expect(row).toBeInTheDocument()
    expect(row).toHaveTextContent('John Doe')
    expect(row).toHaveTextContent('30')
  })

  it('calls handleSelectClick when checkbox is clicked', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={item}
        select={select}
        selectedRows={selectedRows}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(select.handleSelectClick).toHaveBeenCalledWith(
      expect.any(Object),
      item._id
    )
  })

  it('renders action menu when menu icon is clicked', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        item={item}
        rowActions={rowActions}
        select={select}
        selectedRows={selectedRows}
      />
    )

    fireEvent.click(screen.getByTestId('menu-icon'))
    rowActions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument()
    })
  })

  it('calls onAction function when clicking on the menu item', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        item={item}
        rowActions={rowActions}
        select={select}
        selectedRows={selectedRows}
      />
    )

    fireEvent.click(screen.getByTestId('menu-icon'))
    fireEvent.click(screen.getByText('Edit'))
    expect(rowActions[0].func).toHaveBeenCalledWith(item._id)
  })
})
