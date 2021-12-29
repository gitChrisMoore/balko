import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider, Field, Form } from 'formik';
import { getIndividual } from '../../domain/individuals/Individual';
import { getMostRecentAccount } from '../../domain/accounts/Account';
import { createTransaction } from '../../domain/transactions/Transaction';
import * as yup from 'yup';
import TextInputFieldB from '../../../components/TextInputFieldB/TextInputFieldB';
import { useAuth } from '../../../contexts/Auth';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';

function CreateTransactionCard() {
    // const { individual = 'empty' } = props;
    const [individual, setIndividual] = useState();
    const [account, setAccount] = useState();
    const { user } = useAuth();

    const handleSubmit = async (formvalues) => {
        createTransaction(formvalues)
            .then((res) => {
                // props.handleNext();
                console.log('res', res);
            })
            .catch((e) => {
                console.log(e);
                alert(e.message);
            });
    };
    const fetchIndividual = async () => {
        const res = await getIndividual();
        setIndividual(res);
    };

    const fetchAccount = async () => {
        const res = await getMostRecentAccount();
        setAccount(res);
    };

    useEffect(async () => {
        await fetchIndividual();
        await fetchAccount();
    }, []);

    const validationSchema = yup.object({
        amount: yup.number().required().positive(),
        state_id: yup.number().required().positive(),
        stateDescription: yup.string().required(),
        type: yup.string().required(),
        createdBy: yup.string().required(),
        user_id: yup.string().required(),
        individuals_id: yup.string().required(),
        accounts_id: yup.string().required(),
        accountProducts_id: yup.string().required(),
        balanceDelta: yup.number().required(),
        processed: yup.boolean().required(),
        status: yup.string().required()
    });

    const amountPlaceholder = 12.32;

    const formik = useFormik({
        initialValues: {
            amount: amountPlaceholder,
            state_id: 500,
            stateDescription: 'PENDING_APPROVAL',
            type: 'FUNDS_ADD',
            createdBy: user?.id || '',

            user_id: user?.id || '',
            individuals_id: individual?.id || '',
            accounts_id: account?.id || '',
            accountProducts_id: account?.accountProducts_id || '',

            balanceDelta: amountPlaceholder,
            processed: false,
            status: 'TEST'
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Field
                    //
                    id="amount"
                    name="amount"
                    label="Amount"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="state_id"
                    name="state_id"
                    label="state_id"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="stateDescription"
                    name="stateDescription"
                    label="stateDescription"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="type"
                    name="type"
                    label="type"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="createdBy"
                    name="createdBy"
                    label="createdBy"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="user_id"
                    name="user_id"
                    label="user_id"
                    component={TextInputFieldB}
                />

                <Field
                    //
                    id="individuals_id"
                    name="individuals_id"
                    label="individuals_id"
                    component={TextInputFieldB}
                />
                <Field
                    //
                    id="accounts_id"
                    name="accounts_id"
                    label="accounts_id"
                    component={TextInputFieldB}
                />
                <Field
                    //
                    id="accountProducts_id"
                    name="accountProducts_id"
                    label="accountProducts_id"
                    component={TextInputFieldB}
                />
                <Field
                    //
                    id="balanceDelta"
                    name="balanceDelta"
                    label="balanceDelta"
                    component={TextInputFieldB}
                />
                <Field
                    //
                    id="processed"
                    name="processed"
                    label="processed"
                    component={TextInputFieldB}
                />
                <Field
                    //
                    id="status"
                    name="status"
                    label="status"
                    component={TextInputFieldB}
                />
                <SubmitButton id="submit" name="submit">
                    Submit
                </SubmitButton>
            </Form>
        </FormikProvider>
    );
}

CreateTransactionCard.propTypes = {
    children: PropTypes.any,
    individual: PropTypes.any
};

CreateTransactionCard.defaultProps = {};

export default CreateTransactionCard;
