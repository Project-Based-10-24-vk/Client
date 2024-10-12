import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 50,
    title: 'Slider',
    max: 100,
    min: 0,
    onChange: vi.fn()
  }

  it('it should renders correctly', () => {
    render(<SliderWithInput {...defaultProps} />)

    expect(screen.getByText('Test Slider')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', () => {
    render(<SliderWithInput {...defaultProps} />)
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: 75 } })
    expect(defaultProps.onChange).toHaveBeenCalledWith(75)
  })

  it('it should update inputValue correctly when input value is empty', () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '' } })
    expect(defaultProps.onChange).toHaveValue('')
  })

  it('should update prices when input is blurred and input is greater than max value', () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '150' } })
    fireEvent.blur(input)
    expect(input).toHaveValue('100')
    expect(defaultProps.onChange).toHaveBeenCalledWith(100)
  })

  it('it should not update prices when input is blurred and value in input has not changed', () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })
})
