import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('Component SearchFilterInput', () => {
  const updateFilterMock = vi.fn()

  const renderComponent = () => {
    return render(
      <SearchFilterInput textFieldProps={{}} updateFilter={updateFilterMock} />
    )
  }

  test('should render component with input in it', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('should render typed text correctly', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Test' } })
    expect(input).toHaveValue('Test')
  })

  test('should delete typed text when delete button is clicked', async () => {
    renderComponent()
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Delete Test' } })
    expect(input).toHaveValue('Delete Test')

    const clearButton = await screen.findByTestId('clearIcon')

    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
    expect(updateFilterMock).toHaveBeenLastCalledWith('')
  })

  test('should call updateFilter function on button click', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button', { name: 'common.search' })

    fireEvent.change(input, { target: { value: 'Search Test' } })
    fireEvent.click(searchButton)

    expect(updateFilterMock).toHaveBeenCalledWith('Search Test')
  })

  test('should call updateFilter function when Enter is pressed', () => {
    renderComponent()
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Key Enter Test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(updateFilterMock).toHaveBeenCalledWith('Key Enter Test')
  })
})
