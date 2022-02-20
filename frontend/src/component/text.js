import React from 'react';

const Text = (props) => {
    return (
        <p {...props} data-testid='text'>
            {props.children}
        </p>
    );
};

export default Text;
