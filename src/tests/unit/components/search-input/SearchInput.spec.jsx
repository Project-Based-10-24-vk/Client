import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SearchInput from '~/components/search-input/SearchInput'

const mockSetSearch = vi.fn()
const initialSearchValue = ''

it('should render text correctly', () => {
  render(<SearchInput search={initialSearchValue} setSearch={mockSetSearch} />)

  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('')
})

it('should call setSearch when search icon is clicked', () => {
  render(<SearchInput search={initialSearchValue} setSearch={mockSetSearch} />)

  const searchIcon = screen.getByTestId('search-icon')
  fireEvent.click(searchIcon)

  expect(mockSetSearch).toHaveBeenCalledWith(initialSearchValue)
})

it('should call setSearch with empty string when delete icon is clicked', () => {
  render(<SearchInput search='some query' setSearch={mockSetSearch} />)

  const deleteIcon = screen.getByTestId('delete-icon')
  fireEvent.click(deleteIcon)

  expect(mockSetSearch).toHaveBeenCalledWith('')
})

it('should call setSearch when enter is pressed', () => {
  render(<SearchInput search={initialSearchValue} setSearch={mockSetSearch} />)

  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'new search' } })
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

  expect(mockSetSearch).toHaveBeenCalledWith('new search')
})

it('should have hidden class if search is empty', () => {
  render(<SearchInput search={initialSearchValue} setSearch={mockSetSearch} />)

  const deleteIcon = screen.getByTestId('delete-icon')
  expect(deleteIcon).toHaveClass('hidden')
})

it('should have visible class if search is not empty', () => {
  render(<SearchInput search='some query' setSearch={mockSetSearch} />)

  const deleteIcon = screen.getByTestId('delete-icon')
  expect(deleteIcon).toHaveClass('visible')
})
