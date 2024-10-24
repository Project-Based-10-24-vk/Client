import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('Component SearchFilterInput', () => {
  const updateFilterMock = vi.fn()

  beforeEach(() => {
    render(
      <SearchFilterInput textFieldProps={{}} updateFilter={updateFilterMock} />
    )
  })

  it('should render component with input in it', () => {
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Test' } })
    expect(input).toHaveValue('Test')
  })

  it('should delete typed text when delete button is clicked', async () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Delete Test' } })
    expect(input).toHaveValue('Delete Test')

    const clearButton = await screen.findByTestId('clearIcon')

    fireEvent.click(clearButton)
    expect(input).toHaveValue('')
    expect(updateFilterMock).toHaveBeenLastCalledWith('')
  })

  it('should call updateFilter function on button click', () => {
    const input = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button', { name: 'common.search' })

    fireEvent.change(input, { target: { value: 'Search Test' } })
    fireEvent.click(searchButton)

    expect(updateFilterMock).toHaveBeenCalledWith('Search Test')
  })

  it('should call updateFilter function when Enter is pressed', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Key Enter Test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(updateFilterMock).toHaveBeenCalledWith('Key Enter Test')
  })
})
