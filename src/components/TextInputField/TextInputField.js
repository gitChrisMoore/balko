import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

const TextInputField = (props) => {
    const { id, name, label = 'Label', type = 'text', field = {}, form = {} } = props;

    const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

    return (
        <div className="mb-3 pt-2 grow m-auto">
            {/* Label */}
            <div htmlFor={id} className="text-zinc-500 text-xs font-light pl-2">
                {label}
            </div>

            {/* Input Field */}
            <input
                id={id}
                name={name}
                placeholder={label}
                type={type}
                className={`pl-2 text-lg font-light w-full border-b bg-white text-zinc-900 \
                              ${
                                  errorText
                                      ? 'outline outline-1 outline-rose-700'
                                      : 'bg-grey-100 border-gray-300'
                              } \
                              focus:outline-indigo-600 focus:bg-indigo-50`}
                {...field}
                {...props}
            />
        </div>
    );
};

TextInputField.propTypes = {
    children: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.any,
    label: PropTypes.any,
    field: PropTypes.any,
    form: PropTypes.any
};

TextInputField.defaultProps = {};

export default TextInputField;
