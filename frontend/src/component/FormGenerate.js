import React from 'react';
import PropTypes from 'prop-types';


const FormGenerate = (props) => {
    return (
        <div>
            <form className={props.className ? props.className : ""} style={props.style} onSubmit={props.onSubmit}>
                <h3 className='text-center m-3'>{props.formName || ''}</h3>
                {props.children}
            </form>
        </div>
    );
};


FormGenerate.propTypes = {
    className:PropTypes.string,
    formName:PropTypes.string,
    style:PropTypes.object,
    attributes:PropTypes.array,
    submit:PropTypes.func
};


export default FormGenerate;
