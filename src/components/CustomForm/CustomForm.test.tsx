import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { CustomForm } from "./CustomForm"
import userEvent from "@testing-library/user-event"


describe('Unit test of Custom', ()=> {
    let mockHandleChange : any , input: any, button: any
    beforeEach(() => {
        mockHandleChange = jest.fn();
        render(<CustomForm handleChange={mockHandleChange}/>)
        input = screen.getByPlaceholderText("User's name")
        button = screen.getByText('Add User')



    })
    test("CustomForm' component is in the document", async() => {
        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    test('Input should have value when user types and clicks', async () => {
        await userEvent.type(input, 'John Doe');
        expect(input).toHaveValue('John Doe');
        await userEvent.click(button);
        expect(mockHandleChange).toHaveBeenCalled();  // Assuming the button click triggers handleChange
    });

    test('Error message appears when submitting empty form', async () => {
        expect(input).toHaveValue(''); // Ensure input is empty
        await userEvent.click(button);  // Asynchronously simulate user clicking the button
        const errorMessage = await screen.findByText('Write the name of new user'); // Properly wait for the error message to appear in the DOM
        expect(errorMessage).toBeInTheDocument(); // Check if the error message is present
    });



})