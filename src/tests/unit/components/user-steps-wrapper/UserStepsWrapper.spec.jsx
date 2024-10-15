import { screen } from '@testing-library/react'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~/tests/test-utils'

describe('UserStepsWraper', () => {
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <UserStepsWrapper userRole='tutor' />
      </ModalProvider>
    )
  })

  it('should render first tab', () => {
    const firsttab = screen.getByText(/step.stepLabels.generalInfo/i)
    expect(firsttab).toBeInTheDocument()
  })

  it('it should render second tab', () => {
    const firsttab = screen.getByText(/step.stepLabels.subjects/i)
    expect(firsttab).toBeInTheDocument()
  })
})
