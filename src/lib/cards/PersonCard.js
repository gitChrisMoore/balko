import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import { getPersonByID } from '../domain/person/Person';
import TextInputFieldB from '../../components/TextInputFieldB/TextInputFieldB';

function PersonCard(props) {
    const { individual } = props;
    const [person, setPerson] = useState();

    const fetchPersonByID = async (persons_id) => {
        const res = await getPersonByID(persons_id);
        setPerson(res);
    };

    useEffect(() => {
        if (individual && individual.persons_id) fetchPersonByID(individual.persons_id);
    }, [individual]);

    const formik = useFormik({
        initialValues: {
            firstName: person?.firstName || '',
            lastName: person?.lastName || '',
            dateofBirth: person?.dateofBirth || '',
            ssnIdentity: person?.ssnIdentity || 'XXXX-XX-1022'
        },
        enableReinitialize: true
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Field
                    id="firstName"
                    name="firstName"
                    label="First name"
                    component={TextInputFieldB}
                    disabled
                />

                <Field
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    component={TextInputFieldB}
                    disabled
                />

                <div className="flex ">
                    <div className=" grow m-auto mr-2">
                        <Field
                            id="dateofBirth"
                            name="dateofBirth"
                            label="Date of Birth"
                            component={TextInputFieldB}
                            disabled
                        />
                    </div>
                    <div className=" grow m-auto ml-2">
                        <Field
                            id="ssnIdentity"
                            name="ssnIdentity"
                            label="Social Security Number"
                            component={TextInputFieldB}
                            disabled
                        />
                    </div>
                </div>
            </Form>
        </FormikProvider>
    );
}

PersonCard.propTypes = {
    children: PropTypes.any,
    individual: PropTypes.any
};

PersonCard.defaultProps = {};

export default PersonCard;
