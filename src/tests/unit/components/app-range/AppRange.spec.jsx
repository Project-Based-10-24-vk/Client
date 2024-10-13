// import { fireEvent, render, screen } from '@testing-library/react'
// import { vi } from 'vitest'

// import AppRange from '~/components/app-range/AppRange'

// import '@testing-library/jest-dom'

// vi.mock('react-i18next', () => ({
//     useTranslation: () => ({
//       t: (key) => key
//     })
//   }))

//   const mockMin = 0;
//   const mockMax = 100;
//   const mockOnChange = vi.fn();
//   const mockValue = [0, 80];

// //pass
// it('renders correctly', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     expect(screen.getAllByRole('textbox')).toHaveLength(2)
//     expect(screen.findAllByText('20'))
//     expect(screen.findAllByText('80'))
//     const sliders = screen.getAllByRole('slider');
//     expect(sliders).toHaveLength(2);
//     expect(sliders[0]).toBeInTheDocument();
//   });

// it('should call onChange when slider is moved', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const sliders = screen.getAllByRole('slider')
//     expect(sliders).toHaveLength(2);

//     const slider = sliders[0];
//     expect(slider).toHaveValue('0')
//     fireEvent.change(slider, { target: { value: 40 } })
//     expect(mockOnChange).toHaveBeenCalledWith(40)
//   })

//   it('calls onChange when input is changed', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const inputForms = screen.getAllByRole('textbox');
//     expect(inputForms).toHaveLength(2);

//     const firstInput = inputForms[0];
//     expect(firstInput).toHaveValue('20')
//     fireEvent.change(firstInput, { target: { value: '25' } });
//     expect(mockOnChange).toHaveBeenCalled();
//   });

// //pass
//   it('does not call onChange when input is changed with a non-number', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const inputForms = screen.getAllByRole('textbox');
//     expect(inputForms).toHaveLength(2);

//     const firstInput = inputForms[0];
//     expect(firstInput).toHaveValue('0')
//     fireEvent.change(firstInput, { target: { value: 'abc' } });
//     expect(mockOnChange).not.toHaveBeenCalled();
//   });

//   it('calls onChange with min number if input is empty', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const inputForms = screen.getAllByRole('textbox');
//     expect(inputForms).toHaveLength(2);

//     const firstInput = inputForms[0];
//     expect(firstInput).toHaveValue('0')
//     fireEvent.change(firstInput, { target: { value: '' } });
//     fireEvent.blur(firstInput);
//     expect(mockOnChange).toHaveBeenCalledWith([mockMin, mockValue[1]]);
//   });

//   it('updates prices when input is blurred and input is greater than max value', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const input = screen.getAllByRole('textbox')
//     expect(input[1]).toHaveValue('80')
//     fireEvent.change(input[1], { target: { value: '150' } });
//     fireEvent.blur(input[1]);
//     expect(mockOnChange).toHaveBeenCalledWith([mockValue[0], mockMax]);
//   });

// //pass
//   it('does not update prices when input is blurred and value has not changed', () => {
//     render(<AppRange min={mockMin} max={mockMax} value={mockValue} onChange={mockOnChange} />);
//     const input = screen.getAllByRole('textbox')
//     expect(input[0]).toHaveValue('0')
//     fireEvent.blur(input[0]);
//     expect(mockOnChange).not.toHaveBeenCalled();
//   });
