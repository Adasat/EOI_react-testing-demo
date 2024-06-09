import { render, screen } from "@testing-library/react"
import { FilterInput } from "./FilterInput"
import userEvent from "@testing-library/user-event";



describe ('Unit test of FilterInput.tsx', () => {
    let input: any, mockOnInputChange: any;

    beforeEach (() => {
        mockOnInputChange = jest.fn();
        render(<FilterInput onInputChange={mockOnInputChange} />);
        input = screen.getByPlaceholderText('Search user...') as HTMLInputElement;
    })

    test('Component FilterInput is rendered', () => {
        expect(input).toBeInTheDocument()
    })
    
    test('First value of FilterInput is empty string', () => {
        expect(input.value).toEqual('')
    })

    test('If user write something, the input has the same value', () => {
        userEvent.type(input, 'hello');
        expect(input.value).toEqual('hello');
        expect(mockOnInputChange).toHaveBeenCalledWith('hello');

    })

    test('The typeof value of input is String', () => {
        userEvent.type(input, 'hello');
        expect(typeof(input.value)).toStrictEqual('string');
    })
})