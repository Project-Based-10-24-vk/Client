import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import { URLs } from '~/constants/request'

const categoriesNamesMock = [
  { _id: '650c27618a9fbf234b8bb4cf', name: 'New category in resources!' },
  { _id: '650c27618a9fbf234b8bb4cd', name: 'Category 1' }
]

describe('CategoryDropdown test', () => {
  mockAxiosClient
    .onGet(URLs.resources.resourcesCategories.getNames)
    .reply(200, categoriesNamesMock)

  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<CategoryDropdown authorizedCreateCategory />)
    })
  })

  it('should choose the category from options list', async () => {
    const autocomplete = screen.getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
    expect(autocomplete.value).toBe('')

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.change(autocomplete, {
      target: { value: categoriesNamesMock[1].name }
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    await waitFor(() => {
      expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
  })

  it('should click on "add button" in options list', async () => {
    const autocomplete = screen.getByRole('combobox')

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })

    await waitFor(() => {
      const addButton = screen.queryByText('myResourcesPage.categories.addBtn')

      fireEvent.click(addButton)
    })

    await waitFor(() => {
      const newCategory = screen.getByText('myResourcesPage.categories.name')

      expect(newCategory).toBeInTheDocument()
    })
  })
})
