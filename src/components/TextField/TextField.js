import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
    console.log(props);
    const { id, name, label = '', children } = props;

    return (
        <div className="mb-3 pt-2 grow m-auto">
            {/* Label */}
            <div htmlFor={id} className="text-zinc-500 text-xs font-light pl-2">
                {label}
            </div>

            {/* Input Field */}
            <div
                id={id}
                name={name}
                className={`pl-2 text-lg font-light w-full border-b bg-white text-zinc-900 \
                           bg-grey-100 border-gray-300 \
                           focus:outline-indigo-600 focus:bg-indigo-50`}>
                {children}
            </div>
        </div>
    );
};

TextField.propTypes = {
    children: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.any,
    label: PropTypes.any
};

TextField.defaultProps = {};

export default TextField;
