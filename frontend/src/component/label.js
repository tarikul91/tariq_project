import React from 'react';

const Label = (props) => {
    return (
        <label {...props} data-testid='label'>
            {props.children}
        </label>
    );
}

export default Label;
