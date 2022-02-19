import React from 'react';

const Button = (props) => {
    return (
        <button {...props} data-testid='btn-1'>
            {props.children}
        </button>
    );
};

export default Button;
