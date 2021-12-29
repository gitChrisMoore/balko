import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import { getAddressByID } from '../domain/address/Address';
import TextInputFieldB from '../../components/TextInputFieldB/TextInputFieldB';

function AddressCard(props) {
    const { individual } = props;
    const [address, setAddress] = useState();

    const fetchAddressByID = async (addresss_id) => {
        const res = await getAddressByID(addresss_id);
        setAddress(res);
    };

    useEffect(() => {
        if (individual && individual.addresses_id) fetchAddressByID(individual.addresses_id);
    }, [individual]);

    console.log('address, ', address);
    console.log('AddressCard individual, ', individual);

    const formik = useFormik({
        initialValues: {
            address1: address?.address1 || '',
            address2: address?.address2 || '',
            city: address?.city || '',
            state: address?.state || '',
            postalCode: address?.postalCode || '',
            country: 'US'
        },
        enableReinitialize: true
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Field
                    id="address1"
                    name="address1"
                    label="Address"
                    component={TextInputFieldB}
                    disabled
                />

                <Field
                    id="address2"
                    name="address2"
                    label="Address 2"
                    component={TextInputFieldB}
                    disabled
                />

                <div className="flex ">
                    <div className=" grow m-auto mr-2">
                        <Field
                            id="city"
                            name="city"
                            label="City"
                            component={TextInputFieldB}
                            disabled
                        />
                    </div>
                    <div className=" grow m-auto mx-2">
                        <Field
                            id="state"
                            name="state"
                            label="State"
                            component={TextInputFieldB}
                            disabled
                        />
                    </div>
                    <div className=" grow m-auto ml-2">
                        <Field
                            id="zip"
                            name="zip"
                            label="Zip"
                            component={TextInputFieldB}
                            disabled
                        />
                    </div>
                </div>
            </Form>
        </FormikProvider>
    );
}

AddressCard.propTypes = {
    children: PropTypes.any,
    individual: PropTypes.any
};

AddressCard.defaultProps = {};

export default AddressCard;
