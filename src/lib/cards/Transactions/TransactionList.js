import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTransactions } from '../../domain/transactions/Transaction';
import TransactionItem from './TransactionItem';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const res = await getTransactions();
        setTransactions(res);
    };

    useEffect(async () => {
        await fetchTransactions();
    }, []);

    return (
        <ul>
            {''}
            {transactions.map((item, index1) => (
                <li key={index1}>
                    <TransactionItem item={item} />
                </li>
            ))}
            {/* {transactions.map((item, index1) => console.log('item', item, index1))} */}
        </ul>
    );
}

TransactionList.propTypes = {
    children: PropTypes.any,
    individual: PropTypes.any
};

TransactionList.defaultProps = {};

export default TransactionList;
