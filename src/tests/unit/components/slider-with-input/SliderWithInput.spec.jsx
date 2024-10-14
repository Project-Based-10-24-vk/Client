import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (callback) => callback
}))

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 50,
    title: 'Test Slider',
    max: 100,
    min: 0,
    onChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<SliderWithInput {...defaultProps} />)
    expect(screen.getByText('Test Slider')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const slider = screen.getByRole('slider')

    await act(async () => {
      fireEvent.change(slider, { target: { value: 75 } })
    })

    expect(defaultProps.onChange).toHaveBeenCalledWith(75)
  })

  it('should update input value when input is changed and call onChange', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      fireEvent.change(input, { target: { value: '150' } })
    })

    expect(input).toHaveValue('150')
    expect(defaultProps.onChange).toHaveBeenCalledWith(100)
  })

  it('should update input value when blurred with value greater than max', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      fireEvent.change(input, { target: { value: '150' } })
      fireEvent.blur(input)
    })

    expect(input).toHaveValue('100')
  })

  it('should not call onChange when input is blurred and value has not changed', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      fireEvent.focus(input)
      fireEvent.blur(input)
    })

    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })
})
