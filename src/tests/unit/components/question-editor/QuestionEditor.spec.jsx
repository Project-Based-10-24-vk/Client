import { render, screen, fireEvent } from '@testing-library/react'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockData = {
  type: 'openAnswer',
  answers: [{ isCorrect: false }]
}

const handleInputChangeMock = vi.fn()
const handleNonInputValueChangeMock = vi.fn()
const onEditMock = vi.fn()
const onCancelMock = vi.fn()
const onSaveMock = vi.fn()

describe('QuestionEditor Component', () => {
  beforeEach(() => {
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChangeMock}
        handleNonInputValueChange={handleNonInputValueChangeMock}
        isQuizQuestion
        loading={false}
        onCancel={onCancelMock}
        onEdit={onEditMock}
        onSave={onSaveMock}
      />
    )
  })

  it('should render question input field', () => {
    const questionInput = screen.getByRole('textbox', {
      name: 'questionPage.question'
    })

    expect(questionInput).toBeInTheDocument()
  })

  it('should render an open answer', () => {
    const answerInput = screen.getByRole('textbox', {
      name: 'questionPage.answer'
    })

    expect(answerInput).toBeInTheDocument()
  })

  it('should change question type', () => {
    const selectInput = screen.getByRole('combobox')

    expect(selectInput).toHaveTextContent(
      'questionPage.questionType.openAnswer'
    )

    expect(selectInput).toHaveAttribute('aria-expanded', 'false')

    fireEvent.mouseDown(selectInput)

    expect(selectInput).toHaveAttribute('aria-expanded', 'true')

    const multipleChoice = screen.getByText(
      'questionPage.questionType.multipleChoice'
    )

    expect(multipleChoice).toBeInTheDocument()

    fireEvent.click(multipleChoice)

    expect(selectInput).toHaveAttribute('aria-expanded', 'false')
  })

  it('should change question and answer input fields', () => {
    const questionInput = screen.getByRole('textbox', {
      name: 'questionPage.question'
    })

    const answerInput = screen.getByRole('textbox', {
      name: 'questionPage.answer'
    })

    fireEvent.change(questionInput, { target: { value: 'Updated Question' } })

    fireEvent.change(answerInput, { target: { value: 'Updated Answer' } })

    expect(questionInput).toHaveValue('Updated Question')

    expect(answerInput).toHaveValue('Updated Answer')
  })

  it('should click on edit title and category', () => {
    const iconButton = screen.getByRole('button', { name: '' })

    expect(iconButton).toBeInTheDocument()

    fireEvent.click(iconButton)

    const spanWithText = screen.getByText(
      'myResourcesPage.questions.titleWithCategory'
    )

    expect(spanWithText).toBeInTheDocument()
  })
})
