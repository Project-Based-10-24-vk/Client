import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~/tests/test-utils'
import PhotoAddMock from './PhotoAddMock'

const imgStyleMock = { maxWidth: '300px' }
const childrensMock = [
  <div key='1'>1</div>,
  <div key='2'>2</div>,
  <div key='3'>3</div>,
  <div key='4'>
    <PhotoAddMock style={imgStyleMock} />
  </div>
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

  it('should resize and show photo after adding photo', async () => {
    renderWithRole('student')
    const fileInput = screen.getByLabelText(/upload file/i)
    const file = new File(['photo'], 'photo.png')

    await act(async () => {
      userEvent.upload(fileInput, file)
    })

    const photo = await screen.findByRole('img', { name: /my photo/i })

    await waitFor(() => {
      expect(photo).toBeInTheDocument()
      expect(photo).toHaveStyle('maxWidth: 300px')
    })
  })

  it('should open photo render error after add wrong file size', async () => {
    renderWithRole('student')
    const fileInput = screen.getByLabelText(/upload file/i)
    const wrongSizeFile = new File(['large content'], 'large.png')

    await act(async () => {
      userEvent.upload(fileInput, wrongSizeFile)
    })

    await waitFor(() => {
      expect(screen.getByText(/Wrong file size/i)).toBeInTheDocument()
    })
  })
})
