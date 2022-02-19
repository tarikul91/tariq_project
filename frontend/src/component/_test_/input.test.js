import { render, screen, cleanup } from "@testing-library/react";
import Input from "component/input";
import renderer from "react-test-renderer"
afterEach(cleanup)
test('Input test',()=>{
    render(<Input className='form-control'  type='password' disabled/>)
    expect(screen.getByTestId('input-1')).toBeInTheDocument()
    expect(screen.getByTestId('input-1')).toHaveClass('form-control')
    expect(screen.getByTestId('input-1')).toBeDisabled()
    expect(screen.getByTestId('input-1')).toHaveAttribute('type', 'password')
})
it('input snapshot',()=>{
    const tree = renderer.create(<Input defaultValue='email' className='form-control'/>).toJSON()
    expect(tree).toMatchSnapshot()
})