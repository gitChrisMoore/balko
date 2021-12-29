import React from 'react';
import PropTypes from 'prop-types';

const SubmitFormButton = (props) => {
    const { id, name, type = 'submit', ...rest } = props;

    return (
        <button
            id={id}
            name={name}
            // className="bg-blue-800 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            className=" w-full h-12 bg-blue-500 text-white rounded-md font-light"
            type={type}
            data-testid="submitForm">
            {rest.children}
        </button>
    );
};

SubmitFormButton.propTypes = {
    children: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.any
    // field: PropTypes.any,
    // form: PropTypes.any,
};

SubmitFormButton.defaultProps = {};

export default SubmitFormButton;
