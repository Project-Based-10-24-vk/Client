import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'

const mockDispatch = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

describe('HowItWorks container', () => {
  it('should change info by clicking on switch', () => {
    renderWithProviders(<HowItWorks />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    const btnText = screen.getByText(
      'guestHomePage.howItWorks.shareYourExperience'
    )

    expect(btnText).toBeInTheDocument()
  })
})
