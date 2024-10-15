import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

import '@testing-library/jest-dom'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

const mockPagination = {
  page: 1,
  pageInput: 1,
  rowsPerPage: 10,
  pageCount: 5,
  itemsCount: 50,
  handleChangePage: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  handleChangePageInput: vi.fn(),
  handlePageSubmit: vi.fn()
}

describe('EnhancedTablePagination', () => {
  it('should render first page', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const paginationController = screen.getByRole('navigation')
    expect(paginationController).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should change page from 1 to 2', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const nextPageButton = screen.getByLabelText('Go to page 2')
    fireEvent.click(nextPageButton)
    expect(mockPagination.handleChangePage).toHaveBeenCalled()
  })


  it('renders without crashing', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    expect(screen.getByText('table.numberOfRows')).toBeInTheDocument()
  })

  it('displays the correct page input value', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const pageInput = screen.getByTestId('pagination-page-input')
    expect(pageInput).toHaveValue(mockPagination.pageInput)
  })

  it('calls handleChangePageInput on page input change', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const pageInput = screen.getByTestId('pagination-page-input')
    fireEvent.change(pageInput, { target: { value: '2' } })
    expect(mockPagination.handleChangePageInput).toHaveBeenCalled()
  })

  it('calls handlePageSubmit on go button click', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const goButton = screen.getByText('table.go')
    fireEvent.click(goButton)
    expect(mockPagination.handlePageSubmit).toHaveBeenCalledWith(
      mockPagination.pageCount
    )
  })

  it('should display correct number of rows', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    expect(screen.getByText('1-10 table.of 50')).toBeInTheDocument()
  })

  it('should call handleChangePage when pagination is clicked', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const nextPageButton = screen.getByLabelText('Go to page 2')
    fireEvent.click(nextPageButton)
    expect(mockPagination.handleChangePage).toHaveBeenCalled()
  })

  it('should disable previous button on first page', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const prevButton = screen.getByLabelText('Go to previous page')
    expect(prevButton).toBeDisabled()
  })

  it('should enable next button on first page', () => {
    render(<EnhancedTablePagination pagination={mockPagination} />)
    const nextButton = screen.getByLabelText('Go to next page')
    expect(nextButton).not.toBeDisabled()
  })

  it('should disable next button on last page', () => {
    const lastPagePagination = { ...mockPagination, page: 5 }
    render(<EnhancedTablePagination pagination={lastPagePagination} />)
    const nextButton = screen.getByLabelText('Go to next page')
    expect(nextButton).toBeDisabled()
  })

  it('should enable previous button on last page', () => {
    const lastPagePagination = { ...mockPagination, page: 5 }
    render(<EnhancedTablePagination pagination={lastPagePagination} />)
    const prevButton = screen.getByLabelText('Go to previous page')
    expect(prevButton).not.toBeDisabled()
  })
})
