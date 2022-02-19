import { render, screen,cleanup } from "@testing-library/react";
import Text from "component/text";
import renderer from "react-test-renderer"
afterEach(cleanup)

test('Text test',()=>{
    render(<Text>Some text</Text>)
    expect(screen.getByText('Some text')).toBeInTheDocument()
})
it('text snapshot',()=>{
    const tree = renderer.create(<Text className='text-danger'>Lorem ipsum</Text>).toJSON()
    expect(tree).toMatchSnapshot()
})