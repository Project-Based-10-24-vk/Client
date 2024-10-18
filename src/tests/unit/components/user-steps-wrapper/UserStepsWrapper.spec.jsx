import { screen } from '@testing-library/react'

import {
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~/tests/test-utils'

const childrensMock = [
  <div key='1'>1</div>,
  <div key='2'>2</div>,
  <div key='3'>3</div>,
  <div key='4'>4</div>
]

vi.mock('~/components/step-wrapper/StepWrapper', () => {
  return {
    default: ({ steps }) => (
      <div>
        {childrensMock.map((child, index) => (
          <div data-testid={steps[index]} key={index}>
            {child}
          </div>
        ))}
      </div>
    )
  }
})

const renderWithRole = (role) => {
  renderWithProviders(
    <ModalProvider>
      <UserStepsWrapper userRole={role} />
    </ModalProvider>
  )
}

describe('UserStepsWraper', () => {
  it('should render first tab', () => {
    renderWithRole('tutor')
    const firstTab = screen.getByTestId(tutorStepLabels[0])
    expect(firstTab).toBeInTheDocument()
  })

  it('it should render second tab', () => {
    renderWithRole('student')
    const secondTab = screen.getByTestId(studentStepLabels[1])
    expect(secondTab).toBeInTheDocument()
  })
})
