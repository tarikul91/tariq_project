import { render, screen,cleanup } from "@testing-library/react";
import Label from "component/label";
import renderer from "react-test-renderer"
afterEach(cleanup)

test('Label test',()=>{
    render(<Label className='form-label'  htmlFor="userName">Label name</Label>)
    expect(screen.getByTestId('label')).toBeInTheDocument()
    expect(screen.getByTestId('label')).toHaveClass('form-label')
    expect(screen.getByTestId('label')).toBeInTheDocument()
})
it('label snapshot',()=>{
    const tree = renderer.create(<Label className='form-label'>Label name</Label>).toJSON()
    expect(tree).toMatchSnapshot()
})