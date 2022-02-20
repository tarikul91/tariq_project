import { render, screen, cleanup } from "@testing-library/react";
import AttributeGenerate from "component/attributeGenerate"
import renderer from "react-test-renderer"
afterEach(cleanup)
const btn1 = {
    type: "button",
    className: "mb-4",
    attId: "sample-id",
    name: "submit",
    style: { marginTop: "10px" },
    readOnly: true,
}
test('AttributeGenerate type button props', () => {
    render(<AttributeGenerate data={{ type: "button" }}></AttributeGenerate>)
    expect(screen.getByTestId('btn-1')).toBeInTheDocument()
})

test('AttributeGenerate with props for button', () => {
    render(<AttributeGenerate data={btn1}></AttributeGenerate>)
    expect(screen.getByTestId('btn-1')).toBeInTheDocument()
    expect(screen.getByTestId('btn-1')).toHaveClass('mb-4')
    expect(screen.getByTestId('btn-1')).toHaveAttribute('id', 'sample-id')
    expect(screen.getByTestId('btn-1')).toHaveStyle('margin-top:10px')
    expect(screen.getByTestId('btn-1')).toHaveAttribute('readOnly')
    expect(screen.getByTestId('btn-1')).toHaveTextContent('submit')

})

it('AttributeGenerate button snapshot', () => {
    const tree = renderer.create(<AttributeGenerate data={btn1}></AttributeGenerate>).toJSON()
    expect(tree).toMatchSnapshot()

})


const input1 = {
    type: "input",
    className: "mb-4",
    attId: "sample-id",
    name: "sample-name",
    style: { marginTop: "10px" },
    readOnly: true,
    placeHolder: 'enter name',
    inputType: 'text',
}
test('AttributeGenerate type input without other props', () => {
    render(<AttributeGenerate data={{ type: "input" }}></AttributeGenerate>)
    const parent = screen.getByTestId('input-container')
    const input = screen.getByTestId('input-1')
    expect(parent).toBeInTheDocument()
    expect(parent).toContainElement(input)

})

test('AttributeGenerate type input with props', () => {
    render(<AttributeGenerate data={input1}></AttributeGenerate>)
    const parent = screen.getByTestId('input-container')
    const input = screen.getByTestId('input-1')
    expect(parent).toBeInTheDocument()
    expect(parent).toContainElement(input)
    expect(screen.getByTestId('input-1')).toHaveClass('mb-4')
    expect(screen.getByTestId('input-1')).toHaveAttribute('id', 'sample-id')
    expect(screen.getByTestId('input-1')).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('input-1')).toHaveStyle('margin-top:10px')
})
const input2 = {
    type: "input",
    className: "mb-4",
    attId: "sample-id",
    name: "sample-name",
    style: { marginTop: "10px" },
    readOnly: true,
    placeHolder: 'enter name',
    inputType: 'text',
    label:'user name'
}
test('AttributeGenerate type input with label', () => {
    render(<AttributeGenerate data={input2}></AttributeGenerate>)
    const parent = screen.getByTestId('input-container')
    const input = screen.getByTestId('input-1')
    const  label = screen.getByTestId('label')
    expect(label).toBeInTheDocument()
    expect(parent).toContainElement(label)
    expect(label).toHaveTextContent('user name')
    expect(label).toHaveAttribute('for','sample-id')
})

it('AttributeGenerate input snapshot', () => {
    const tree = renderer.create(<AttributeGenerate data={input2}></AttributeGenerate>).toJSON()
    expect(tree).toMatchSnapshot()

})



let text = {
    className: 'text-danger',
    attId: 'text-id',
    name: 'some-name',
    style: { fontSize: "16px" },
    textContent:'lorem ipsum',
    type:'text'
}
test('AttributeGenerate with text', () => {
    render(<AttributeGenerate data={text}></AttributeGenerate>)
    expect(screen.getByTestId('text')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveClass('text-danger')
    expect(screen.getByTestId('text')).toHaveAttribute('id', 'text-id')
    expect(screen.getByTestId('text')).toHaveStyle('font-size:16px')
    expect(screen.getByTestId('text')).toHaveTextContent('lorem ipsum')

})

it('AttributeGenerate text snapshot', () => {
    const tree = renderer.create(<AttributeGenerate data={text}></AttributeGenerate>).toJSON()
    expect(tree).toMatchSnapshot()

})
