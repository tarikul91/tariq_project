import React from 'react';

const Input = (props) => {
    return (
        <input {...props} data-testid='input-1'>
            {props.children}
        </input>
    );
}

export default Input;
