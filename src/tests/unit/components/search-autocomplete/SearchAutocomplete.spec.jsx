import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

describe('SearchAutocomplete', () => {
  const setSearch = vi.fn()
  const onSearchChange = vi.fn()
  const testOptions = ['Option 1', 'Option 2', 'Option 3']

  beforeEach(() => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChange}
        options={testOptions}
        search=''
        setSearch={setSearch}
        textFieldProps={{ label: 'Search' }}
      />
    )
  })

  it('should render autocomplete with search input', () => {
    const input = screen.getByLabelText('Search')
    expect(input).toBeInTheDocument()
  })

  it('should update search input on typing', () => {
    const input = screen.getByLabelText('Search')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveValue('test')
  })

  it('should filter options on typing', () => {
    const input = screen.getByLabelText('Search')

    fireEvent.change(input, { target: { value: 'Option 1' } })
    const option = screen.getByText('Option 1')
    expect(option).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'not-found' } })
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('should select an option on click', () => {
    const input = screen.getByLabelText('Search')

    fireEvent.change(input, { target: { value: 'Option 1' } })
    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    expect(setSearch).toHaveBeenCalledWith('Option 1')
  })

  it('should clear search input on clear icon click', () => {
    const input = screen.getByLabelText('Search')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveValue('test')

    const clearIcon = screen.getByTestId('ClearIcon')
    fireEvent.click(clearIcon)
    expect(setSearch).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })

  it('should trigger search on search button click', () => {
    const input = screen.getByLabelText('Search')

    fireEvent.change(input, { target: { value: 'test' } })
    const searchButton = screen.getByRole('button', { name: /search/i })
    fireEvent.click(searchButton)

    expect(onSearchChange).toHaveBeenCalled()
    expect(setSearch).toHaveBeenCalledWith('test')
  })
})
