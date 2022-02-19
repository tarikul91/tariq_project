import React from 'react';
import Button from './button';
import Input from './input';
import Text from './text';
import Label from './label';

const AttributeGenerate = ({ data, ...rest }) => {
    switch (data.type) {
        case 'button':
            let prop = {
                className: data.className,
                id: data.attId,
                name: data.name,
                style: data.style,
                readOnly: data.readOnly,
                type:data.inputType
            }
            return <Button {...rest} {...prop}>{data.name}</Button>
        case 'input':
            let prop2 = {
                className: data.className,
                id: data.attId,
                name: data.name,
                style: data.style,
                readOnly: data.readOnly,
                placeholder: data.placeHolder,
                type: data.inputType,
            }
            return (
                <div className='my-3'>
                    {data.label &&
                        <Label htmlFor={data.label.htmlFor}>{data.label.labelName}</Label>
                    }
                    <Input {...rest} {...prop2}></Input>
                </div>
            )
        case 'text':
            let prop3 = {
                className: data.className,
                id: data.attId,
                name: data.name,
                style: data.style,
                readOnly: data.readOnly,
            }
            return <Text {...rest} {...prop3}>{data.textContent}</Text>
        default:
            return <Text {...rest}  {...prop3}></Text>


    }
};



export default AttributeGenerate;
