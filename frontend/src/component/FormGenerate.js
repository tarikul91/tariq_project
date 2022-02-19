import React from 'react';
import PropTypes from 'prop-types';


const FormGenerate = (props) => {
    return (
        <div className='form-container' data-testid='form-container'>
            <form className={props.className ? props.className : ""} style={props.style} onSubmit={props.onSubmit} data-testid='form'>
                <h3 className='text-center m-3' data-testid='form-heading'>{props.formName || ''}</h3>
                {props.children}
            </form>
        </div>
    );
};


FormGenerate.propTypes = {
    className:PropTypes.string,
    formName:PropTypes.string,
    style:PropTypes.object,
    submit:PropTypes.func
};


export default FormGenerate;
