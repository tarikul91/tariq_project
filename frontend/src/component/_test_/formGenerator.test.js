import { render, screen, cleanup } from "@testing-library/react";
import FormGenerator from "component/FormGenerate"
import renderer from "react-test-renderer"
afterEach(cleanup)

test('FormGenerate without any props', () => {
    render(<FormGenerator></FormGenerator>)
    const container = screen.getByTestId('form-container')
    const form = screen.getByTestId('form')
    const heading = screen.getByTestId('form-heading')
    expect(container).toContainElement(form)
    expect(form).not.toHaveClass()
    expect(heading).not.toHaveTextContent()
})

test('FormGenerate with className formName and style', () => {
    render(<FormGenerator
        className="form"
        formName="Login form"
        style={{ marginBottom: "5px" }}
    ></FormGenerator>)
    const container = screen.getByTestId('form-container')
    const form = screen.getByTestId('form')
    const heading = screen.getByTestId('form-heading')
    expect(container).toContainElement(form)
    expect(form).toHaveClass('form')
    expect(form).toHaveStyle('margin-bottom:5px')
    expect(heading).toHaveTextContent("Login form")
})

test('FormGenerate with children', async () => {
    render(<FormGenerator>
        <button>Submit</button>
    </FormGenerator>)
    const child = screen.getByRole('button', { name: /Submit/i })
    const form = screen.getByTestId('form')
    expect(form).toContainElement(child)
})

it('FormGenerate snapshot', () => {
    const tree = renderer.create(
        <FormGenerator
            className="form"
            formName="Login form"
            style={{ marginBottom: "5px" }}
        >
            <button>Submit</button>
        </FormGenerator>
    ).toJSON()
    expect(tree).toMatchSnapshot()

})