import React from 'react';

const Input = (props) => {
    return (
        <input {...props}>
            {props.children}
        </input>
    );
}

export default Input;
