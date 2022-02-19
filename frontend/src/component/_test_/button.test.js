import { render, screen,cleanup } from "@testing-library/react";
import Button from "component/button";
import renderer from "react-test-renderer"
afterEach(cleanup)

test('Button test',()=>{
    render(<Button className='btn' >Save</Button>)
    expect(screen.getByTestId('btn-1')).toHaveTextContent('Save')
    expect(screen.getByTestId('btn-1')).toHaveClass('btn')
})
it('Button snapshot',()=>{
    const tree = renderer.create(<Button disabled>Save</Button>).toJSON()
    expect(tree).toMatchSnapshot()
})